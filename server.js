const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Simple sanitization
const escapeHTML = (str) =>
  str.replace(/[&<>"']/g, (s) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[s]));

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields (name, email, message) are required.');
  }

  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safeMessage = escapeHTML(message);

  try {
    const contactEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'jabdussalam011@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong><br/>${safeMessage}</p>
      `,
    });

    const confirmationEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: safeEmail,
      subject: 'Thank You for Contacting Us',
      html: `
        <p>Hi ${safeName},</p>
        <p>Thank you for reaching out! We’ve received your message and will get back to you as soon as possible.</p>
        <p>– Jabir Abdussalam</p>
      `,
    });

    console.log('Contact email sent:', contactEmail.id);
    console.log('Confirmation email sent:', confirmationEmail.id);

    res.send('Message sent successfully!');
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).send('Failed to send message.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
