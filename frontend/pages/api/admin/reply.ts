import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import mailjet from 'node-mailjet';

// Ensure Mailjet credentials exist before creating a client
const MJ_PUBLIC = process.env.MJ_APIKEY_PUBLIC;
const MJ_PRIVATE = process.env.MJ_APIKEY_PRIVATE;
const MJ_SENDER = process.env.MJ_SENDER_EMAIL;
const MJ_RECEIVER = process.env.MJ_RECEIVER_EMAIL;

let mailjetClient: any = null;
if (MJ_PUBLIC && MJ_PRIVATE) {
  mailjetClient = mailjet.apiConnect(MJ_PUBLIC, MJ_PRIVATE);
} else {
  console.warn('Mailjet API keys are missing: check MJ_APIKEY_PUBLIC and MJ_APIKEY_PRIVATE');
}

interface ReplyData {
  to: string;
  subject: string;
  message: string;
  originalMessageId?: string;
  replyType: 'quote' | 'contact';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Require authentication
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { to, subject, message, originalMessageId, replyType }: ReplyData = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, message'
      });
    }

    // Format the email content
    const htmlContent = formatReplyEmail(message, replyType, subject);
    const textContent = stripHtml(message);

    if (!mailjetClient) {
      return res.status(500).json({ success: false, error: 'Mailjet configuration missing on server. Set MJ_APIKEY_PUBLIC and MJ_APIKEY_PRIVATE.' });
    }

    if (!MJ_SENDER || !MJ_RECEIVER) {
      return res.status(500).json({ success: false, error: 'Mailjet sender/receiver emails not configured. Set MJ_SENDER_EMAIL and MJ_RECEIVER_EMAIL.' });
    }

    // Send the email
    const response = await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: MJ_SENDER,
            Name: 'Symteco Nigerian Limited',
          },
          To: [
            {
              Email: to,
              Name: to.split('@')[0], // Use email username as name fallback
            },
          ],
          Subject: subject,
          HTMLPart: htmlContent,
          TextPart: textContent,
          ReplyTo: {
            Email: MJ_RECEIVER,
            Name: 'Symteco Support',
          },
        },
      ],
    });

    console.log('Email sent successfully:', {
      to,
      subject,
      status: response.response.status,
    });

    return res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      status: response.response.status,
    });
  } catch (error: any) {
    console.error('Error sending reply:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send reply',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

function formatReplyEmail(message: string, replyType: 'quote' | 'contact', subject: string): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isQuote = replyType === 'quote';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 20px; color: white; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; }
          .message { background: white; padding: 20px; border-radius: 6px; margin: 15px 0; }
          .footer { background: #374151; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
          .signature { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>${isQuote ? '💼 Quote Response' : '📧 Contact Response'} from Symteco</h2>
          <p>Response sent on ${currentDate}</p>
        </div>
        
        <div class="content">
          <div class="message">
            <h3>Dear Valued Client,</h3>
            <p>Thank you for ${isQuote ? 'your quote request' : 'contacting us'}. We appreciate your interest in Symteco Nigerian Limited's services.</p>
            
            <div style="margin: 20px 0;">
              ${message.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>

            ${isQuote ? `
              <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0; color: #92400e;">📋 Next Steps for Your Quote:</h4>
                <ol style="margin: 0; color: #92400e;">
                  <li>Our technical team will review your requirements</li>
                  <li>We may contact you for additional specifications</li>
                  <li>You'll receive a detailed proposal within 2-3 business days</li>
                  <li>Schedule a consultation to discuss the project details</li>
                </ol>
              </div>
            ` : ''}

            <div class="signature">
              <p><strong>Best regards,</strong></p>
              <p><strong>Symteco Nigerian Limited Team</strong></p>
              <p>Professional Electrical & Mechanical Services</p>
              <p>📧 Email: ${process.env.MJ_RECEIVER_EMAIL}</p>
              <p>📞 Phone: 08058244486 / 08087865823</p>
              <p>🌐 Website: symteconigerialimited.com</p>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Symteco Nigerian Limited</strong></p>
          <p>Excellence in Electrical & Mechanical Engineering Solutions</p>
          <p style="font-size: 12px; margin-top: 10px;">
            This email was sent in response to your inquiry. If you have any questions, please don't hesitate to contact us.
          </p>
        </div>
      </body>
    </html>
  `;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}