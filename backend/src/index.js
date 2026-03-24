require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const awardRoutes = require('./routes/award');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Trust the reverse proxy (Render, etc.) so rate limiting uses the real client IP
app.set('trust proxy', 1);

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://reviewmypay.com', 'https://www.reviewmypay.com', /\.vercel\.app$/]
    : 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-admin-secret', 'x-test-mode'],
}));

// Rate limiting — generous for the public API, stricter for admin
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests — please try again in a few minutes.' },
});

const adminLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages — please try again later.' },
});

app.use('/api/award', publicLimiter, awardRoutes);
app.use('/api/admin', adminLimiter, adminRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`WageCheck API running on port ${PORT}`);
});

module.exports = app;
