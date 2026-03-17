const express = require('express');
const router = express.Router();
const { validateContactForm } = require('../middleware/validationMiddleware');
const { submitContactForm } = require('../controllers/contactController');

// POST /api/contact
router.post('/', validateContactForm, submitContactForm);

module.exports = router;