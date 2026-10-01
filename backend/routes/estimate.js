const express = require('express');
const router = express.Router();
const Estimate = require('../models/Estimate');

// Pricing data (per sqft in INR)
const PRICING = {
  'modular-kitchen': { essential: 1200, premium: 1900, luxury: 2800 },
  'wardrobe':        { essential: 800,  premium: 1400, luxury: 2200 },
  'full-home':       { essential: 1500, premium: 2400, luxury: 3800 },
  'living-room':     { essential: 1000, premium: 1800, luxury: 3000 },
  'bedroom':         { essential: 900,  premium: 1600, luxury: 2600 }
};

const VARIATION = 0.15; // ±15% range

// @route  POST /api/estimate
// @desc   Calculate and save price estimate
// @access Public
router.post('/', async (req, res) => {
  try {
    const { serviceType, area, budgetTier, rooms, city, phone, email } = req.body;

    if (!serviceType || !area || !budgetTier || !phone) {
      return res.status(400).json({ success: false, message: 'Service type, area, budget tier, and phone are required' });
    }

    const pricing = PRICING[serviceType];
    if (!pricing) {
      return res.status(400).json({ success: false, message: 'Invalid service type' });
    }

    const baseRate = pricing[budgetTier];
    if (!baseRate) {
      return res.status(400).json({ success: false, message: 'Invalid budget tier' });
    }

    const baseAmount = baseRate * area;
    const estimatedMin = Math.round(baseAmount * (1 - VARIATION));
    const estimatedMax = Math.round(baseAmount * (1 + VARIATION));

    const estimate = await Estimate.create({
      serviceType, area: +area, budgetTier, rooms: rooms || 1,
      city, phone, email, estimatedMin, estimatedMax
    });

    res.status(201).json({
      success: true,
      message: 'Estimate calculated successfully!',
      data: {
        estimateId: estimate._id,
        serviceType,
        area: +area,
        budgetTier,
        estimatedMin,
        estimatedMax,
        formattedMin: formatINR(estimatedMin),
        formattedMax: formatINR(estimatedMax),
        note: 'Final pricing may vary based on materials, design complexity, and site conditions. Book a free consultation for an accurate quote.'
      }
    });
  } catch (error) {
    console.error('Estimate error:', error);
    res.status(500).json({ success: false, message: 'Server error during estimation' });
  }
});

function formatINR(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000)   return `₹${(amount / 100000).toFixed(1)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

module.exports = router;
