import type { NextApiRequest, NextApiResponse } from 'next';
import { messageStore } from '../webhooks/mailjet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { type, read } = req.query;
      let filtered = [...messageStore];

      // Filter by type if specified
      if (type && (type === 'quote' || type === 'contact')) {
        filtered = filtered.filter((msg: any) => msg.type === type);
      }

      // Filter by read status if specified
      if (read !== undefined) {
        const isRead = read === 'true';
        filtered = filtered.filter((msg: any) => msg.read === isRead);
      }

      // Sort by received date (newest first)
      filtered.sort((a: any, b: any) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());

      return res.status(200).json({
        success: true,
        messages: filtered,
        stats: {
          total: messageStore.length,
          unread: messageStore.filter((msg: any) => !msg.read).length,
          quotes: messageStore.filter((msg: any) => msg.type === 'quote').length,
          contacts: messageStore.filter((msg: any) => msg.type === 'contact').length,
        }
      });
    }

    if (req.method === 'PUT') {
      const { messageId, read, replied } = req.body;

      const idx = messageStore.findIndex((m: any) => m.id === messageId);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Message not found' });
      }

      if (read !== undefined) messageStore[idx].read = read;
      if (replied !== undefined) messageStore[idx].replied = replied;

      return res.status(200).json({ success: true, message: messageStore[idx] });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });

  } catch (error) {
    console.error('Test messages API error:', error);
    return res.status(500).json({ success: false, error: 'Failed to process request' });
  }
}