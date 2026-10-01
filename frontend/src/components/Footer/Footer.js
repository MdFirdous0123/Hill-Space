import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">

            {/* Brand Column */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-icon">H</span>
                <span className="footer__logo-name">
                  HILLSPACE
                  <small>Interior Design Studio</small>
                </span>
              </div>
              <p className="footer__tagline">
                Where Vision Meets Craftsmanship
              </p>
              <p className="footer__desc">
                Transforming houses into dream homes across Bihar with premium interior design, honest pricing, and a 10-year warranty you can count on.
              </p>
              <div className="footer__socials">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
                <a
                  href="https://wa.me/917888709747"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="footer__social-wa"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__col">
              <h4 className="footer__col-title">Quick Links</h4>
              <ul className="footer__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/price-estimator">Price Estimator</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer__col">
              <h4 className="footer__col-title">Our Services</h4>
              <ul className="footer__links">
                <li><Link to="/services/modular-kitchen">Modular Kitchen</Link></li>
                <li><Link to="/services/living-room">Living Room Design</Link></li>
                <li><Link to="/services/bedroom">Master Bedroom</Link></li>
                <li><Link to="/services/wardrobe">Wardrobe Design</Link></li>
                <li><Link to="/services/false-ceiling">False Ceiling</Link></li>
                <li><Link to="/services/full-home">Full Home Interior</Link></li>
                <li><Link to="/services/bathroom">Bathroom Design</Link></li>
                <li><Link to="/services/pooja-room">Pooja Room</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4 className="footer__col-title">Contact Us</h4>
              <div className="footer__contact-list">
                <div className="footer__contact-item">
                  <FaMapMarkerAlt className="footer__contact-icon" />
                  <div>
                    <p>Pakki Sarai Rd, near Punjab National Bank,</p>
                    <p>Chandwara, Muzaffarpur, Bihar 842001</p>
                    <a
                      href="https://maps.app.goo.gl/dYd6PZdzihjSDX3r7"
                      target="_blank"
                      rel="noreferrer"
                      className="footer__map-link"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
                <div className="footer__contact-item">
                  <FaPhone className="footer__contact-icon" />
                  <div>
                    <a href="tel:+917888709747">+91 7888709747</a>
                    <p className="footer__contact-sub">Mon–Sat, 9am – 7pm</p>
                  </div>
                </div>
                <div className="footer__contact-item">
                  <FaEnvelope className="footer__contact-icon" />
                  <a href="mailto:hello@hillspace.in">hello@hillspace.in</a>
                </div>
                <a
                  href="https://wa.me/917888709747?text=Hi%20Hillspace!%20I%27m%20interested%20in%20your%20interior%20design%20services."
                  target="_blank"
                  rel="noreferrer"
                  className="footer__wa-btn"
                >
                  <FaWhatsapp size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="footer__trust">
        <div className="container">
          <div className="footer__trust-grid">
            <div className="footer__trust-item">🏆 10-Year Warranty</div>
            <div className="footer__trust-item">⚡ 45-Day Delivery</div>
            <div className="footer__trust-item">🎨 Personalized Design</div>
            <div className="footer__trust-item">💎 No Hidden Costs</div>
            <div className="footer__trust-item">⭐ 4.8/5 Rating</div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="container">
          <p>© {year} Hillspace Interior Design Studio. All rights reserved.</p>
          <p>Crafted with ♥ for beautiful homes across Bihar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
