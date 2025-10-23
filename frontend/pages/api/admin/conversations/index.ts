import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, JWTPayload } from '../../../../lib/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to group messages into conversations
function groupMessagesToConversations(messages: any[]) {
  const conversationMap = new Map();

  messages.forEach(message => {
    const conversationId = message.conversationId || message.threadId || message.messageId;
    
    if (!conversationMap.has(conversationId)) {
      // Determine conversation type and priority
      const subject = message.subject.toLowerCase();
      const summary = (message.summary || '').toLowerCase();
      
      const isQuote = subject.includes('quote') || 
                     subject.includes('pricing') || 
                     subject.includes('estimate') ||
                     summary.includes('quote') ||
                     summary.includes('pricing');
      
      const isUrgent = subject.includes('urgent') || 
                      subject.includes('asap') ||
                      subject.includes('emergency');
      
      conversationMap.set(conversationId, {
        id: conversationId,
        subject: message.subject,
        participantEmail: message.fromAddress,
        participantName: message.fromName || message.fromAddress.split('@')[0],
        category: isQuote ? 'quote' : 'contact',
        priority: isUrgent ? 'urgent' : 'normal',
        status: message.isRead ? 'open' : 'pending',
        messageCount: 1,
        lastMessageAt: new Date(message.receivedTime),
        createdAt: new Date(message.receivedTime),
        messages: [message],
        hasUnread: !message.isRead,
        latestMessage: {
          id: message.messageId,
          subject: message.subject,
          content: message.summary || message.textContent || '',
          from: message.fromAddress,
          receivedAt: new Date(message.receivedTime),
          read: message.isRead,
          type: isQuote ? 'quote' : 'contact'
        }
      });
    } else {
      // Add message to existing conversation
      const conversation = conversationMap.get(conversationId);
      conversation.messageCount++;
      conversation.messages.push(message);
      
      // Update latest message if this message is newer
      const messageTime = new Date(message.receivedTime);
      if (messageTime > conversation.lastMessageAt) {
        conversation.lastMessageAt = messageTime;
        conversation.latestMessage = {
          id: message.messageId,
          subject: message.subject,
          content: message.summary || message.textContent || '',
          from: message.fromAddress,
          receivedAt: messageTime,
          read: message.isRead,
          type: conversation.category
        };
      }
      
      // Update unread status
      if (!message.isRead) {
        conversation.hasUnread = true;
        conversation.status = 'pending';
      }
    }
  });

  return Array.from(conversationMap.values());
}

// Handler function that requires authentication
async function conversationsHandler(req: NextApiRequest, res: NextApiResponse, user: JWTPayload) {
  switch (req.method) {
    case 'GET':
      try {
        const { 
          status, 
          category, 
          priority, 
          limit = '50', 
          offset = '0',
          folder = 'inbox' 
        } = req.query;

        // Fetch messages from DB
        const messages = await (prisma as any).message.findMany({
          orderBy: { createdAt: 'desc' },
          take: 1000
        });

        // Group messages into conversations
        let conversations = groupMessagesToConversations(messages);

        // Apply filters
        if (status) {
          conversations = conversations.filter(conv => conv.status === status);
        }

        if (category) {
          conversations = conversations.filter(conv => conv.category === category);
        }

        if (priority) {
          conversations = conversations.filter(conv => conv.priority === priority);
        }

        // Sort conversations by last message time (newest first)
        conversations.sort((a, b) => 
          new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );

        // Apply pagination
        const take = parseInt(limit as string, 10);
        const skip = parseInt(offset as string, 10);
        const paginatedConversations = conversations.slice(skip, skip + take);

        // Calculate stats
        const stats = {
          total: conversations.length,
          open: conversations.filter(c => c.status === 'open').length,
          pending: conversations.filter(c => c.status === 'pending').length,
          closed: conversations.filter(c => c.status === 'closed').length,
          quotes: conversations.filter(c => c.category === 'quote').length,
          contacts: conversations.filter(c => c.category === 'contact').length,
          urgent: conversations.filter(c => c.priority === 'urgent').length,
          unread: conversations.filter(c => c.hasUnread).length
        };

        return res.status(200).json({
          success: true,
          conversations: paginatedConversations,
          stats,
          pagination: {
            limit: take,
            offset: skip,
            hasMore: conversations.length > (skip + take),
            totalPages: Math.ceil(conversations.length / take)
          },
          source: 'database',
          folder: 'inbox'
        });

      } catch (error: any) {
        console.error('Error fetching conversations:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to fetch conversations',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ 
        success: false, 
        error: `Method ${req.method} not allowed` 
      });
  }
}

// Export with authentication middleware
export default requireAuth(conversationsHandler);