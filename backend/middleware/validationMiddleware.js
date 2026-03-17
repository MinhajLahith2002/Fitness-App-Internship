const { body, validationResult } = require('express-validator');

const validateContactForm = [
  // Name validation
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces')
    .escape(),

  // Email validation
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
    .escape(),

  // Goal validation (optional field)
  body('goal')
    .optional()
    .isIn(['Weight Loss', 'Muscle Gain', 'Endurance', 'General Fitness'])
    .withMessage('Invalid goal selection')
    .escape(),

  // Message validation
  body('message')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters long')
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters')
    .escape(),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().reduce((acc, err) => {
          acc[err.path] = err.msg;
          return acc;
        }, {})
      });
    }
    next();
  }
];

module.exports = { validateContactForm };