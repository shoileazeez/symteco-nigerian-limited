import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, JWTPayload } from '../../../lib/jwt';
import { sendZohoReply, getZohoMessage } from '../../../lib/zoho-mail';

interface ReplyData {
  messageId: string; // Zoho message ID of the original message to reply to
  subject: string;
  message: string;
  isHtml?: boolean;
  ccAddress?: string;
  bccAddress?: string;
}

// Handler function that requires authentication
async function replyHandler(req: NextApiRequest, res: NextApiResponse, user: JWTPayload) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { messageId, subject, message, isHtml = false, ccAddress, bccAddress }: ReplyData = req.body;

    if (!messageId || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: messageId, subject, message'
      });
    }

    // Get the original message details from Zoho
    const originalMessage = await getZohoMessage(messageId);

    if (!originalMessage || !originalMessage.data) {
      return res.status(404).json({ 
        success: false, 
        error: 'Original message not found in Zoho Mail' 
      });
    }

    const msgData = originalMessage.data;

    // Prepare reply content
    const replyContent = isHtml ? message : formatReplyEmail(message, msgData);
    
    // Ensure subject has "Re: " prefix if not already present
    const replySubject = subject.startsWith('Re: ') ? subject : `Re: ${subject}`;

    // Send reply using Zoho Mail API
    const replyResponse = await sendZohoReply(messageId, {
      toAddress: msgData.fromAddress,
      subject: replySubject,
      content: replyContent,
      ccAddress,
      bccAddress
    });

    console.log('Reply sent successfully via Zoho Mail:', {
      originalMessageId: messageId,
      replyTo: msgData.fromAddress,
      subject: replySubject,
      status: replyResponse.status,
      newMessageId: replyResponse.data?.messageId
    });

    return res.status(200).json({
      success: true,
      message: 'Reply sent successfully via Zoho Mail',
      originalMessage: {
        id: msgData.messageId,
        from: msgData.fromAddress,
        subject: msgData.subject,
        conversationId: msgData.conversationId
      },
      reply: {
        id: replyResponse.data?.messageId,
        to: msgData.fromAddress,
        subject: replySubject,
        sentAt: new Date().toISOString()
      },
      zohoResponse: replyResponse
    });

  } catch (error: any) {
    console.error('Error sending reply via Zoho Mail:', error);
    
    // Handle specific Zoho API errors
    if (error.message.includes('401')) {
      return res.status(401).json({
        success: false,
        error: 'Zoho Mail authentication failed. Please check your API credentials.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }

    if (error.message.includes('404')) {
      return res.status(404).json({
        success: false,
        error: 'Original message not found. It may have been deleted or moved.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to send reply via Zoho Mail',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

function formatReplyEmail(message: string, originalMessage: any): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  // Determine if this was a quote request based on subject/content
  const originalSubject = originalMessage.subject?.toLowerCase() || '';
  const originalContent = originalMessage.summary?.toLowerCase() || '';
  const isQuote = originalSubject.includes('quote') || 
                  originalSubject.includes('pricing') || 
                  originalSubject.includes('estimate') ||
                  originalContent.includes('quote') ||
                  originalContent.includes('pricing');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f8fafc; }
          .container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin: 20px; }
          .header { background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 25px; color: white; text-align: center; }
          .header h2 { margin: 0 0 10px 0; font-size: 24px; font-weight: 600; }
          .header p { margin: 0; opacity: 0.9; font-size: 14px; }
          .content { padding: 30px; }
          .message-box { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af; margin: 20px 0; }
          .cta-box { background: #fef3c7; border: 1px solid #fbbf24; padding: 20px; border-radius: 8px; margin: 25px 0; }
          .cta-box h4 { margin: 0 0 15px 0; color: #92400e; font-size: 16px; }
          .cta-box ol { margin: 5px 0; color: #92400e; }
          .signature { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; }
          .contact-info { background: #f1f5f9; padding: 15px; border-radius: 6px; margin-top: 15px; }
          .contact-info p { margin: 5px 0; font-size: 14px; }
          .footer { background: #374151; color: white; padding: 20px; text-align: center; }
          .footer p { margin: 5px 0; }
          .emoji { font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2><span class="emoji">${isQuote ? '💼' : '📧'}</span> ${isQuote ? 'Quote Response' : 'Contact Response'} from Symteco</h2>
            <p>Response sent on ${currentDate}</p>
          </div>
          
          <div class="content">
            <h3 style="color: #1e40af; margin-top: 0;">Dear Valued Client,</h3>
            
            <p>Thank you for ${isQuote ? 'your quote request' : 'contacting us'}. We appreciate your interest in Symteco Nigerian Limited's professional electrical and mechanical services.</p>
            
            <div class="message-box">
              ${message.split('\n').map(paragraph => 
                paragraph.trim() ? `<p style="margin: 10px 0;">${paragraph}</p>` : ''
              ).join('')}
            </div>

            ${isQuote ? `
              <div class="cta-box">
                <h4><span class="emoji">📋</span> Next Steps for Your Quote Request:</h4>
                <ol style="margin: 10px 0;">
                  <li>Our technical team will review your project requirements carefully</li>
                  <li>We may reach out for additional specifications if needed</li>
                  <li>You'll receive a detailed proposal within 2-3 business days</li>
                  <li>We can schedule a consultation to discuss project details</li>
                  <li>Site visit can be arranged for accurate assessment</li>
                </ol>
                <p style="margin: 15px 0 5px 0; font-weight: 600; color: #92400e;">⚡ Priority Response: Quote requests receive expedited handling during business hours</p>
              </div>
            ` : `
              <div class="cta-box">
                <h4><span class="emoji">🤝</span> How We'll Assist You:</h4>
                <ul style="margin: 10px 0; color: #92400e;">
                  <li>Dedicated support for your inquiry</li>
                  <li>Expert consultation on your electrical/mechanical needs</li>
                  <li>Customized solutions for your specific requirements</li>
                  <li>Professional project assessment and recommendations</li>
                </ul>
              </div>
            `}

            <div class="signature">
              <p><strong>Best regards,</strong></p>
              <p style="color: #1e40af; font-weight: 600; font-size: 16px;">Symteco Nigerian Limited Team</p>
              <p style="color: #6b7280; font-style: italic;">Professional Electrical & Mechanical Engineering Solutions</p>
              
              <div class="contact-info">
                <p><strong><span class="emoji">📧</span> Email:</strong> ${process.env.ZOHO_FROM_EMAIL || 'info@symteco.com'}</p>
                <p><strong><span class="emoji">📞</span> Phone:</strong> 08058244486 / 08087865823</p>
                <p><strong><span class="emoji">🌐</span> Website:</strong> symteconigerialimited.com</p>
                <p><strong><span class="emoji">📍</span> Address:</strong> Professional Services across Nigeria</p>
              </div>
            </div>
          </div>

          <div class="footer">
            <p><strong>Symteco Nigerian Limited</strong></p>
            <p style="font-size: 14px; opacity: 0.9;">Excellence in Electrical & Mechanical Engineering Solutions</p>
            <p style="font-size: 12px; margin-top: 15px; opacity: 0.8;">
              This email was sent in response to your inquiry. For immediate assistance, please call our support line.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Export with authentication middleware
export default requireAuth(replyHandler);
