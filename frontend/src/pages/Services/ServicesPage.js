import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import './ServicesPage.css';

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
};

const ALL_SERVICES = [
  {
    slug: 'modular-kitchen', name: 'Modular Kitchen', icon: '🍳',
    heroImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
    shortDesc: 'Smart, beautiful kitchens designed around the way your family cooks and lives.',
    desc: 'Our modular kitchens combine aesthetics with functionality. From parallel layouts to L-shaped and island kitchens — we design around your space and habits.',
    startingAt: '₹1.2 Lakhs',
    timeline: '15–28 days',
    features: ['Handleless & shaker finishes', 'Quartz & granite countertops', 'Soft-close hinges & channels', 'Tandem boxes & cargo units', 'Under-cabinet LED lighting', '10-year warranty on hardware']
  },
  {
    slug: 'living-room', name: 'Living Room', icon: '🛋️',
    heroImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop',
    shortDesc: 'Transform your living room into a space that wows guests and comforts family.',
    desc: 'Statement TV units, textured accent walls, designer sofas, and ambient lighting systems — we create living rooms that reflect your personality.',
    startingAt: '₹1.5 Lakhs',
    timeline: '20–35 days',
    features: ['Custom TV & entertainment units', 'False ceiling with cove lighting', 'Feature wall with panels/wallpaper', 'Sofa, coffee table & decor', 'Window treatments & curtains', 'Smart lighting systems']
  },
  {
    slug: 'bedroom', name: 'Master Bedroom', icon: '🛏️',
    heroImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
    shortDesc: 'Serene, personalised bedrooms that feel like a luxury retreat every night.',
    desc: 'From walk-in wardrobes to layered lighting and upholstered headboards — every element designed to give you the best sleep of your life.',
    startingAt: '₹1.8 Lakhs',
    timeline: '18–30 days',
    features: ['Custom headboard design', 'Walk-in or built-in wardrobes', 'Layered ambient lighting', 'Study nook or dressing area', 'Venetian plaster or wallpaper accent', 'Storage under bed']
  },
  {
    slug: 'wardrobe', name: 'Wardrobe Design', icon: '🚪',
    heroImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    shortDesc: 'Floor-to-ceiling wardrobes where every item has a perfect home.',
    desc: 'Sliding, hinged, or walk-in — our wardrobes are built with custom interiors that maximise every centimetre of space.',
    startingAt: '₹80,000',
    timeline: '10–18 days',
    features: ['Mirror, PU, or laminate doors', 'Custom internal organisation', 'Soft-close mechanism', 'LED strip inside', 'Shoe rack & accessories tray', 'Trouser rail & saree sections']
  },
  {
    slug: 'false-ceiling', name: 'False Ceiling', icon: '✨',
    heroImg: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop',
    shortDesc: 'Elevate every room with multi-level ceilings and dramatic lighting.',
    desc: 'POP, gypsum, and PVC false ceilings with cove lighting, recessed spotlights, and decorative elements that transform the feel of any room.',
    startingAt: '₹60,000',
    timeline: '7–14 days',
    features: ['Multi-level POP & gypsum', 'Cove lighting design', 'Recessed LED spotlights', 'Moisture-resistant options', 'Fire-rated boards', 'Flush diffuser AC grilles']
  },
  {
    slug: 'full-home', name: 'Full Home Interior', icon: '🏠',
    heroImg: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop',
    shortDesc: 'Complete home transformation from bare walls to beautiful living.',
    desc: 'Our complete home package covers every room — kitchen, living, dining, all bedrooms, bathrooms, and common areas — with a single design vision and dedicated project manager.',
    startingAt: '₹8 Lakhs',
    timeline: '35–45 days',
    features: ['Dedicated project manager', 'End-to-end execution', 'Modular kitchen included', 'All bedrooms & wardrobes', 'False ceilings throughout', 'Turnkey handover']
  },
  {
    slug: 'bathroom', name: 'Bathroom Design', icon: '🚿',
    heroImg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop',
    shortDesc: 'Spa-like bathrooms with premium tiles, fixtures, and thoughtful storage.',
    desc: 'We transform bathrooms into spa-like retreats with premium tiles, vanities, mirrors, and storage solutions.',
    startingAt: '₹1.2 Lakhs',
    timeline: '10–20 days',
    features: ['Premium tile selection', 'Custom vanity units', 'Mirror with LED backlight', 'Shower enclosures', 'Anti-skid flooring', 'Waterproofing guarantee']
  },
  {
    slug: 'pooja-room', name: 'Pooja Room', icon: '🪔',
    heroImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    shortDesc: 'Sacred, serene pooja spaces crafted with reverence and artistry.',
    desc: 'Custom-designed pooja rooms and mandirs with traditional craftsmanship, marble, wood, and spiritual lighting.',
    startingAt: '₹60,000',
    timeline: '7–15 days',
    features: ['Teak & marble options', 'Backlit panels', 'Custom storage', 'Traditional carvings', 'LED deepam lighting', 'Custom mandir designs']
  }
];

const ServicesPage = () => {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? ALL_SERVICES : ALL_SERVICES.filter(s => s.slug === active);

  return (
    <>
      <Helmet>
        <title>Our Services — Hillspace Interior Design Studio</title>
        <meta name="description" content="Explore Hillspace's full range of interior design services: modular kitchens, living rooms, bedrooms, wardrobes, false ceilings, full home interiors and more." />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero services-hero">
        <div className="container">
          <FadeUp>
            <span className="badge badge-gold">What We Offer</span>
            <h1 className="section-title" style={{marginTop:'12px', fontSize:'48px'}}>
              Our <span>Services</span>
            </h1>
            <div className="divider"></div>
            <p className="section-subtitle">
              Eight specialised services. One vision — to make your home the most beautiful space you've ever lived in.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="services-pg__grid">
            {ALL_SERVICES.map((s, i) => (
              <FadeUp key={s.slug} delay={i * 0.06} className="services-pg__card">
                <div className="services-pg__card-img">
                  <img src={s.heroImg} alt={s.name} loading="lazy" />
                  <div className="services-pg__card-badge">{s.icon}</div>
                </div>
                <div className="services-pg__card-body">
                  <h3 className="services-pg__card-name">{s.name}</h3>
                  <p className="services-pg__card-desc">{s.shortDesc}</p>
                  <div className="services-pg__card-meta">
                    <div className="services-pg__meta-item">
                      <span className="services-pg__meta-label">Starting at</span>
                      <span className="services-pg__meta-value">{s.startingAt}</span>
                    </div>
                    <div className="services-pg__meta-item">
                      <span className="services-pg__meta-label">Timeline</span>
                      <span className="services-pg__meta-value">{s.timeline}</span>
                    </div>
                  </div>
                  <ul className="services-pg__features">
                    {s.features.slice(0, 4).map((f, fi) => (
                      <li key={fi}><FiCheck size={14} color="var(--gold-dark)" /> {f}</li>
                    ))}
                  </ul>
                  <div className="services-pg__card-actions">
                    <Link to={`/services/${s.slug}`} className="btn btn-gold btn-sm">
                      View Details
                    </Link>
                    <Link to="/contact" className="btn btn-outline btn-sm">Get Quote</Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <div className="text-center">
            <h2 className="cta-banner__heading" style={{color:'#fff'}}>Not Sure Where to Start?</h2>
            <p className="cta-banner__sub">Book a free consultation and our designer will guide you through the best options for your space and budget.</p>
            <Link to="/contact" className="btn btn-white btn-lg" style={{display:'inline-flex', gap:'8px'}}>
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
