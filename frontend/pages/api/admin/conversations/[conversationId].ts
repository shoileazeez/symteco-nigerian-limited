import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, JWTPayload } from '../../../../lib/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler function that requires authentication
async function conversationHandler(req: NextApiRequest, res: NextApiResponse, user: JWTPayload) {
  const { conversationId } = req.query;

  if (!conversationId || typeof conversationId !== 'string') {
    return res.status(400).json({ success: false, error: 'Conversation ID is required' });
  }

  switch (req.method) {
    case 'GET':
      try {
        // Try to find all messages with conversationId or fallback to single message
        const msgs = await (prisma as any).message.findMany({
          where: {
            OR: [
              { conversationId: conversationId },
              { id: conversationId }
            ]
          },
          orderBy: { createdAt: 'asc' }
        });

        if (!msgs || !msgs.length) {
          return res.status(404).json({ success: false, error: 'Conversation or message not found' });
        }

        const transformedMessages = msgs.map((m: any) => ({
          id: m.id,
          type: m.type,
          subject: m.subject,
          textContent: m.body,
          body: m.body,
          htmlContent: null,
          fromEmail: m.fromEmail,
          fromName: m.fromName,
          toEmail: process.env.MJ_RECEIVER_EMAIL || null,
          toName: null,
          receivedAt: m.createdAt.toISOString(),
          read: m.isRead,
          starred: false,
          hasAttachments: m.hasAttachments,
          conversationId: m.conversationId || m.id,
          
          // Include all detailed fields from database
          phone: m.phone,
          company: m.company,
          service: m.service,
          projectLocation: m.projectLocation,
          timeline: m.timeline,
          budget: m.budget,
          details: m.details,
        }));

        const firstMessage = transformedMessages[0];
        const lastMessage = transformedMessages[transformedMessages.length - 1];

        const conversationSummary = {
          id: conversationId,
          subject: firstMessage.subject,
          participantEmail: firstMessage.fromEmail,
          participantName: firstMessage.fromName,
          category: firstMessage.type,
          priority: firstMessage.subject?.toLowerCase().includes('urgent') ? 'urgent' : 'normal',
          status: lastMessage.read ? 'open' : 'pending',
          messageCount: transformedMessages.length,
          createdAt: firstMessage.receivedAt,
          lastMessageAt: lastMessage.receivedAt,
          hasUnread: transformedMessages.some((m: any) => !m.read),
          messages: transformedMessages
        };

        return res.status(200).json({ success: true, conversation: conversationSummary, source: 'database' });

      } catch (error: any) {
        console.error('Error fetching conversation:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to fetch conversation',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }

    case 'PUT':
      try {
        const { markAsRead, markAsUnread } = req.body;

        const updates: any = {};

        if (markAsRead) updates.isRead = true;
        if (markAsUnread) updates.isRead = false;

        if (Object.keys(updates).length === 0) {
          return res.status(400).json({ success: false, error: 'No valid update action provided' });
        }

        // Update all messages in this conversation
        await (prisma as any).message.updateMany({
          where: {
            OR: [ { conversationId: conversationId }, { id: conversationId } ]
          },
          data: updates
        });

        return res.status(200).json({ success: true, conversationId, updates });

      } catch (error: any) {
        console.error('Error updating conversation:', error);
        return res.status(500).json({ success: false, error: 'Failed to update conversation', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ 
        success: false, 
        error: `Method ${req.method} not allowed` 
      });
  }
}

// Export with authentication middleware
export default requireAuth(conversationHandler);