const express = require('express');
const { body, validationResult } = require('express-validator');
const xss = require('xss');
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../config/mailer');
const { contactLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number is too long')
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage('Phone number contains invalid characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  // Honeypot field - real users never fill this in, bots often do
  body('website').custom((value) => {
    if (value) {
      throw new Error('Spam detected');
    }
    return true;
  }),
];

router.post('/', contactLimiter, validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please check your input.',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { name, email, phone, message } = req.body;

    // Extra layer of sanitization against any stored/reflected XSS
    const clean = {
      name: xss(name),
      email: xss(email),
      phone: phone ? xss(phone) : '',
      message: xss(message),
    };

    const contact = await Contact.create({
      ...clean,
      ipAddress: req.ip,
    });

    // Don't let a slow/broken email provider fail the user-facing request
    sendContactNotification(clean).catch((err) => {
      console.error('Email notification failed:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Thanks for reaching out! We'll get back to you shortly.",
      id: contact._id,
    });
  } catch (err) {
    console.error('Contact route error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on our end. Please try again later.',
    });
  }
});

module.exports = router;
