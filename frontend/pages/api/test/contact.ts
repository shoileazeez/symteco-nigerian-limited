import type { NextApiRequest, NextApiResponse } from 'next';
import { messageStore } from '../webhooks/mailjet';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  projectLocation?: string;
  timeline?: string;
  budget?: string;
  details?: string;
  firstName?: string;
  lastName?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const data: ContactFormData = req.body;

  // Validate required fields
  if (!data.name || !data.email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name and email are required fields.' 
    });
  }

  // Determine if this is a quote request or regular contact
  const isQuote = Boolean(data.details || data.projectLocation || data.timeline || data.budget);
  
  try {
    console.log('Processing test contact form submission:', { name: data.name, email: data.email, type: isQuote ? 'quote' : 'contact' });

    const emailSubject = isQuote 
      ? `🔥 URGENT: New Quote Request - ${data.service || 'General Inquiry'}`
      : `📧 New Contact Form - ${data.service || 'General Inquiry'}`;

    // Store the message in the admin system
    const textContent = isQuote 
      ? `NEW QUOTE REQUEST\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nService: ${data.service}\nLocation: ${data.projectLocation || 'N/A'}\nTimeline: ${data.timeline || 'N/A'}\nBudget: ${data.budget || 'N/A'}\n\nProject Details:\n${data.details || data.message}`
      : `NEW CONTACT MESSAGE\n\nName: ${data.firstName ? `${data.firstName} ${data.lastName}` : data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nService: ${data.service}\n\nMessage:\n${data.message}`;

    const message = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 9),
      type: (isQuote ? 'quote' : 'contact') as 'quote' | 'contact',
      from: data.email,
      to: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
      subject: emailSubject,
      textContent,
      htmlContent: `<div><h3>${emailSubject}</h3><pre>${textContent}</pre></div>`,
      receivedAt: new Date().toISOString(),
      read: false,
      replied: false,
    };

    console.log('Adding message to store:', { id: message.id, type: message.type, from: message.from });
    
    // Add to the message store
    messageStore.push(message);

    // Keep only the last 1000 messages
    if (messageStore.length > 1000) {
      messageStore.splice(0, messageStore.length - 1000);
    }

    console.log('Message added successfully. Store length:', messageStore.length);
    console.log('Stored contact form submission:', { 
      from: message.from, 
      subject: message.subject, 
      type: message.type, 
      id: message.id 
    });

    // Skip Mailjet for testing - just store the message
    console.log('Skipping Mailjet send for testing - message stored only');

    res.status(200).json({ 
      success: true, 
      message: isQuote 
        ? 'Quote request sent successfully! We\'ll respond within 2 hours during business hours.'
        : 'Message sent successfully! Thank you for contacting us.',
      messageId: message.id,
      storeLength: messageStore.length,
      debug: {
        isQuote,
        messageStored: true,
        mailjetSkipped: true
      }
    });
  } catch (error: any) {
    console.error('Contact form processing error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process message. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}