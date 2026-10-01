import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import './AboutPage.css';

const FadeUp = ({ children, delay=0, className='' }) => {
  const [ref, inView] = useInView({ threshold:0.1, triggerOnce:true });
  return (
    <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.6,delay}} className={className}>{children}</motion.div>
  );
};

const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us — Hillspace Interior Design Studio</title>
      <meta name="description" content="Learn about Hillspace Interior Design Studio — our story, values, team, and commitment to delivering beautiful, timely, and honest interior design across Maharashtra." />
    </Helmet>

    {/* Hero */}
    <div className="about-hero">
      <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1400&auto=format&fit=crop" alt="Hillspace studio" />
      <div className="about-hero__overlay">
        <div className="container">
          <FadeUp>
            <span className="badge badge-gold">Our Story</span>
            <h1 className="about-hero__title">We Build Dreams, <span>One Room at a Time</span></h1>
          </FadeUp>
        </div>
      </div>
    </div>

    {/* Story */}
    <section className="section">
      <div className="container">
        <div className="about-story">
          <FadeUp className="about-story__text">
            <span className="badge badge-gold">Who We Are</span>
            <h2 className="section-title" style={{marginTop:'12px'}}>Hillspace Interior <span>Design Studio</span></h2>
            <div className="divider"></div>
            <p>Hillspace was founded with one belief: <strong>every family deserves a home that reflects who they truly are.</strong> Not a generic, template-based interior — but a space that tells your unique story.</p>
            <p style={{marginTop:'16px'}}>We started small, with a simple commitment to three things: <strong>beautiful design, honest pricing, and delivered on time.</strong> Today, with 200+ completed projects across Maharashtra, that commitment has never wavered.</p>
            <p style={{marginTop:'16px'}}>Whether you're renovating a single room or transforming an entire home — you get our full attention, our best craftsmen, and a 10-year warranty that backs every single thing we do.</p>
            <div style={{marginTop:'32px', display:'flex', gap:'16px', flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-gold">Book Free Consultation</Link>
              <Link to="/portfolio" className="btn btn-outline">See Our Work</Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15} className="about-story__img">
            <img src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=700&auto=format&fit=crop" alt="Hillspace interior work" />
          </FadeUp>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="section-sm about-stats-section">
      <div className="container">
        <div className="about-stats">
          {[
            { num:'200+', label:'Projects Completed', icon:'🏠' },
            { num:'5+',   label:'Years of Experience', icon:'⭐' },
            { num:'10',   label:'Year Warranty', icon:'🏆' },
            { num:'4.8',  label:'Customer Rating', icon:'❤️' }
          ].map((s,i) => (
            <FadeUp key={i} delay={i*0.1} className="about-stat">
              <div className="about-stat__icon">{s.icon}</div>
              <div className="about-stat__num">{s.num}</div>
              <div className="about-stat__label">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section">
      <div className="container">
        <FadeUp className="text-center">
          <span className="badge badge-gold">What Drives Us</span>
          <h2 className="section-title" style={{marginTop:'12px'}}>Our <span>Core Values</span></h2>
          <div className="divider divider-center"></div>
        </FadeUp>
        <div className="about-values">
          {[
            { icon:'🎨', title:'Design Excellence', desc:'We obsess over every detail. From material selection to lighting design — nothing leaves our studio unless it\'s exceptional.' },
            { icon:'💎', title:'Honest Transparency', desc:'Zero hidden costs. Zero surprises. You get a complete itemised quote before any work begins — and that\'s the price you pay.' },
            { icon:'⚡', title:'On-Time Delivery', desc:'We know your time is valuable. Our 45-day delivery guarantee is not a target — it\'s a commitment backed by our track record.' },
            { icon:'🤝', title:'Lifetime Relationship', desc:'Our relationship doesn\'t end at handover. Our 10-year warranty and dedicated after-sales team are always there for you.' }
          ].map((v,i) => (
            <FadeUp key={i} delay={i*0.1} className="about-value-card">
              <div className="about-value-card__icon">{v.icon}</div>
              <h3 className="about-value-card__title">{v.title}</h3>
              <p className="about-value-card__desc">{v.desc}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-sm" style={{background:'var(--cream-mid)'}}>
      <div className="container text-center">
        <FadeUp>
          <h2 className="section-title">Ready to Start Your <span>Journey?</span></h2>
          <p className="section-subtitle" style={{margin:'12px auto 32px'}}>
            Book a free consultation today. No pressure, no commitment — just a conversation about your dream home.
          </p>
          <Link to="/contact" className="btn btn-gold btn-lg">Book Free Consultation</Link>
        </FadeUp>
      </div>
    </section>
  </>
);

export default AboutPage;
