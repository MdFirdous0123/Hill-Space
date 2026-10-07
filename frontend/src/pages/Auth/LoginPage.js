import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { login }               = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      if (data.success) { toast.success(data.message); navigate('/'); }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Helmet><title>Login — Hillspace</title></Helmet>
      <div className="auth-page">
        <div className="auth-page__left" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="auth-page__left-overlay">
            <div className="auth-page__brand">
              <div className="auth-page__brand-icon">H</div>
              <div>
                <div className="auth-page__brand-name">HILLSPACE</div>
                <div className="auth-page__brand-tag">Interior Design Studio</div>
              </div>
            </div>
            <blockquote className="auth-page__quote">
              "Where Vision Meets Craftsmanship"
            </blockquote>
          </div>
        </div>

        <div className="auth-page__right">
          <motion.div className="auth-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="auth-card__title">Welcome back</h1>
            <p className="auth-card__sub">Sign in to your Hillspace account</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="auth-form__pass-wrap">
                  <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Your password"
                    value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} required />
                  <button type="button" className="auth-form__eye" onClick={() => setShowPass(v => !v)}>
                    {showPass ? <FiEyeOff size={18}/> : <FiEye size={18}/>}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-gold auth-form__submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-card__switch">
              Don't have an account? <Link to="/signup">Create one free</Link>
            </p>
            <div className="auth-card__divider">
              <span>or</span>
            </div>
            <a href="https://wa.me/917888709747" target="_blank" rel="noreferrer" className="btn btn-outline auth-wa-btn">
              Continue via WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
