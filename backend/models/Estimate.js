const mongoose = require('mongoose');

const EstimateSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
    enum: ['modular-kitchen', 'wardrobe', 'full-home', 'living-room', 'bedroom']
  },
  area: {
    type: Number,
    required: true,
    min: [50, 'Area must be at least 50 sqft']
  },
  budgetTier: {
    type: String,
    required: true,
    enum: ['essential', 'premium', 'luxury']
  },
  rooms: {
    type: Number,
    default: 1
  },
  city: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  estimatedMin: {
    type: Number
  },
  estimatedMax: {
    type: Number
  },
  status: {
    type: String,
    enum: ['calculated', 'contacted', 'converted'],
    default: 'calculated'
  }
}, { timestamps: true });

module.exports = mongoose.model('Estimate', EstimateSchema);
