import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, JWTPayload } from '../../../../../lib/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler function that requires authentication
async function markAsReadHandler(req: NextApiRequest, res: NextApiResponse, user: JWTPayload) {
  const { id } = req.query;

  if (req.method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    return res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} not allowed` 
    });
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ 
      success: false, 
      error: 'Message ID is required' 
    });
  }

  try {
    // Check if message exists
    const message = await (prisma as any).message.findUnique({
      where: { id: String(id) }
    });

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        error: 'Message not found' 
      });
    }

    // Mark as read
    await (prisma as any).message.update({
      where: { id: String(id) },
      data: { isRead: true }
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Message marked as read',
      messageId: id
    });

  } catch (error: any) {
    console.error('Error marking message as read:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to mark message as read',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Export with authentication middleware
export default requireAuth(markAsReadHandler);