const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route  POST /api/contact
// @desc   Submit contact form
// @access Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }
    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! We'll get back to you within 24 hours.",
      contactId: contact._id
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
