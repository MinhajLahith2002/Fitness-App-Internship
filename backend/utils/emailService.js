const nodemailer = require('nodemailer');

// Create transporter with verification and fallback to Ethereal in dev
const createTransporter = async () => {
  // If explicit request to use Ethereal (for local testing)
  if (process.env.USE_ETHEREAL === 'true' || process.env.NODE_ENV === 'test') {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Try real SMTP transport first
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Verify connection configuration — this will throw if DNS/network unreachable
    await transporter.verify();
    return transporter;
  } catch (err) {
    console.warn('Primary SMTP verify failed, attempting Ethereal fallback:', err.message);
    // Fallback to Ethereal for local/dev environments
    try {
      const testAccount = await nodemailer.createTestAccount();
      return nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (ethErr) {
      // If Ethereal creation also fails (likely offline), provide a no-op transporter
      console.warn('Ethereal test account creation failed — running in offline mode:', ethErr.message);
      return {
        sendMail: async (mailOptions) => {
          console.info('Offline mail stub — email not sent. Mail options:');
          console.info(JSON.stringify(mailOptions, null, 2));
          return { messageId: `offline-${Date.now()}`, accepted: [], rejected: [] };
        }
      };
    }
  }
};

// Send email to gym admin
const sendAdminEmail = async (formData) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `"Website Contact" <${process.env.EMAIL_USER || 'no-reply@example.com'}>`,
    to: process.env.EMAIL_USER || 'admin@example.com', // Send to yourself (admin)
    replyTo: formData.email, // Reply should go to the user who submitted the form
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

  const info = await transporter.sendMail(mailOptions);
  // If using Ethereal, log preview URL
  if (info && nodemailer.getTestMessageUrl(info)) {
    console.info('Ethereal preview URL:', nodemailer.getTestMessageUrl(info));
  }
  return info;
};

// Send confirmation email to user
const sendUserConfirmationEmail = async (formData) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `"Gym Fitness" <${process.env.EMAIL_USER || 'no-reply@example.com'}>`,
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

  const info = await transporter.sendMail(mailOptions);
  if (info && nodemailer.getTestMessageUrl(info)) {
    console.info('Ethereal preview URL (user confirmation):', nodemailer.getTestMessageUrl(info));
  }
  return info;
};

module.exports = { sendAdminEmail, sendUserConfirmationEmail };