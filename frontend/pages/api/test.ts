import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Check environment variables
  const envCheck = {
    hasPublicKey: !!process.env.MJ_APIKEY_PUBLIC,
    hasPrivateKey: !!process.env.MJ_APIKEY_PRIVATE,
    hasSenderEmail: !!process.env.MJ_SENDER_EMAIL,
    hasReceiverEmail: !!process.env.MJ_RECEIVER_EMAIL,
    nodeEnv: process.env.NODE_ENV || 'development'
  };

  res.status(200).json({
    success: true,
    message: 'API is working correctly',
    environment: envCheck,
    timestamp: new Date().toISOString()
  });
}