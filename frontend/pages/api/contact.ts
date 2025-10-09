import type { NextApiRequest, NextApiResponse } from 'next';
import mailjet from 'node-mailjet';

const mailjetClient = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC!,
  process.env.MJ_APIKEY_PRIVATE!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, phone, company, service, message } = req.body;

  try {
    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL!,
            Name: 'Website Contact',
          },
          To: [
            {
              Email: process.env.MJ_RECEIVER_EMAIL!,
              Name: 'Recipient',
            },
          ],
          Subject: 'New Contact Form Submission',
          HTMLPart: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong> ${message}</p>
          `,
        },
      ],
    });
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
  }
}
