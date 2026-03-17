const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email to gym admin
const sendAdminEmail = async (formData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `New Contact Form Submission - ${formData.name}`,
    html: `
      <h1>New Contact Form Submission</h1>
      <h3>Details:</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Goal:</strong> ${formData.goal || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      <hr>
      <p>Received at: ${new Date().toLocaleString()}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Send confirmation email to user
const sendUserConfirmationEmail = async (formData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"Gym Fitness" <${process.env.EMAIL_USER}>`,
    to: formData.email,
    subject: 'Thank you for contacting us!',
    html: `
      <h1>Thank You for Reaching Out!</h1>
      <p>Dear ${formData.name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <h3>Your Submission:</h3>
      <p><strong>Goal:</strong> ${formData.goal || 'Not specified'}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
      <p>In the meantime, feel free to:</p>
      <ul>
        <li>Visit our website for more information</li>
        <li>Follow us on social media for updates</li>
        <li>Check out our membership plans</li>
      </ul>
      <p>Best regards,<br>The Gym Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendAdminEmail, sendUserConfirmationEmail };