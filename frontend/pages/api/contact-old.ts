import type { NextApiRequest, NextApiResponse } from 'next';
import mailjet from 'node-mailjet';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

const mailjetClient = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC!,
  process.env.MJ_APIKEY_PRIVATE!
);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  // Quote-specific fields
  projectLocation?: string;
  timeline?: string;
  budget?: string;
  details?: string;
  // Contact form specific fields
  firstName?: string;
  lastName?: string;
}

const formatContactEmail = (data: ContactFormData, isQuote: boolean = false) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  if (isQuote) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 20px; color: white; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; }
            .section { background: white; margin: 10px 0; padding: 15px; border-radius: 6px; border-left: 4px solid #1e40af; }
            .important { background: #fef3c7; border-left-color: #f59e0b; }
            .field { margin: 8px 0; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #6b7280; margin-left: 10px; }
            .footer { background: #374151; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>🔥 New Quote Request from Symteco Website</h2>
            <p>Received on ${currentDate}</p>
          </div>
          
          <div class="content">
            <div class="section important">
              <h3>🎯 Priority: Quote Request</h3>
              <p><strong>Response Required:</strong> Within 2 hours during business hours</p>
            </div>

            <div class="section">
              <h3>👤 Client Information</h3>
              <div class="field"><span class="label">Name:</span><span class="value">${data.name}</span></div>
              <div class="field"><span class="label">Email:</span><span class="value">${data.email}</span></div>
              <div class="field"><span class="label">Phone:</span><span class="value">${data.phone || 'Not provided'}</span></div>
              <div class="field"><span class="label">Company:</span><span class="value">${data.company || 'Not provided'}</span></div>
            </div>

            <div class="section">
              <h3>🔧 Project Information</h3>
              <div class="field"><span class="label">Service Required:</span><span class="value">${data.service}</span></div>
              <div class="field"><span class="label">Project Location:</span><span class="value">${data.projectLocation || 'Not specified'}</span></div>
              <div class="field"><span class="label">Timeline:</span><span class="value">${data.timeline || 'Not specified'}</span></div>
              <div class="field"><span class="label">Budget Range:</span><span class="value">${data.budget || 'Not specified'}</span></div>
            </div>

            <div class="section">
              <h3>📋 Project Details</h3>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 4px; margin-top: 10px;">
                <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${data.details || data.message}</pre>
              </div>
            </div>

            <div class="section important">
              <h3>⚡ Next Steps</h3>
              <ol>
                <li>Review project requirements carefully</li>
                <li>Conduct initial feasibility assessment</li>
                <li>Prepare detailed quote with breakdown</li>
                <li>Schedule consultation call if needed</li>
                <li>Respond within 2 hours during business hours</li>
              </ol>
            </div>
          </div>

          <div class="footer">
            <p><strong>Symteco Nigerian Limited</strong> | Professional Electrical & Mechanical Services</p>
            <p>📧 ibrotech144@gmail.com | 📞 08058244486 / 08087865823</p>
          </div>
        </body>
      </html>
    `;
  } else {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 20px; color: white; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; }
            .section { background: white; margin: 10px 0; padding: 15px; border-radius: 6px; border-left: 4px solid #1e40af; }
            .field { margin: 8px 0; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #6b7280; margin-left: 10px; }
            .footer { background: #374151; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>💬 New Contact Form Submission</h2>
            <p>Received on ${currentDate}</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>👤 Contact Information</h3>
              <div class="field"><span class="label">Name:</span><span class="value">${data.firstName ? `${data.firstName} ${data.lastName}` : data.name}</span></div>
              <div class="field"><span class="label">Email:</span><span class="value">${data.email}</span></div>
              <div class="field"><span class="label">Phone:</span><span class="value">${data.phone || 'Not provided'}</span></div>
              <div class="field"><span class="label">Service Interested:</span><span class="value">${data.service}</span></div>
              ${data.projectLocation ? `<div class="field"><span class="label">Location:</span><span class="value">${data.projectLocation}</span></div>` : ''}
            </div>

            <div class="section">
              <h3>📝 Message</h3>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 4px; margin-top: 10px;">
                <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${data.message}</pre>
              </div>
            </div>
          </div>

          <div class="footer">
            <p><strong>Symteco Nigerian Limited</strong> | Professional Electrical & Mechanical Services</p>
            <p>📧 ibrotech144@gmail.com | 📞 08058244486 / 08087865823</p>
          </div>
        </body>
      </html>
    `;
  }
};

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
    const emailSubject = isQuote 
      ? `🔥 URGENT: New Quote Request - ${data.service || 'General Inquiry'}`
      : `📧 New Contact Form - ${data.service || 'General Inquiry'}`;

    // Store the message in the admin system
    const textContent = isQuote 
      ? `NEW QUOTE REQUEST\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nService: ${data.service}\nLocation: ${data.projectLocation || 'N/A'}\nTimeline: ${data.timeline || 'N/A'}\nBudget: ${data.budget || 'N/A'}\n\nProject Details:\n${data.details || data.message}`
      : `NEW CONTACT MESSAGE\n\nName: ${data.firstName ? `${data.firstName} ${data.lastName}` : data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nService: ${data.service}\n\nMessage:\n${data.message}`;

    // Generate unique email message ID for threading
    const emailMessageId = `<${Date.now()}.${Math.random().toString(36).slice(2)}@symteco.com>`;

    // Check if there's an existing conversation with this email
    // Cast prisma to any to bypass missing generated model typings for 'conversation'
    const db: any = prisma;
    let conversation = await db.conversation.findFirst({
      where: {
        participantEmail: data.email,
        status: 'open'
      }
    });

    // Create new conversation if none exists
    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          subject: emailSubject,
          participantEmail: data.email,
          participantName: data.name,
          category: isQuote ? 'quote' : 'contact',
          priority: isQuote ? 'high' : 'normal',
          messageCount: 1,
          lastMessageAt: new Date()
        }
      });
    } else {
      // Update existing conversation
      await db.conversation.update({
        where: { id: conversation.id },
        data: {
          messageCount: { increment: 1 },
          lastMessageAt: new Date()
        }
      });
    }

    // Create the message record
    const message = await db.message.create({
      data: {
        conversationId: conversation.id,
        type: isQuote ? 'quote' : 'contact',
        subject: emailSubject,
        textContent,
        htmlContent: formatContactEmail(data, isQuote),
        fromEmail: data.email,
        fromName: data.name,
        toEmail: process.env.MJ_RECEIVER_EMAIL!,
        toName: 'Symteco Team',
        phone: data.phone,
        company: data.company,
        service: data.service,
        projectLocation: data.projectLocation,
        timeline: data.timeline,
        budget: data.budget,
        emailMessageId,
        read: false,
        replied: false
      }
    });

    console.log('Stored contact form submission in database:', { 
      messageId: message.id,
      conversationId: conversation.id,
      from: message.fromEmail, 
      subject: message.subject, 
      type: message.type
    });

    // Send email via Mailjet
    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL!,
            Name: 'Symteco Website',
          },
          To: [
            {
              Email: process.env.MJ_RECEIVER_EMAIL!,
              Name: 'Symteco Team',
            },
          ],
          Subject: emailSubject,
          HTMLPart: formatContactEmail(data, isQuote),
          TextPart: textContent,
          CustomID: `msg-${message.id}`,
          CustomCampaign: `contact-${conversation.id}`
        },
      ],
    });

    res.status(200).json({ 
      success: true, 
      message: isQuote 
        ? 'Quote request sent successfully! We\'ll respond within 2 hours during business hours.'
        : 'Message sent successfully! Thank you for contacting us.',
      messageId: message.id,
      conversationId: conversation.id
    });
  } catch (error: any) {
    console.error('Contact form processing error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
