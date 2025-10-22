import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { messageStore as webhookStore } from '../webhooks/mailjet';

// Helper to get messages with fallback to test data
function getAllMessages() {
  // Prefer the webhook in-memory store
  if (webhookStore && Array.isArray(webhookStore) && webhookStore.length > 0) {
    return webhookStore;
  }

  // Fallback to global test messages (created by /api/test/generate-messages)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if ((global as any).testMessages && Array.isArray((global as any).testMessages)) {
    // Make a shallow copy so updates don't mutate the original test data unexpectedly
    return [...(global as any).testMessages];
  }

  return [];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Require authentication for this endpoint
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const { type, read } = req.query;
        const allMessages = getAllMessages();

        let filtered = [...allMessages];

        // Filter by type if specified
        if (type && (type === 'quote' || type === 'contact')) {
          filtered = filtered.filter((msg: any) => msg.type === type);
        }

        // Filter by read status if specified
        if (read !== undefined) {
          const isRead = read === 'true';
          filtered = filtered.filter((msg: any) => msg.read === isRead);
        }

        // Sort by received date (newest first) when available
        filtered.sort((a: any, b: any) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());

        return res.status(200).json({
          success: true,
          messages: filtered,
          stats: {
            total: allMessages.length,
            unread: allMessages.filter((msg: any) => !msg.read).length,
            quotes: allMessages.filter((msg: any) => msg.type === 'quote').length,
            contacts: allMessages.filter((msg: any) => msg.type === 'contact').length,
          }
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ success: false, error: 'Failed to fetch messages' });
      }

    case 'PUT':
      try {
        const { messageId, read, replied } = req.body;

        const allMessages = getAllMessages();
        const idx = allMessages.findIndex((m: any) => m.id === messageId);
        if (idx === -1) {
          return res.status(404).json({ success: false, error: 'Message not found' });
        }

        if (read !== undefined) allMessages[idx].read = read;
        if (replied !== undefined) allMessages[idx].replied = replied;

        return res.status(200).json({ success: true, message: allMessages[idx] });
      } catch (error) {
        console.error('Error updating message:', error);
        return res.status(500).json({ success: false, error: 'Failed to update message' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}