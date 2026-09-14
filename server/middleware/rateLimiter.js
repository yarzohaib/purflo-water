const rateLimit = require('express-rate-limit');

// Limits each IP to 5 contact-form submissions per 15 minutes.
// Protects against spam bots and abuse without blocking real users.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent from this device. Please try again in 15 minutes.',
  },
});

module.exports = { contactLimiter };
