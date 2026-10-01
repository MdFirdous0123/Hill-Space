import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { estimateAPI } from '../../utils/api';
import './PriceEstimatorPage.css';

const SERVICES = [
  { id: 'modular-kitchen', label: 'Modular Kitchen', icon: '🍳', note: 'Cabinets, countertop, hardware & fittings' },
  { id: 'wardrobe',        label: 'Wardrobe Design', icon: '🚪', note: 'Floor-to-ceiling wardrobe with internals' },
  { id: 'full-home',       label: 'Full Home Interior', icon: '🏠', note: 'All rooms — kitchen, bedrooms, living, dining' },
  { id: 'living-room',     label: 'Living Room', icon: '🛋️', note: 'TV unit, false ceiling, feature wall & furniture' },
  { id: 'bedroom',         label: 'Bedroom', icon: '🛏️', note: 'Wardrobe, bed, ceiling & accent wall' }
];

const TIERS = [
  { id: 'essential', label: 'Essential', icon: '✦', desc: 'Quality finishes, smart choices. Best value for budget-conscious homes.', color: '#6A9E7F' },
  { id: 'premium',   label: 'Premium',   icon: '✦✦', desc: 'Premium materials & hardware. Most popular. A balance of luxury and value.', color: 'var(--gold-dark)', highlight: true },
  { id: 'luxury',    label: 'Luxury',    icon: '✦✦✦', desc: 'Top-of-the-line everything. European hardware, exotic finishes, smart home ready.', color: '#8B6914' }
];

const formatINR = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000)   return `₹${(amount / 100000).toFixed(1)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

const PriceEstimatorPage = () => {
  const [step, setStep]         = useState(1);
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [form, setForm]         = useState({
    serviceType: '', area: '', budgetTier: '', city: '', phone: '', email: ''
  });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const calcLocal = () => {
    const rates = {
      'modular-kitchen': { essential: 1200, premium: 1900, luxury: 2800 },
      'wardrobe':        { essential: 800,  premium: 1400, luxury: 2200 },
      'full-home':       { essential: 1500, premium: 2400, luxury: 3800 },
      'living-room':     { essential: 1000, premium: 1800, luxury: 3000 },
      'bedroom':         { essential: 900,  premium: 1600, luxury: 2600 }
    };
    const rate = rates[form.serviceType]?.[form.budgetTier] || 1500;
    const base = rate * Number(form.area);
    return { min: Math.round(base * 0.85), max: Math.round(base * 1.15) };
  };

  const handleSubmit = async () => {
    if (!form.phone) { toast.error('Please enter your phone number'); return; }
    setLoading(true);
    try {
      const { data } = await estimateAPI.calculate(form);
      setResult(data.data);
    } catch {
      const local = calcLocal();
      setResult({ estimatedMin: local.min, estimatedMax: local.max, formattedMin: formatINR(local.min), formattedMax: formatINR(local.max), note: 'Approximate estimate. Book a free consultation for an accurate quote.' });
    }
    setLoading(false);
    setStep(4);
  };

  return (
    <>
      <Helmet>
        <title>Price Estimator — Hillspace Interior Design Studio</title>
        <meta name="description" content="Get an instant price estimate for your modular kitchen, wardrobe, or full home interior with Hillspace's interactive cost calculator." />
      </Helmet>

      <div className="page-hero estimator-hero">
        <div className="container text-center">
          <span className="badge badge-gold">Free Tool</span>
          <h1 className="section-title" style={{marginTop:'12px', fontSize:'48px'}}>
            Interior <span>Price Estimator</span>
          </h1>
          <div className="divider divider-center"></div>
          <p className="section-subtitle">
            Get a ballpark estimate in 60 seconds. No commitment. Just clarity.
          </p>
        </div>
      </div>

      <section className="section estimator-section">
        <div className="container">
          <div className="estimator-wrapper">

            {/* Progress Bar */}
            {step < 4 && (
              <div className="estimator-progress">
                {[1,2,3].map(s => (
                  <div key={s} className={`estimator-progress__step ${step >= s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
                    <div className="estimator-progress__dot">{step > s ? '✓' : s}</div>
                    <span>{s === 1 ? 'Service' : s === 2 ? 'Details' : 'Contact'}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Step 1 — Service Type */}
            {step === 1 && (
              <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} className="estimator-step">
                <h2 className="estimator-step__title">What would you like to design?</h2>
                <div className="estimator-service-grid">
                  {SERVICES.map(s => (
                    <button
                      key={s.id}
                      className={`estimator-service-btn ${form.serviceType === s.id ? 'active' : ''}`}
                      onClick={() => { update('serviceType', s.id); setStep(2); }}
                    >
                      <span className="estimator-service-btn__icon">{s.icon}</span>
                      <span className="estimator-service-btn__label">{s.label}</span>
                      <span className="estimator-service-btn__note">{s.note}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 — Area & Budget */}
            {step === 2 && (
              <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} className="estimator-step">
                <h2 className="estimator-step__title">Tell us about your space</h2>
                <div className="form-group">
                  <label className="form-label">Approximate Area (in sqft) *</label>
                  <input
                    className="form-input estimator-area-input"
                    type="number" min="50" max="10000"
                    placeholder="e.g. 150"
                    value={form.area}
                    onChange={e => update('area', e.target.value)}
                  />
                  <p className="estimator-area-hint">Not sure? A 10×15 ft room = 150 sqft</p>
                </div>
                <div className="form-group" style={{marginTop:'32px'}}>
                  <label className="form-label">Select Your Budget Preference</label>
                  <div className="estimator-tiers">
                    {TIERS.map(tier => (
                      <button
                        key={tier.id}
                        className={`estimator-tier-btn ${form.budgetTier === tier.id ? 'active' : ''} ${tier.highlight ? 'highlight' : ''}`}
                        onClick={() => update('budgetTier', tier.id)}
                      >
                        <span className="estimator-tier-icon" style={{color: tier.color}}>{tier.icon}</span>
                        <strong>{tier.label}</strong>
                        <p>{tier.desc}</p>
                        {tier.highlight && <span className="estimator-tier-popular">Most Popular</span>}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="estimator-nav">
                  <button className="btn btn-outline" onClick={() => setStep(1)}><FiArrowLeft /> Back</button>
                  <button className="btn btn-gold" onClick={() => { if (!form.area || !form.budgetTier) { toast.error('Please fill area and budget preference'); return; } setStep(3); }}>
                    Next <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Contact */}
            {step === 3 && (
              <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} className="estimator-step">
                <h2 className="estimator-step__title">Where should we send your estimate?</h2>
                <p style={{color:'var(--charcoal-lt)', marginBottom:'28px', fontSize:'15px'}}>
                  We'll calculate your estimate instantly and follow up with a detailed quote.
                </p>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input className="form-input" type="tel" placeholder="+91 xxxxxxxxxx"
                    value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address (Optional)</label>
                  <input className="form-input" type="email" placeholder="your@email.com"
                    value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <select className="form-select" value={form.city} onChange={e => update('city', e.target.value)}>
                    <option value="">Select City</option>
                    {['Mumbai','Pune','Thane','Nashik','Aurangabad','Nagpur','Navi Mumbai','Other'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="estimator-nav">
                  <button className="btn btn-outline" onClick={() => setStep(2)}><FiArrowLeft /> Back</button>
                  <button className="btn btn-gold" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Calculating...' : 'Get My Estimate →'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4 — Result */}
            {step === 4 && result && (
              <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="estimator-result">
                <div className="estimator-result__header">
                  <div className="estimator-result__emoji">🎉</div>
                  <h2>Your Estimate is Ready!</h2>
                </div>
                <div className="estimator-result__range">
                  <span className="estimator-result__label">Estimated Cost</span>
                  <div className="estimator-result__price">
                    <span>{result.formattedMin}</span>
                    <span className="estimator-result__dash">—</span>
                    <span>{result.formattedMax}</span>
                  </div>
                </div>
                <p className="estimator-result__note">⚠️ {result.note}</p>
                <div className="estimator-result__actions">
                  <a href="https://wa.me/917888709747?text=Hi!%20I%20got%20an%20estimate%20from%20your%20website.%20Can%20we%20discuss%20my%20project%3F" target="_blank" rel="noreferrer" className="btn btn-gold btn-lg">
                    WhatsApp for Exact Quote
                  </a>
                  <a href="tel:+917888709747" className="btn btn-outline btn-lg">
                    Call +91 7888709747
                  </a>
                  <button className="btn btn-outline" onClick={() => { setStep(1); setResult(null); setForm({serviceType:'',area:'',budgetTier:'',city:'',phone:'',email:''}); }}>
                    Calculate Another
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>
    </>
  );
};

export default PriceEstimatorPage;
