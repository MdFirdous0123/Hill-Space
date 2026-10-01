import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';

const CITIES = ['Mumbai','Pune','Thane','Nashik','Aurangabad','Nagpur','Navi Mumbai','Other'];

const SignupPage = () => {
  const [form, setForm]         = useState({ name:'', email:'', phone:'', city:'', password:'', confirm:'' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { register }            = useAuth();
  const navigate                = useNavigate();

  const upd = (k, v) => setForm(p => ({...p, [k]: v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) { toast.error('Please fill all required fields'); return; }
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const data = await register({ name: form.name, email: form.email, phone: form.phone, city: form.city, password: form.password });
      if (data.success) { toast.success('🎉 Account created! Welcome to Hillspace.'); navigate('/'); }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Helmet><title>Sign Up — Hillspace</title></Helmet>
      <div className="auth-page">
        <div className="auth-page__left">
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&auto=format&fit=crop" alt="Beautiful interior" />
          <div className="auth-page__left-overlay">
            <div className="auth-page__brand">
              <div className="auth-page__brand-icon">H</div>
              <div>
                <div className="auth-page__brand-name">HILLSPACE</div>
                <div className="auth-page__brand-tag">Interior Design Studio</div>
              </div>
            </div>
            <div>
              <p style={{color:'rgba(255,255,255,0.85)', fontSize:'16px', marginBottom:'20px'}}>Join 200+ families who chose Hillspace</p>
              {['Free design consultation', '10-Year warranty on all work', 'Transparent, fixed pricing', '45-day delivery guarantee'].map((b,i) => (
                <div key={i} style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'12px'}}>
                  <span style={{color:'var(--gold)',fontSize:'18px'}}>✓</span>
                  <span style={{color:'rgba(255,255,255,0.9)',fontSize:'15px'}}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="auth-page__right">
          <motion.div className="auth-card" initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}>
            <h1 className="auth-card__title">Create Account</h1>
            <p className="auth-card__sub">Join Hillspace — it's completely free</p>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" type="text" placeholder="Your full name"
                  value={form.name} onChange={e => upd('name', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input className="form-input" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => upd('email', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input className="form-input" type="tel" placeholder="+91 xxxxxxxxxx"
                  value={form.phone} onChange={e => upd('phone', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <select className="form-select" value={form.city} onChange={e => upd('city', e.target.value)}>
                  <option value="">Select your city</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Password *</label>
                <div className="auth-form__pass-wrap">
                  <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={form.password} onChange={e => upd('password', e.target.value)} required />
                  <button type="button" className="auth-form__eye" onClick={() => setShowPass(v => !v)}>
                    {showPass ? <FiEyeOff size={18}/> : <FiEye size={18}/>}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input className="form-input" type="password" placeholder="Repeat your password"
                  value={form.confirm} onChange={e => upd('confirm', e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-gold auth-form__submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create My Account →'}
              </button>
            </form>
            <p className="auth-card__switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
