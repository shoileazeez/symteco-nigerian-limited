import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, JWTPayload } from '../../../lib/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler function that requires authentication
async function messagesHandler(req: NextApiRequest, res: NextApiResponse, user: JWTPayload) {
  switch (req.method) {
    case 'GET':
      try {
        const { type, read, search } = req.query;

        // Build Prisma query
        const where: any = {};

        if (type === 'quote' || type === 'contact') {
          where.type = type;
        }

        if (read !== undefined) {
          where.isRead = read === 'true';
        }

        if (search) {
          where.OR = [
            { fromName: { contains: String(search), mode: 'insensitive' } },
            { fromEmail: { contains: String(search), mode: 'insensitive' } },
            { subject: { contains: String(search), mode: 'insensitive' } },
            { body: { contains: String(search), mode: 'insensitive' } },
          ];
        }

        const messages = await (prisma as any).message.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: 200,
        });

        const totalMessages = await (prisma as any).message.count({ where });

        const stats = {
          total: await (prisma as any).message.count(),
          unread: await (prisma as any).message.count({ where: { isRead: false } }),
          quotes: await (prisma as any).message.count({ where: { type: 'quote' } }),
          contacts: await (prisma as any).message.count({ where: { type: 'contact' } }),
        };

        const transformedMessages = messages.map((m: any) => ({
          id: m.id,
          type: m.type,
          subject: m.subject,
          from: m.fromEmail,
          fromName: m.fromName,
          fromEmail: m.fromEmail,
          to: process.env.MJ_RECEIVER_EMAIL || null,
          summary: m.body.substring(0, 300),
          textContent: m.body,
          body: m.body,
          receivedAt: m.createdAt.toISOString(),
          read: m.isRead,
          starred: false,
          hasAttachments: m.hasAttachments,
          conversationId: m.conversationId || m.id,
          
          // Additional fields from database
          phone: m.phone,
          company: m.company,
          service: m.service,
          projectLocation: m.projectLocation,
          timeline: m.timeline,
          budget: m.budget,
          details: m.details,
        }));

        return res.status(200).json({
          success: true,
          messages: transformedMessages,
          stats,
          folder: 'inbox',
          totalMessages,
          filteredMessages: transformedMessages.length
        });

      } catch (error: any) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to fetch messages',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }

    case 'PUT':
      try {
        const { messageId, read, starred } = req.body;

        if (!messageId) {
          return res.status(400).json({ 
            success: false, 
            error: 'Message ID is required' 
          });
        }

        const updates: any = {};
        if (read !== undefined) updates.isRead = Boolean(read);

        // Apply update in DB
        await (prisma as any).message.update({
          where: { id: messageId },
          data: updates
        });

        return res.status(200).json({ 
          success: true, 
          message: 'Message updated successfully',
          messageId,
          updates
        });

      } catch (error: any) {
        console.error('Error updating message:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to update message',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }

    case 'DELETE':
      try {
        const { messageId, messageIds } = req.body;

        if (!messageId && (!messageIds || !Array.isArray(messageIds))) {
          return res.status(400).json({ 
            success: false, 
            error: 'Message ID or array of message IDs is required' 
          });
        }

        let deletedCount = 0;

        if (messageId) {
          // Delete single message
          await (prisma as any).message.delete({
            where: { id: messageId }
          });
          deletedCount = 1;
        } else if (messageIds) {
          // Delete multiple messages
          const result = await (prisma as any).message.deleteMany({
            where: { 
              id: { in: messageIds }
            }
          });
          deletedCount = result.count;
        }

        return res.status(200).json({ 
          success: true, 
          message: `Successfully deleted ${deletedCount} message(s)`,
          deletedCount
        });

      } catch (error: any) {
        console.error('Error deleting message(s):', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to delete message(s)',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ 
        success: false, 
        error: `Method ${req.method} not allowed` 
      });
  }
}

// Export with authentication middleware
export default requireAuth(messagesHandler);
