import type { NextApiRequest, NextApiResponse } from 'next';
import { messageStore } from '../webhooks/mailjet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Adding debug message directly to messageStore...');
    
    // Add a test message directly to the store
    const testMessage = {
      id: 'debug-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
      type: 'contact' as const,
      from: 'debug@test.com',
      to: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
      subject: '🧪 Debug: Direct Message Store Test',
      textContent: 'This message was added directly to the messageStore to test if the store is working properly.',
      htmlContent: '<p>This message was added directly to the messageStore to test if the store is working properly.</p>',
      receivedAt: new Date().toISOString(),
      read: false,
      replied: false,
    };

    console.log('Before adding message, messageStore length:', messageStore.length);
    messageStore.push(testMessage);
    console.log('After adding message, messageStore length:', messageStore.length);
    console.log('Added message:', testMessage);

    return res.status(200).json({
      success: true,
      message: 'Debug message added directly to store',
      messageId: testMessage.id,
      storeLength: messageStore.length,
      addedMessage: testMessage
    });

  } catch (error) {
    console.error('Error adding debug message:', error);
    return res.status(500).json({ error: 'Failed to add debug message', details: error.message });
  }
}