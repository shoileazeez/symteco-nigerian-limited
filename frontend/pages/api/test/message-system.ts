import type { NextApiRequest, NextApiResponse } from 'next';
import { messageStore } from '../webhooks/mailjet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get all messages
    return res.status(200).json({
      success: true,
      totalMessages: messageStore.length,
      messages: messageStore.map(msg => ({
        id: msg.id,
        type: msg.type,
        from: msg.from,
        subject: msg.subject,
        receivedAt: msg.receivedAt,
        read: msg.read,
        replied: msg.replied
      }))
    });
  }

  if (req.method === 'POST') {
    const { action } = req.body;

    if (action === 'simulate-contact') {
      // Simulate a contact form submission
      const testMessage = {
        id: 'sim-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
        type: 'contact' as const,
        from: 'test.user@example.com',
        to: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
        subject: '📧 New Contact Form - Testing Message System',
        textContent: `NEW CONTACT MESSAGE

Name: Test User
Email: test.user@example.com
Phone: +234 801 234 5678
Service: Electrical Installation

Message:
This is a test message to verify that the contact form integration is working properly with the admin message system. The message should appear in the admin dashboard immediately.`,
        htmlContent: '',
        receivedAt: new Date().toISOString(),
        read: false,
        replied: false,
      };

      messageStore.push(testMessage);
      console.log('Simulated contact form submission:', testMessage);

      return res.status(200).json({
        success: true,
        message: 'Contact form submission simulated',
        messageId: testMessage.id
      });
    }

    if (action === 'simulate-quote') {
      // Simulate a quote request
      const testMessage = {
        id: 'sim-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
        type: 'quote' as const,
        from: 'business.owner@company.com',
        to: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
        subject: '🔥 URGENT: New Quote Request - Office Building Electrical System',
        textContent: `NEW QUOTE REQUEST

Name: Business Owner
Email: business.owner@company.com
Phone: +234 803 567 8901
Service: Commercial Electrical Installation
Location: Victoria Island, Lagos
Timeline: 3 months
Budget: ₦50 Million - ₦100 Million

Project Details:
We need a comprehensive electrical installation quote for our new 10-story office building. The project includes complete wiring, lighting systems, backup generators, and smart building automation.`,
        htmlContent: '',
        receivedAt: new Date().toISOString(),
        read: false,
        replied: false,
      };

      messageStore.push(testMessage);
      console.log('Simulated quote request:', testMessage);

      return res.status(200).json({
        success: true,
        message: 'Quote request simulated',
        messageId: testMessage.id
      });
    }

    if (action === 'simulate-webhook') {
      // Simulate a Mailjet webhook event
      const webhookEvent = {
        event: 'parse',
        From: 'webhook.test@mailjet.com',
        To: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
        Subject: 'Webhook Test - Incoming Email',
        'Text-part': 'This is a test email received via Mailjet webhook to verify the integration is working correctly.',
        'Html-part': '<p>This is a test email received via <strong>Mailjet webhook</strong> to verify the integration is working correctly.</p>'
      };

      // Process through the webhook handler logic
      const message = {
        id: 'webhook-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
        type: 'contact' as const,
        from: webhookEvent.From,
        to: webhookEvent.To,
        subject: webhookEvent.Subject,
        textContent: webhookEvent['Text-part'],
        htmlContent: webhookEvent['Html-part'],
        receivedAt: new Date().toISOString(),
        read: false,
        replied: false,
      };

      messageStore.push(message);
      console.log('Simulated webhook event:', message);

      return res.status(200).json({
        success: true,
        message: 'Webhook event simulated',
        messageId: message.id,
        webhookEvent
      });
    }

    if (action === 'clear') {
      // Clear all messages
      const count = messageStore.length;
      messageStore.splice(0, messageStore.length);
      
      return res.status(200).json({
        success: true,
        message: `Cleared ${count} messages from store`
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Invalid action. Use: simulate-contact, simulate-quote, simulate-webhook, or clear'
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed. Use GET to view messages or POST to simulate events.'
  });
}