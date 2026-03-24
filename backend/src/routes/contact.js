const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

const RECIPIENT = 'reviewmypayapp@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (typeof name !== 'string' || name.length > 200) {
    return res.status(400).json({ error: 'Invalid name.' });
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (typeof message !== 'string' || message.length > 5000) {
    return res.status(400).json({ error: 'Message must be under 5,000 characters.' });
  }

  // Honeypot check — hidden field should be empty
  if (req.body._gotcha) {
    return res.json({ success: true }); // silently discard
  }

  try {
    await transporter.sendMail({
      from: `"Review My Pay Contact" <${process.env.SMTP_USER}>`,
      replyTo: `"${name.replace(/[<>"]/g, '')}" <${email}>`,
      to: RECIPIENT,
      subject: `Contact form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <hr />
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try emailing us directly.' });
  }
});

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = router;
