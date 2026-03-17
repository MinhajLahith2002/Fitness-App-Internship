const { sendAdminEmail, sendUserConfirmationEmail } = require('../utils/emailService');

const submitContactForm = async (req, res) => {
  try {
    const formData = req.body;

    // Send email to admin
    await sendAdminEmail(formData);

    // Send confirmation email to user
    await sendUserConfirmationEmail(formData);

    // Here you could also save to database if needed
    // await saveToDatabase(formData);

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully! We will contact you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Check if it's an email error
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email configuration error. Please try again later.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit form. Please try again later.'
    });
  }
};

module.exports = { submitContactForm };