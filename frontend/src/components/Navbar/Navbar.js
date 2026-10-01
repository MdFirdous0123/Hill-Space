import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',         to: '/' },
  { label: 'Services',     to: '/services' },
  { label: 'Portfolio',    to: '/portfolio' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'About',        to: '/about' },
  { label: 'Contact',      to: '/contact' }
];

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { user, logout }              = useAuth();
  const navigate                      = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container-wide">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">H</span>
          <span className="navbar__logo-text">
            HILLSPACE
            <small>Interior Design Studio</small>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar__actions">
          <a
            href="https://wa.me/917888709747?text=Hi%20Hillspace!%20I%27d%20like%20to%20inquire%20about%20interior%20design%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__whatsapp"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>

          {user ? (
            <div className="navbar__user">
              <span className="navbar__user-name">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="navbar__logout">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="navbar__login-btn">Login</Link>
          )}

          <Link to="/contact" className="btn btn-gold btn-sm navbar__cta">
            Free Consultation
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-inner">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar__mobile-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="navbar__mobile-actions">
            <a href="tel:+917888709747" className="navbar__mobile-phone">
              <FiPhone size={16} /> +91 7888709747
            </a>
            {user ? (
              <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
            ) : (
              <>
                <Link to="/login"  className="btn btn-outline btn-sm" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/signup" className="btn btn-gold btn-sm"    onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
