require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mailjet = require('node-mailjet');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mailjetClient = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, service, message } = req.body;

  try {
    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: "Website Contact"
          },
          To: [
            {
              Email: process.env.MJ_RECEIVER_EMAIL,
              Name: "Recipient"
            }
          ],
          Subject: "New Contact Form Submission",
          HTMLPart: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong> ${message}</p>
          `
        }
      ]
    });
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));