const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
require('dotenv').config(); // If using a .env file

const app = express();
const PORT = 3000;

// Replace with your actual API key
const resend = new Resend(process.env.RESEND_API_KEY); // or use the API key directly

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: `${name}`,
      to: 'jabdussalam011@gmail.com',
      subject: 'New Contact Form Submission',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    console.log('Email sent:', data);
    res.send('Message sent successfully!');
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).send('Failed to send message.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});