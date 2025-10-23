import type { NextApiRequest, NextApiResponse } from 'next';
import { messageStore } from '../webhooks/mailjet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Debug information
    const debugInfo = {
      messageStoreLength: messageStore.length,
      messageStoreType: Array.isArray(messageStore) ? 'array' : typeof messageStore,
      sampleMessages: messageStore.slice(0, 3).map(msg => ({
        id: msg.id,
        type: msg.type,
        from: msg.from,
        subject: msg.subject.substring(0, 50) + '...',
        receivedAt: msg.receivedAt
      })),
      allMessageIds: messageStore.map(msg => msg.id),
      timestamp: new Date().toISOString(),
      serverMemory: process.memoryUsage(),
      environment: {
        hasMailjetReceiver: !!process.env.MJ_RECEIVER_EMAIL,
        hasMailjetSender: !!process.env.MJ_SENDER_EMAIL,
        hasMailjetKeys: !!(process.env.MJ_APIKEY_PUBLIC && process.env.MJ_APIKEY_PRIVATE),
        nodeEnv: process.env.NODE_ENV
      }
    };

    return res.status(200).json({
      success: true,
      debug: debugInfo,
      fullMessages: messageStore
    });

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return res.status(500).json({ error: 'Debug failed', details: error.message });
  }
}