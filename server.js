const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public')); // Serve your HTML/CSS
app.use(bodyParser.urlencoded({ extended: false }));

// Replace with your email config
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g. Gmail, Outlook
  auth: {
    user: 'jabdussalam011@gmail.com',
    pass: 'your_app_password', // Use an app password, not your Gmail password
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'jabdussalam011@gmail.com', // your email
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Something went wrong.');
    }
    res.send('Message sent successfully!');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
