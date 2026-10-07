import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import { FiArrowRight, FiCheck, FiStar, FiPhone, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaWhatsapp, FaQuoteLeft } from 'react-icons/fa';
import { MdVerified, MdSchedule, MdAttachMoney, MdDesignServices } from 'react-icons/md';
import toast from 'react-hot-toast';
import { leadsAPI } from '../../utils/api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    slug: 'modular-kitchen', name: 'Modular Kitchen',
    desc: 'Custom modular kitchens with smart storage, premium shutters, and layouts designed for how you actually cook.',
    img: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=700&auto=format&fit=crop&q=85'
  },
  {
    slug: 'living-room', name: 'Living Room',
    desc: 'Statement walls, curated furniture, ambient lighting — living rooms that impress every guest and comfort every family.',
    img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=700&auto=format&fit=crop&q=85'
  },
  {
    slug: 'bedroom', name: 'Master Bedroom',
    desc: 'Serene, luxury bedrooms crafted for deep rest — from headboard walls to walk-in wardrobe integration.',
    img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&auto=format&fit=crop&q=85'
  },
  {
    slug: 'wardrobe', name: 'Wardrobe Design',
    desc: 'Floor-to-ceiling wardrobes with smart interiors, soft-close drawers, and integrated lighting.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=85'
  },
  {
    slug: 'false-ceiling', name: 'False Ceiling',
    desc: 'Multi-level POP & gypsum ceilings with cove lighting that transforms the mood of any space.',
    img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=700&auto=format&fit=crop&q=85'
  },
  {
    slug: 'full-home', name: 'Full Home Interior',
    desc: 'Complete end-to-end home transformation — kitchen, living, bedrooms, bathrooms, and more under one roof.',
    img: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=700&auto=format&fit=crop&q=85'
  }
];

const TRUST_BADGES = [
  { icon: <MdVerified size={36} />,    label: '10-Year Warranty',    sub: 'On all our work' },
  { icon: <MdSchedule size={36} />,    label: '45-Day Delivery',     sub: 'Guaranteed timelines' },
  { icon: <MdAttachMoney size={36} />, label: 'No Hidden Costs',     sub: '100% transparent pricing' },
  { icon: <MdDesignServices size={36} />, label: 'Personalised Design', sub: 'Built for your lifestyle' }
];

const TESTIMONIALS = [
  { name: 'Priya Sharma',    city: 'Patna',         rating: 5, text: 'Hillspace transformed our 3BHK completely. From the modular kitchen to the false ceiling — every detail was perfect. Delivered ahead of schedule!', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80' },
  { name: 'Rahul Mehta',     city: 'Muzaffarpur',   rating: 5, text: 'Absolutely stunning living room. What I loved most was the transparency — no hidden costs, the final bill matched the quote. Will recommend to everyone.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
  { name: 'Anjali Desai',    city: 'Hajipur',       rating: 5, text: 'My wardrobe is a dream. The sliding doors, internal layout, and lighting — it\'s like having a boutique in my bedroom. Best investment ever.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80' },
  { name: 'Vikram Joshi',    city: 'Darbhanga',     rating: 5, text: 'The team handled our full home interior from day one to handover. Professional, creative, and never once missed a commitment. 10/10.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
  { name: 'Sunita Kulkarni', city: 'Sitamarhi',     rating: 5, text: 'The modular kitchen Hillspace built for us is exactly what we dreamed of. Quality of materials is top-notch. Even our neighbors ask about it!', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80' }
];

// Properly matched before/after pairs — same room type before & after design
const BEFORE_AFTER = [
  {
    title: 'Modular Kitchen Transformation',
    before: 'https://images.unsplash.com/photo-1556911073-52527ac43761?w=700&auto=format&fit=crop&q=80',
    after:  'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=700&auto=format&fit=crop&q=80'
  },
  {
    title: 'Living Room Makeover',
    before: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=700&auto=format&fit=crop&q=80',
    after:  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&auto=format&fit=crop&q=80'
  },
  {
    title: 'Master Bedroom Redesign',
    before: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=700&auto=format&fit=crop&q=80',
    after:  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&auto=format&fit=crop&q=80'
  }
];

const CITIES = ['Muzaffarpur', 'Patna', 'Darbhanga', 'Hajipur', 'Sitamarhi', 'Motihari', 'Begusarai', 'Other'];

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── HomePage ─────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', city: '', whatsappOptIn: true });
  const [submitting, setSubmitting] = useState(false);
  const sliderRef = useRef(null);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number.');
      return;
    }
    setSubmitting(true);
    try {
      await leadsAPI.submit(formData);
      toast.success('🎉 Thank you! Our expert will call you within 24 hours.');
      setFormData({ name: '', phone: '', email: '', service: '', city: '', whatsappOptIn: true });
    } catch {
      toast.error('Something went wrong. Please call us directly!');
    } finally {
      setSubmitting(false);
    }
  };

  const testimonialSettings = {
    dots: true, infinite: true, speed: 600, slidesToShow: 1, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 5000, arrows: false, adaptiveHeight: true
  };

  return (
    <div className="homepage">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        className="hero"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero__overlay"></div>

        <div className="hero__content container-wide">
          <div className="hero__left">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="hero__eyebrow">Premium Interior Design Studio · Muzaffarpur, Bihar</span>
              <h1 className="hero__headline">
                Design Something <span>People Love.</span>
              </h1>
              <p className="hero__sub">
                From concept to handover — interiors that are personal, precise, and built to last a lifetime.
              </p>
              <div className="hero__badges">
                <span>✦ 45-Day Delivery</span>
                <span>✦ 10-Year Warranty</span>
                <span>✦ No Hidden Costs</span>
              </div>
              <div className="hero__rating">
                <div className="hero__stars">
                  {[1,2,3,4,5].map(i => <FiStar key={i} fill="#C9A355" color="#C9A355" size={18} />)}
                </div>
                <span className="hero__rating-text"><strong>4.8/5</strong> from 200+ Happy Families</span>
              </div>
              <div className="hero__cta-group">
                <Link to="/contact" className="btn btn-gold btn-lg">Book Free Consultation</Link>
                <Link to="/portfolio" className="btn hero__outline-btn">View Our Work →</Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero__form-card"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="hero__form-header">
              <h3>Book Free Design Consultation</h3>
              <span className="hero__form-step">1 / 2</span>
            </div>
            <form onSubmit={handleFormSubmit} className="hero__form">
              <div className="form-group">
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="Email Address (Optional)"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <select className="form-select" name="service" value={formData.service} onChange={handleFormChange}>
                  <option value="">Select Service</option>
                  <option value="modular-kitchen">Modular Kitchen</option>
                  <option value="living-room">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="wardrobe">Wardrobe Design</option>
                  <option value="full-home">Full Home Interior</option>
                  <option value="false-ceiling">False Ceiling</option>
                  <option value="bathroom">Bathroom</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <select className="form-select" name="city" value={formData.city} onChange={handleFormChange}>
                  <option value="">Select City</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <label className="hero__form-check">
                <input
                  type="checkbox"
                  name="whatsappOptIn"
                  checked={formData.whatsappOptIn}
                  onChange={handleFormChange}
                />
                <FaWhatsapp color="#25D366" size={16} />
                <span>Send me updates on WhatsApp</span>
              </label>
              <button type="submit" className="btn btn-gold" disabled={submitting} style={{width:'100%',justifyContent:'center'}}>
                {submitting ? 'Submitting...' : 'Get Free Consultation →'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BADGES ───────────────────────────────────────── */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            {TRUST_BADGES.map((b, i) => (
              <FadeUp key={i} delay={i * 0.1} className="trust-item">
                <div className="trust-item__icon">{b.icon}</div>
                <div>
                  <p className="trust-item__label">{b.label}</p>
                  <p className="trust-item__sub">{b.sub}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section className="section services-section">
        <div className="container">
          <FadeUp className="section-intro section-intro--center">
            <span className="section-label">What We Do Best</span>
            <h2 className="section-title">Our Signature <span>Services</span></h2>
            <p className="section-body">
              Every space is different. Every family is different. That's why we design
              interiors that are entirely and uniquely yours.
            </p>
          </FadeUp>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.slug} delay={i * 0.08}>
                <Link to={`/services/${s.slug}`} className={`service-card${i === 0 ? ' service-card--large' : ''}`}>
                  <img className="service-card__img" src={s.img} alt={s.name} loading="lazy" />
                  <div className="service-card__overlay" />
                  <div className="service-card__body">
                    <p className="service-card__tag">Hillspace</p>
                    <h3 className="service-card__name">{s.name}</h3>
                    <p className="service-card__desc">{s.desc}</p>
                    <span className="service-card__link">Explore <FiArrowRight size={14} /></span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
          <div className="text-center" style={{marginTop:'48px'}}>
            <Link to="/services" className="btn btn-outline">View All Services →</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section className="section how-section">
        <div className="container">
          <FadeUp className="text-center">
            <span className="badge badge-gold">Our Process</span>
            <h2 className="section-title" style={{marginTop:'12px'}}>How We Transform <span>Your Space</span></h2>
            <div className="divider divider-center"></div>
          </FadeUp>
          <div className="how-steps">
            {[
              { num: '01', title: 'Book Consultation', desc: 'Share your vision, requirements, and budget. We listen — really listen.' },
              { num: '02', title: 'Design & Plan', desc: 'Our designers create a personalised 3D design with detailed cost breakdown.' },
              { num: '03', title: 'Expert Execution', desc: 'Our craftsmen bring every element to life with precision and care.' },
              { num: '04', title: 'Handover & Warranty', desc: 'Final walkthrough, snag fixing, and your 10-year warranty certificate.' }
            ].map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.15} className="how-step">
                <div className="how-step__num">{step.num}</div>
                <h3 className="how-step__title">{step.title}</h3>
                <p className="how-step__desc">{step.desc}</p>
              </FadeUp>
            ))}
          </div>
          <div className="text-center" style={{marginTop:'48px'}}>
            <Link to="/how-it-works" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ─────────────────────────────────────── */}
      <section className="section before-after-section">
        <div className="container">
          <FadeUp className="text-center">
            <span className="badge badge-gold">Transformations</span>
            <h2 className="section-title" style={{marginTop:'12px'}}>The Hillspace <span>Difference</span></h2>
            <div className="divider divider-center"></div>
            <p className="section-subtitle">Every project starts with a vision. We make it reality.</p>
          </FadeUp>
          <div className="before-after-grid">
            {BEFORE_AFTER.map((item, i) => (
              <FadeUp key={i} delay={i * 0.12} className="ba-card">
                <h4 className="ba-card__title">{item.title}</h4>
                <div className="ba-card__images">
                  <div className="ba-card__img-wrap">
                    <img src={item.before} alt={`Before - ${item.title}`} loading="lazy" />
                    <span className="ba-badge ba-badge--before">Before</span>
                  </div>
                  <div className="ba-card__divider">→</div>
                  <div className="ba-card__img-wrap">
                    <img src={item.after} alt={`After - ${item.title}`} loading="lazy" />
                    <span className="ba-badge ba-badge--after">After</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="text-center" style={{marginTop:'40px'}}>
            <Link to="/portfolio" className="btn btn-gold">See Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* ── PRICE ESTIMATOR TEASER ─────────────────────────────── */}
      <section className="section estimator-teaser">
        <div className="container">
          <FadeUp className="text-center">
            <span className="badge badge-gold">Pricing</span>
            <h2 className="section-title" style={{marginTop:'12px'}}>Curious About the <span>Cost?</span></h2>
            <div className="divider divider-center"></div>
            <p className="section-subtitle">
              Get an instant ballpark estimate in seconds. Start with a 10% booking amount and we lock in your personalised plan.
            </p>
          </FadeUp>
          <div className="estimator-cards">
            {[
              { title: 'Modular Kitchen', icon: '🍳', slug: 'modular-kitchen', range: '₹1.2L – ₹5L+' },
              { title: 'Wardrobe Design', icon: '🚪', slug: 'wardrobe',         range: '₹80K – ₹3L+' },
              { title: 'Full Home Interior', icon: '🏠', slug: 'full-home',     range: '₹8L – ₹40L+' }
            ].map((card, i) => (
              <FadeUp key={card.slug} delay={i * 0.12} className="estimator-card">
                <div className="estimator-card__icon">{card.icon}</div>
                <h3 className="estimator-card__title">{card.title}</h3>
                <p className="estimator-card__range">Starting {card.range}</p>
                <Link to="/price-estimator" className="btn btn-outline-gold btn-sm">
                  Calculate Estimate →
                </Link>
                <p className="estimator-card__note">Get your approximate cost</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="section testimonials-section">
        <div className="container">
          <FadeUp className="text-center">
            <span className="badge badge-gold">Reviews</span>
            <h2 className="section-title" style={{marginTop:'12px'}}>What Our Families <span>Say</span></h2>
            <div className="divider divider-center"></div>
          </FadeUp>
          <div className="testimonials-slider-wrap">
            <Slider ref={sliderRef} {...testimonialSettings}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="testimonial-slide">
                  <div className="testimonial-card">
                    <FaQuoteLeft className="testimonial-quote-icon" size={32} />
                    <p className="testimonial-text">"{t.text}"</p>
                    <div className="testimonial-stars">
                      {[...Array(t.rating)].map((_, s) => <FiStar key={s} fill="#C9A355" color="#C9A355" size={16} />)}
                    </div>
                    <div className="testimonial-author">
                      <img src={t.img} alt={t.name} className="testimonial-avatar" />
                      <div>
                        <p className="testimonial-name">{t.name}</p>
                        <p className="testimonial-city">{t.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="testimonial-nav">
              <button onClick={() => sliderRef.current?.slickPrev()} className="testimonial-nav-btn">
                <FiChevronLeft size={20} />
              </button>
              <button onClick={() => sliderRef.current?.slickNext()} className="testimonial-nav-btn">
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ────────────────────────────────────────────────── */}
      <section className="section-sm map-section">
        <div className="container">
          <div className="map-grid">
            <FadeUp className="map-info">
              <span className="badge badge-gold">Visit Us</span>
              <h2 className="section-title" style={{marginTop:'12px'}}>Our <span>Studio</span></h2>
              <div className="divider"></div>
              <p style={{color:'var(--charcoal-lt)', fontSize:'15px', lineHeight:'1.8', marginBottom:'24px'}}>
                Step into our design studio and experience our material library, finish samples, and meet our team.
              </p>
              <div className="map-info__details">
                <div className="map-info__row">
                  <span>📍</span>
                  <div>
                    <strong>Hillspace Interior Design Studio</strong>
                    <p>Pakki Sarai Rd, near Punjab National Bank,<br/>Chandwara, Muzaffarpur, Bihar 842001</p>
                    <a href="https://maps.app.goo.gl/dYd6PZdzihjSDX3r7" target="_blank" rel="noreferrer" className="map-directions-link">
                      Get Directions →
                    </a>
                  </div>
                </div>
                <div className="map-info__row">
                  <span>📞</span>
                  <div>
                    <a href="tel:+919852878580" className="map-phone">+91 98528 78580</a>
                    <a href="tel:+917888709747" className="map-phone" style={{display:'block', marginTop:'4px', fontSize:'14px'}}>+91 7888709747 (WhatsApp)</a>
                    <p>Mon–Sat, 9am to 7pm</p>
                  </div>
                </div>
              </div>
              <div className="map-cta-group">
                <a href="tel:+917888709747" className="btn btn-gold">
                  <FiPhone size={16} /> Call Now
                </a>
                <a
                  href="https://wa.me/917888709747"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{gap:'8px',display:'inline-flex',alignItems:'center'}}
                >
                  <FaWhatsapp size={18} color="#25D366" /> WhatsApp
                </a>
              </div>
            </FadeUp>
            <div className="map-embed">
              <iframe
                title="Hillspace Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.823!2d85.3943432!3d26.1253178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed11b00588782b%3A0x2d832cc3c9e864248!2sHillSpace%20Interior!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section className="cta-banner">
        <div className="container">
          <FadeUp className="cta-banner__inner">
            <h2 className="cta-banner__heading">Ready to Transform Your Home?</h2>
            <p className="cta-banner__sub">
              Get a free design consultation with our experts. No commitment. Just inspiration.
            </p>
            <div className="cta-banner__actions">
              <Link to="/contact" className="btn btn-gold btn-lg">Book Free Consultation</Link>
              <a href="tel:+919852878580" className="btn btn-white btn-lg">
                <FiPhone size={18} /> +91 98528 78580
              </a>
              <a href="tel:+917888709747" className="btn btn-white btn-lg">
                <FiPhone size={18} /> +91 7888709747
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
