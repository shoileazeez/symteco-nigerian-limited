import type { NextApiRequest, NextApiResponse } from 'next';
import mailjet from 'node-mailjet';
import { PrismaClient } from '@prisma/client';

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
  // Origin field to explicitly determine form type
  origin?: 'contact' | 'quote';
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
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;
  
  // Add comprehensive logging for debugging
  console.log('=== CONTACT API DEBUG ===');
  console.log('Full request body:', JSON.stringify(data, null, 2));
  console.log('Individual fields check:');
  console.log('- name:', data.name);
  console.log('- email:', data.email);
  console.log('- service:', data.service);
  console.log('- message:', data.message);
  console.log('- details:', data.details);
  console.log('- projectLocation:', data.projectLocation);
  console.log('- timeline:', data.timeline);
  console.log('- budget:', data.budget);
  console.log('- origin:', data.origin);
  console.log('========================');

  // Validate required fields
  if (!data.name || !data.email || (!data.message && !data.details)) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Determine message type: prefer explicit origin field, fallback to detection
  let isQuote = false;
  
  if (data.origin) {
    // Use explicit origin field when present (most reliable)
    isQuote = data.origin === 'quote';
    console.log('=== EXPLICIT ORIGIN DETECTION ===');
    console.log('Origin field provided:', data.origin);
    console.log('Type determined by origin:', isQuote ? 'quote' : 'contact');
    console.log('================================');
  } else {
    // Fallback to enhanced detection logic when origin not provided
    console.log('=== FALLBACK DETECTION (no origin field) ===');
    
    const hasStrongQuoteFields = Boolean(
      data.company ||
      data.timeline ||
      data.budget
    );

    const detailsLength = typeof data.details === 'string'
      ? data.details.trim().length
      : (data.message ? String(data.message).trim().length : 0);
    const hasLongDetails = detailsLength > 200; // long descriptions likely indicate a quote

    const hasQuoteKeywords = Boolean(
      (data.service && (
        data.service.toLowerCase().includes('quote') ||
        data.service.toLowerCase().includes('transformer') ||
        data.service.toLowerCase().includes('substation') ||
        data.service.toLowerCase().includes('distribution') ||
        data.service.toLowerCase().includes('installation') ||
        data.service.toLowerCase().includes('maintenance') ||
        data.service.toLowerCase().includes('electrical') ||
        data.service.toLowerCase().includes('mechanical')
      )) ||
      ((data.message || data.details) && (
        (data.message && data.message.toLowerCase().includes('quote')) ||
        (data.details && data.details.toLowerCase().includes('quote')) ||
        (data.message && data.message.toLowerCase().includes('budget')) ||
        (data.details && data.details.toLowerCase().includes('budget')) ||
        (data.message && data.message.toLowerCase().includes('timeline')) ||
        (data.details && data.details.toLowerCase().includes('timeline'))
      ))
    );

    // Default to quote if strong quote fields present, long details, or keyword matches.
    isQuote = hasStrongQuoteFields || hasLongDetails || hasQuoteKeywords;

    console.log('hasStrongQuoteFields:', hasStrongQuoteFields);
    console.log('hasLongDetails:', hasLongDetails);
    console.log('hasQuoteKeywords:', hasQuoteKeywords);
    console.log('Final isQuote decision:', isQuote);
    console.log('Details length:', detailsLength);
    console.log('==========================================');
  }
  
  try {
    console.log('Processing contact form submission (Mailjet only):', { 
      name: data.name, 
      email: data.email, 
      type: isQuote ? 'quote' : 'contact'
    });

    const emailSubject = isQuote 
      ? `🔥 URGENT: New Quote Request - ${data.service || 'General Inquiry'}`
      : `📧 New Contact Form - ${data.service || 'General Inquiry'}`;

    // Send email via Mailjet only - no database storage
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
          TextPart: isQuote 
            ? `NEW QUOTE REQUEST\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nService: ${data.service}\nLocation: ${data.projectLocation || 'N/A'}\nTimeline: ${data.timeline || 'N/A'}\nBudget: ${data.budget || 'N/A'}\n\nProject Details:\n${data.details || data.message}`
            : `NEW CONTACT MESSAGE\n\nName: ${data.firstName ? `${data.firstName} ${data.lastName}` : data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nService: ${data.service}\n\nMessage:\n${data.message}`
        },
      ],
    });

    console.log('Email sent successfully via Mailjet');

    // Save message to database with all fields
    try {
      const messageData = {
        source: 'website',
        type: isQuote ? 'quote' : 'contact',
        fromName: data.name,
        fromEmail: data.email,
        subject: isQuote ? `Quote: ${data.service || 'Inquiry'}` : `Contact: ${data.service || 'Inquiry'}`,
        body: (isQuote ? (data.details || data.message) : data.message),
        
        // Additional contact details
        phone: data.phone || null,
        company: data.company || null,
        service: data.service || null,
        
        // Quote-specific fields
        projectLocation: data.projectLocation || null,
        timeline: data.timeline || null,
        budget: data.budget || null,
        details: data.details || null,
        
        isRead: false,
        hasAttachments: false,
      };

      console.log('Saving message with data:', {
        type: messageData.type,
        isQuote,
        hasProjectLocation: !!data.projectLocation,
        hasTimeline: !!data.timeline,
        hasBudget: !!data.budget,
        hasDetails: !!data.details
      });

      await prisma.message.create({
        data: messageData
      });

      console.log('Successfully saved contact message to database with all details');
    } catch (dbErr) {
      console.error('Failed to save message to DB:', dbErr);
      // Continue — we still consider the request successful if email was sent
    }

    res.status(200).json({ 
      success: true, 
      message: isQuote 
        ? 'Quote request sent successfully! We\'ll respond within 2 hours during business hours.'
        : 'Message sent successfully! Thank you for contacting us.'
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}