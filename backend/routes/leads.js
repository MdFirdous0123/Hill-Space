const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect, adminOnly } = require('../middleware/auth');

// @route  POST /api/leads
// @desc   Submit consultation lead from website form
// @access Public
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, city, service, budget, message, whatsappOptIn } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone number are required' });
    }
    const lead = await Lead.create({
      name, phone, email, city, service, budget, message,
      whatsappOptIn: whatsappOptIn || false,
      source: 'website'
    });
    res.status(201).json({
      success: true,
      message: 'Thank you! Our design expert will contact you within 24 hours.',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// @route  GET /api/leads
// @desc   Get all leads (admin only)
// @access Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status, service, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (service) filter.service = service;
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Lead.countDocuments(filter);
    res.json({ success: true, count: leads.length, total, page: +page, leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route  PUT /api/leads/:id/status
// @desc   Update lead status (admin only)
// @access Private/Admin
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true, runValidators: true }
    );
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
