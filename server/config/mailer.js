const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactNotification = async ({ name, email, phone, message }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0A2540;">
      <h2 style="color:#0B5FA8;">New Purflo Website Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;">${message}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Purflo Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `New enquiry from ${name} — Purflo Website`,
    html,
  });
};

module.exports = { sendContactNotification };
