import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiFilter } from 'react-icons/fi';
import './PortfolioPage.css';

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
};

const PORTFOLIO = [
  { id: 1, title: 'Modern Modular Kitchen', category: 'modular-kitchen', location: 'Pune', area: '180 sqft', budget: '₹3.2 L', before: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=700&auto=format', after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&auto=format' },
  { id: 2, title: 'Luxury Living Room', category: 'living-room', location: 'Mumbai', area: '320 sqft', budget: '₹5.8 L', before: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=700&auto=format', after: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&auto=format' },
  { id: 3, title: 'Master Bedroom Suite', category: 'bedroom', location: 'Nashik', area: '240 sqft', budget: '₹4.1 L', before: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&auto=format', after: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&auto=format' },
  { id: 4, title: 'Complete 3BHK Transformation', category: 'full-home', location: 'Thane', area: '1100 sqft', budget: '₹22 L', before: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&auto=format', after: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=700&auto=format' },
  { id: 5, title: 'Sliding Wardrobe Design', category: 'wardrobe', location: 'Aurangabad', area: '90 sqft', budget: '₹1.6 L', before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format', after: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=700&auto=format' },
  { id: 6, title: 'Multi-Level False Ceiling', category: 'false-ceiling', location: 'Pune', area: '400 sqft', budget: '₹1.2 L', before: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&auto=format', after: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&auto=format' },
  { id: 7, title: 'Contemporary Kitchen', category: 'modular-kitchen', location: 'Nagpur', area: '210 sqft', budget: '₹3.8 L', before: 'https://images.unsplash.com/photo-1556909196-11b17b7c9a5a?w=700&auto=format', after: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=700&auto=format' },
  { id: 8, title: 'Minimalist Bedroom', category: 'bedroom', location: 'Mumbai', area: '200 sqft', budget: '₹3.2 L', before: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=700&auto=format', after: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&auto=format' },
  { id: 9, title: 'Full Flat Interior', category: 'full-home', location: 'Navi Mumbai', area: '850 sqft', budget: '₹16 L', before: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&auto=format', after: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=700&auto=format' }
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'full-home', label: 'Full Home' },
  { id: 'modular-kitchen', label: 'Kitchen' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'wardrobe', label: 'Wardrobe' },
  { id: 'false-ceiling', label: 'False Ceiling' }
];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('after'); // 'after' or 'before'

  const filtered = activeCategory === 'all' ? PORTFOLIO : PORTFOLIO.filter(p => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Our Portfolio — Hillspace Interior Design Studio</title>
        <meta name="description" content="Browse Hillspace's portfolio of stunning interior transformations across Maharashtra. Before and after photos of kitchens, living rooms, bedrooms, and full homes." />
      </Helmet>

      <div className="page-hero">
        <div className="container">
          <FadeUp>
            <span className="badge badge-gold">Our Work</span>
            <h1 className="section-title" style={{marginTop:'12px', fontSize:'48px'}}>
              Our <span>Portfolio</span>
            </h1>
            <div className="divider"></div>
            <p className="section-subtitle">
              Real projects. Real families. Real transformations across Maharashtra.
            </p>
          </FadeUp>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="portfolio-filters">
            <div className="portfolio-cats">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`portfolio-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="portfolio-view-toggle">
              <button className={viewMode === 'after' ? 'active' : ''} onClick={() => setViewMode('after')}>After</button>
              <button className={viewMode === 'before' ? 'active' : ''} onClick={() => setViewMode('before')}>Before</button>
              <button className={viewMode === 'split' ? 'active' : ''} onClick={() => setViewMode('split')}>Before & After</button>
            </div>
          </div>

          {/* Grid */}
          <div className="portfolio-grid">
            {filtered.map((item, i) => (
              <FadeUp key={item.id} delay={i * 0.07} className="portfolio-card">
                {viewMode === 'split' ? (
                  <div className="portfolio-card__split">
                    <div className="portfolio-card__img-wrap">
                      <img src={item.before} alt={`Before - ${item.title}`} loading="lazy" />
                      <span className="portfolio-card__badge portfolio-card__badge--before">Before</span>
                    </div>
                    <div className="portfolio-card__img-wrap">
                      <img src={item.after} alt={`After - ${item.title}`} loading="lazy" />
                      <span className="portfolio-card__badge portfolio-card__badge--after">After</span>
                    </div>
                  </div>
                ) : (
                  <div className="portfolio-card__img-wrap portfolio-card__img-wrap--full">
                    <img src={viewMode === 'before' ? item.before : item.after} alt={item.title} loading="lazy" />
                    <span className={`portfolio-card__badge portfolio-card__badge--${viewMode}`}>
                      {viewMode === 'before' ? 'Before' : 'After'}
                    </span>
                  </div>
                )}
                <div className="portfolio-card__info">
                  <div>
                    <h3 className="portfolio-card__title">{item.title}</h3>
                    <p className="portfolio-card__meta">📍 {item.location} · {item.area} · {item.budget}</p>
                  </div>
                  <Link to={`/services/${item.category}`} className="portfolio-card__link">
                    View Service →
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="text-center" style={{marginTop:'60px'}}>
            <p style={{color:'var(--charcoal-lt)', marginBottom:'20px', fontSize:'16px'}}>
              Love what you see? Let's create something beautiful for your home.
            </p>
            <Link to="/contact" className="btn btn-gold btn-lg">Book Free Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
