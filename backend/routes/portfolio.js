const express = require('express');
const router = express.Router();

const portfolioData = [
  {
    id: 1, slug: 'modern-modular-kitchen-pune',
    title: 'Modern Modular Kitchen', category: 'modular-kitchen',
    location: 'Pune, Maharashtra', area: '180 sqft', year: 2024,
    budget: '₹3.2 L', duration: '28 days',
    before: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=800&auto=format',
    after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&auto=format',
      'https://images.unsplash.com/photo-1556909196-11b17b7c9a5a?w=800&auto=format'
    ],
    description: 'A sleek contemporary kitchen with handleless cabinets, quartz countertops, and integrated appliances.',
    features: ['Handleless finish', 'Quartz countertop', 'Soft-close hinges', 'LED strip lighting', 'Pull-out units'],
    testimonial: { client: 'Priya Sharma', text: 'Absolutely love my new kitchen! Hillspace exceeded every expectation.' }
  },
  {
    id: 2, slug: 'luxury-living-room-mumbai',
    title: 'Luxury Living Room', category: 'living-room',
    location: 'Mumbai, Maharashtra', area: '320 sqft', year: 2024,
    budget: '₹5.8 L', duration: '35 days',
    before: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&auto=format',
    after: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&auto=format'
    ],
    description: 'Warm, elegant living space with a custom TV unit, sofa, and statement false ceiling.',
    features: ['Custom TV unit', 'False ceiling with coves', 'Textured wall panels', 'Premium sofa set', 'Ambient lighting'],
    testimonial: { client: 'Rahul Mehta', text: 'My living room went from boring to stunning. Best decision ever!' }
  },
  {
    id: 3, slug: 'master-bedroom-nashik',
    title: 'Master Bedroom Suite', category: 'bedroom',
    location: 'Nashik, Maharashtra', area: '240 sqft', year: 2024,
    budget: '₹4.1 L', duration: '30 days',
    before: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format',
    after: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format',
      'https://images.unsplash.com/photo-1560185127-6a6abd5f5dbf?w=800&auto=format'
    ],
    description: 'A serene master bedroom with walk-in wardrobe, statement headboard, and layered lighting.',
    features: ['Walk-in wardrobe', 'Custom headboard', 'Layered lighting', 'Study corner', 'Venetian plaster wall'],
    testimonial: { client: 'Anjali Desai', text: 'Feels like a 5-star hotel every morning. Worth every rupee!' }
  },
  {
    id: 4, slug: 'full-home-interior-thane',
    title: 'Complete 3BHK Home', category: 'full-home',
    location: 'Thane, Maharashtra', area: '1100 sqft', year: 2024,
    budget: '₹22 L', duration: '42 days',
    before: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format',
    after: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format'
    ],
    description: 'Complete 3BHK transformation — kitchen, living, dining, 3 bedrooms, and 2 bathrooms.',
    features: ['3 bedrooms', 'Modular kitchen', 'Living + dining', '2 bathrooms', 'False ceilings throughout'],
    testimonial: { client: 'Vikram Joshi', text: 'Hillspace delivered on time, on budget, and beyond our imagination.' }
  },
  {
    id: 5, slug: 'wardrobe-design-aurangabad',
    title: 'Sliding Wardrobe Design', category: 'wardrobe',
    location: 'Aurangabad, Maharashtra', area: '90 sqft', year: 2024,
    budget: '₹1.6 L', duration: '18 days',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format',
    after: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&auto=format'
    ],
    description: 'Floor-to-ceiling sliding wardrobe with mirror panels and custom internal organization.',
    features: ['Mirror sliding doors', 'Custom internals', 'Soft-close system', 'LED inside lighting', 'Shoe rack'],
    testimonial: { client: 'Neha Kulkarni', text: 'So much storage and it looks absolutely gorgeous!' }
  },
  {
    id: 6, slug: 'false-ceiling-pune',
    title: 'False Ceiling Design', category: 'false-ceiling',
    location: 'Pune, Maharashtra', area: '400 sqft', year: 2024,
    budget: '₹1.2 L', duration: '10 days',
    before: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format',
    after: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format'
    ],
    description: 'Multi-level POP false ceiling with cove lighting and recessed spotlights.',
    features: ['Multi-level design', 'Cove lighting', 'Recessed spotlights', 'Moisture resistant', 'Fire rated boards'],
    testimonial: { client: 'Suresh Patil', text: 'The ceiling completely changed the feel of our home!' }
  }
];

// @route  GET /api/portfolio
router.get('/', (req, res) => {
  const { category } = req.query;
  let data = portfolioData;
  if (category && category !== 'all') {
    data = portfolioData.filter(p => p.category === category);
  }
  res.json({ success: true, count: data.length, data });
});

// @route  GET /api/portfolio/:slug
router.get('/:slug', (req, res) => {
  const item = portfolioData.find(p => p.slug === req.params.slug);
  if (!item) return res.status(404).json({ success: false, message: 'Portfolio item not found' });
  res.json({ success: true, data: item });
});

module.exports = router;
