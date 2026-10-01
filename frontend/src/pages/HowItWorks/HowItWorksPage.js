import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiChevronDown, FiChevronUp, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import './HowItWorksPage.css';

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

const STEPS = [
  { num: '01', title: 'Book Your Free Consultation', icon: '📞',
    desc: 'Call us, WhatsApp us, or fill the form. One of our design experts will reach out within 24 hours to understand your vision, space, and budget. No commitment. Just a conversation.' },
  { num: '02', title: 'Site Visit & Measurement', icon: '📐',
    desc: 'Our team visits your home, takes precise measurements using digital tools, documents existing conditions, and identifies structural opportunities and constraints.' },
  { num: '03', title: '3D Design Presentation', icon: '🎨',
    desc: 'Within 5-7 working days, we present a complete 3D visualisation of your space — room by room — with multiple design options, material choices, and full cost transparency.' },
  { num: '04', title: 'Finalise & Sign', icon: '✍️',
    desc: 'Once you love the design and agree to the quote, we finalise materials, sign the contract, and collect a 10% booking advance. Everything is documented — no surprises.' },
  { num: '05', title: 'Execution Begins', icon: '🔨',
    desc: 'Our expert craftsmen begin work on schedule. You have a dedicated project manager keeping you updated daily via WhatsApp. Quality checks happen at every stage.' },
  { num: '06', title: 'Handover & Warranty', icon: '🏡',
    desc: 'We walk you through every detail of your finished home. Any snags are fixed immediately. You receive your 10-year warranty certificate and a care guide for your new interiors.' }
];

const FAQS = [
  { q: 'How long does a typical interior project take?', a: 'Our standard timelines are: Modular Kitchen (15-28 days), Wardrobe (10-18 days), Single Room (18-30 days), Full Home 2BHK (35-42 days), Full Home 3BHK (40-45 days). These are guaranteed timelines, not estimates.' },
  { q: 'What is included in the 10-Year Warranty?', a: 'Our 10-year warranty covers: structural integrity of all carpentry, hardware replacement (hinges, channels, handles), manufacturing defects in laminate finishes, and false ceiling structural issues. It does not cover normal wear and tear or damage caused by misuse.' },
  { q: 'Are there any hidden charges?', a: 'Absolutely none. Our Bill of Quantity (BOQ) is completely itemised — every material, fitting, and labour cost is listed before you sign. What you see is what you pay.' },
  { q: 'How much does a modular kitchen cost in Pune/Mumbai?', a: 'A standard modular kitchen in Maharashtra starts at ₹1.2 Lakhs for a basic setup and goes up to ₹8 Lakhs+ for a premium island kitchen. Use our Price Estimator for an instant ballpark.' },
  { q: 'Can I change the design after signing?', a: 'Minor changes can be accommodated before production begins. Significant changes after production starts may incur additional costs, which we will always communicate transparently upfront.' },
  { q: 'Do you service my city?', a: 'We currently serve Mumbai, Pune, Thane, Nashik, Aurangabad, Nagpur, Navi Mumbai, and surrounding areas. Call us to confirm for your specific location.' },
  { q: 'What brands of hardware do you use?', a: 'We use Hettich, Häfele, and Ebco hardware — German-precision brands that are backed by their own warranties. We do not compromise on hardware quality.' }
];

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)}>
        <span>{faq.q}</span>
        {open ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
      </button>
      {open && <div className="faq-answer"><p>{faq.a}</p></div>}
    </div>
  );
};

const HowItWorksPage = () => (
  <>
    <Helmet>
      <title>How It Works — Hillspace Interior Design Studio</title>
      <meta name="description" content="Learn about Hillspace's 6-step interior design process — from free consultation to guaranteed handover in 45 days with a 10-year warranty." />
    </Helmet>

    <div className="page-hero">
      <div className="container">
        <FadeUp>
          <span className="badge badge-gold">Our Process</span>
          <h1 className="section-title" style={{marginTop:'12px', fontSize:'48px'}}>
            How It <span>Works</span>
          </h1>
          <div className="divider"></div>
          <p className="section-subtitle">
            A clear, transparent 6-step process from your first call to your final walkthrough. No surprises. No stress.
          </p>
        </FadeUp>
      </div>
    </div>

    {/* Steps */}
    <section className="section">
      <div className="container">
        <div className="hiw-steps">
          {STEPS.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.1} className="hiw-step">
              <div className="hiw-step__left">
                <div className="hiw-step__num">{step.num}</div>
                {i < STEPS.length - 1 && <div className="hiw-step__line"></div>}
              </div>
              <div className="hiw-step__content">
                <div className="hiw-step__icon">{step.icon}</div>
                <h3 className="hiw-step__title">{step.title}</h3>
                <p className="hiw-step__desc">{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* Trust stats */}
    <section className="section-sm hiw-stats-section">
      <div className="container">
        <div className="hiw-stats">
          {[
            { num: '200+', label: 'Projects Completed' },
            { num: '5+',   label: 'Years of Excellence' },
            { num: '10',   label: 'Year Warranty' },
            { num: '4.8',  label: '/ 5 Customer Rating' }
          ].map((s, i) => (
            <FadeUp key={i} delay={i * 0.1} className="hiw-stat">
              <div className="hiw-stat__num">{s.num}</div>
              <div className="hiw-stat__label">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section">
      <div className="container">
        <FadeUp className="text-center">
          <span className="badge badge-gold">Questions?</span>
          <h2 className="section-title" style={{marginTop:'12px'}}>Frequently Asked <span>Questions</span></h2>
          <div className="divider divider-center"></div>
        </FadeUp>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <FAQItem faq={faq} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-sm" style={{background:'var(--cream-mid)'}}>
      <div className="container text-center">
        <FadeUp>
          <h2 className="section-title">Still Have Questions?</h2>
          <p className="section-subtitle" style={{margin:'12px auto 32px'}}>
            Our team is available Mon–Sat, 9am–7pm. Reach us however you prefer.
          </p>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="tel:+917888709747" className="btn btn-gold btn-lg">
              <FiPhone size={18} /> Call Now
            </a>
            <a href="https://wa.me/917888709747" target="_blank" rel="noreferrer"
              className="btn btn-outline btn-lg" style={{gap:'8px',display:'inline-flex',alignItems:'center'}}>
              <FaWhatsapp size={20} color="#25D366" /> WhatsApp
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  </>
);

export default HowItWorksPage;
