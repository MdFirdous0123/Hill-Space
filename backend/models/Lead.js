const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    enum: ['modular-kitchen', 'living-room', 'bedroom', 'wardrobe', 'false-ceiling', 'full-home', 'bathroom', 'pooja-room', 'other'],
    default: 'other'
  },
  budget: {
    type: String,
    enum: ['under-5L', '5L-10L', '10L-20L', 'above-20L', 'not-decided'],
    default: 'not-decided'
  },
  message: {
    type: String,
    trim: true
  },
  whatsappOptIn: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'closed', 'not-interested'],
    default: 'new'
  },
  source: {
    type: String,
    enum: ['website', 'whatsapp', 'referral', 'social', 'other'],
    default: 'website'
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
