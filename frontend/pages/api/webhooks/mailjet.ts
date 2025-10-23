import type { NextApiRequest, NextApiResponse } from 'next';

// Mailjet webhook payloads may arrive as a single object or an array of events.
type MJWebhookEvent = Record<string, any>;

// In-memory store for parsed incoming messages. In production, swap this for a DB.
const messageStore: Array<{
  id: string;
  type: 'quote' | 'contact';
  from: string;
  to: string;
  subject: string;
  textContent: string;
  htmlContent: string;
  receivedAt: string; // ISO string for easier JSON transport
  read: boolean;
  replied: boolean;
}> = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    // Mailjet can send an array of events; normalize to an array
    const events: MJWebhookEvent[] = Array.isArray(body) ? body : [body];

    for (const evt of events) {
      try {
        console.log('Mailjet webhook event:', evt.event || evt);

        // Only process parse (incoming email) events here; other events are logged
        const eventType = (evt.event || '').toString().toLowerCase();

        if (eventType === 'parse' || eventType === 'inbound' || evt['Text-part'] || evt['Html-part']) {
          await handleIncomingEmail(evt);
        } else {
          // Non-parse events: log for now
          console.log('Unhandled Mailjet event type:', evt.event);
        }
      } catch (e) {
        console.error('Error handling individual webhook event:', e);
      }
    }

    return res.status(200).json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleIncomingEmail(evt: MJWebhookEvent) {
  // Mailjet's parsed fields often include these keys. Fall back safely.
  const from = (evt.From || evt.from || evt['from'] || '').toString();
  const to = (evt.To || evt.to || evt['to'] || '').toString();
  const subject = (evt.Subject || evt.subject || '').toString();
  const textContent = (evt['Text-part'] || evt['text'] || evt['Text'] || '').toString();
  const htmlContent = (evt['Html-part'] || evt['html'] || '').toString();

  // Basic classification for quote vs contact
  const lower = `${subject} ${textContent}`.toLowerCase();
  const isQuoteRequest = lower.includes('quote') || lower.includes('pricing') || lower.includes('estimate');

  const message = {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 9),
    type: (isQuoteRequest ? 'quote' : 'contact') as 'quote' | 'contact',
    from,
    to,
    subject,
    textContent,
    htmlContent,
    receivedAt: new Date().toISOString(),
    read: false,
    replied: false,
  };

  messageStore.push(message);

  // Keep only the last 1000 messages
  if (messageStore.length > 1000) {
    messageStore.splice(0, messageStore.length - 1000);
  }

  console.log('Stored incoming email:', { from, subject, type: message.type, id: message.id });
}

export { messageStore };