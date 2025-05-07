const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Initialize Resend with your API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Simple sanitization to prevent HTML injection
const escapeHTML = (str) => str.replace(/[&<>"']/g, (s) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[s]));

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).send('All fields (name, email, message) are required.');
  }

  // Sanitize input
  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safeMessage = escapeHTML(message);

  try {
    // Send main email to yourself
    const contactEmail = await resend.emails.send({
      from: `${safeName} <no-reply@yourdomain.com>`,
      to: 'jabdussalam011@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong><br/>${safeMessage}</p>
      `,
    });

    // Send auto-response to user
    const confirmationEmail = await resend.emails.send({
      from: 'jabdussalam011@gmail.com',
      to: safeEmail,
      subject: 'Thank You for Contacting Us',
      html: `
        <p>Hi ${safeName},</p>
        <p>Thank you for reaching out! We’ve received your message and will get back to you as soon as possible.</p>
        <p>– Your Name or Team</p>
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
