import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { contactAPI } from '../../utils/api';
import './ContactPage.css';

const FadeUp = ({ children, delay=0, className='' }) => {
  const [ref, inView] = useInView({ threshold:0.1, triggerOnce:true });
  return (
    <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.6,delay}} className={className}>{children}</motion.div>
  );
};

const ContactPage = () => {
  const [form, setForm]     = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Name, email and message are required'); return; }
    setLoading(true);
    try {
      await contactAPI.submit(form);
      toast.success("✅ Message sent! We'll get back to you within 24 hours.");
      setForm({ name:'', email:'', phone:'', subject:'', message:'' });
    } catch { toast.error('Failed to send. Please call us directly!'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — Hillspace Interior Design Studio</title>
        <meta name="description" content="Get in touch with Hillspace. Book a free design consultation, call us at +91 7888709747, or visit our studio in Maharashtra." />
      </Helmet>

      <div className="page-hero">
        <div className="container">
          <FadeUp>
            <span className="badge badge-gold">Let's Talk</span>
            <h1 className="section-title" style={{marginTop:'12px', fontSize:'48px'}}>Contact <span>Us</span></h1>
            <div className="divider"></div>
            <p className="section-subtitle">We're here Mon–Sat, 9am–7pm. Reach us any way you like.</p>
          </FadeUp>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">

            {/* Left — Info */}
            <FadeUp className="contact-info">
              <h2 className="contact-info__title">Get In Touch</h2>
              <p className="contact-info__desc">Whether you have a question, want to book a consultation, or just want to see our portfolio — we'd love to hear from you.</p>

              <div className="contact-info__items">
                <div className="contact-info__item">
                  <div className="contact-info__icon"><FaMapMarkerAlt /></div>
                  <div>
                    <h4>Our Studio</h4>
                    <p>Hillspace Interior Design Studio<br/>Maharashtra, India</p>
                    <a href="https://share.google/0QgmHiwaXNN4xVwcb" target="_blank" rel="noreferrer">View on Google Maps →</a>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__icon"><FaPhone /></div>
                  <div>
                    <h4>Call Us</h4>
                    <a href="tel:+917888709747" className="contact-info__phone">+91 7888709747</a>
                    <p>Mon–Sat, 9am to 7pm</p>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__icon" style={{background:'#25D366',color:'#fff'}}><FaWhatsapp /></div>
                  <div>
                    <h4>WhatsApp</h4>
                    <a href="https://wa.me/917888709747?text=Hi%20Hillspace!%20I%27d%20like%20to%20inquire%20about%20interior%20design." target="_blank" rel="noreferrer" className="contact-info__wa">
                      Chat with us on WhatsApp →
                    </a>
                    <p>Fastest response</p>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__icon"><FaEnvelope /></div>
                  <div>
                    <h4>Email Us</h4>
                    <a href="mailto:hello@hillspace.in">hello@hillspace.in</a>
                    <p>We reply within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="contact-map">
                <iframe
                  title="Hillspace Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3459748432934!2d72.97813!3d19.21830!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEzJzA1LjkiTiA3MsKwNTgnNDEuMyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%" height="250" style={{border:0}} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeUp>

            {/* Right — Form */}
            <FadeUp delay={0.15} className="contact-form-card">
              <h2 className="contact-form-card__title">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" type="text" placeholder="Your name"
                    value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} required />
                </div>
                <div className="contact-form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" placeholder="your@email.com"
                      value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" type="tel" placeholder="+91 xxxxxxxxxx"
                      value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-select" value={form.subject} onChange={e => setForm(p=>({...p,subject:e.target.value}))}>
                    <option value="">Select a subject</option>
                    <option>Book a Consultation</option>
                    <option>Get a Quote</option>
                    <option>Project Enquiry</option>
                    <option>Warranty / After-Sales</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-textarea" rows="5" placeholder="Tell us about your project, requirements, budget..."
                    value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} required />
                </div>
                <button type="submit" className="btn btn-gold contact-submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
