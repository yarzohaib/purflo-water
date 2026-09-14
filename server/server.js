require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact');

const app = express();

// Trust the first proxy (Render/Vercel/Netlify sit behind one) so
// req.ip and rate-limiting see the real client IP.
app.set('trust proxy', 1);

connectDB();

// ---- Security middleware ----
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      connectSrc: ["'self'"],
    },
  })
);

// Allow only known frontend origins
const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (curl/Postman) with no origin header
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
  })
);

app.use(express.json({ limit: '10kb' })); // small limit - this API only accepts short form data
app.use(mongoSanitize()); // strips any $ / . operators to block NoSQL injection

// General API rate limit as a second line of defense beyond the per-route limiter
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ---- Routes ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'purflo-api' });
});

app.use('/api/contact', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Central error handler (keeps stack traces out of responses)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message === 'Not allowed by CORS' ? err.message : 'Server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Purflo API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
