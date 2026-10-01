import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowLeft, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import './ServiceDetailPage.css';

const SERVICES_DATA = {
  'modular-kitchen': {
    name: 'Modular Kitchen', icon: '🍳',
    tagline: 'The Heart of Your Home, Reimagined',
    heroImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&auto=format&fit=crop',
    desc: 'A modular kitchen is more than just storage — it\'s the space where your family gathers, meals are made, and memories are created. At Hillspace, we design kitchens that are as functional as they are beautiful, with premium materials and smart layouts tailored to your lifestyle.',
    startingAt: '₹1.2 Lakhs', timeline: '15–28 days',
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&auto=format',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=700&auto=format',
      'https://images.unsplash.com/photo-1556909196-11b17b7c9a5a?w=700&auto=format',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700&auto=format'
    ],
    features: ['Handleless & shaker door finishes', 'Quartz, granite & Corian countertops', 'Tandem boxes & pull-out cargo units', 'Soft-close hinges, channels & lifts', 'Under-cabinet LED strip lighting', 'Integrated appliance housing', '10-year structural warranty', 'Hettich & Häfele hardware'],
    process: [
      { step: '01', title: 'Site Visit & Measurement', desc: 'Our team visits your home, takes precise measurements, and understands your cooking habits.' },
      { step: '02', title: '3D Design Presentation', desc: 'We create a photorealistic 3D render with material and finish options for your approval.' },
      { step: '03', title: 'Material Selection', desc: 'You visit our studio to pick laminates, countertops, handles, and accessories.' },
      { step: '04', title: 'Fabrication & Installation', desc: 'Factory precision fabrication followed by expert installation at your site.' },
      { step: '05', title: 'Quality Check & Handover', desc: 'Final snag check, alignment, and handover with warranty documentation.' }
    ]
  },
  'living-room': {
    name: 'Living Room Design', icon: '🛋️',
    tagline: 'Where Your Family Comes Alive',
    heroImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop',
    desc: 'Your living room is the first thing guests see and the last place your family relaxes at night. We design living spaces that balance statement design elements with everyday comfort.',
    startingAt: '₹1.5 Lakhs', timeline: '20–35 days',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&auto=format',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&auto=format',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=700&auto=format',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&auto=format'
    ],
    features: ['Custom TV & entertainment units', 'False ceiling with cove & accent lighting', 'Feature accent wall (panel/wallpaper/plaster)', 'Sofa, coffee table & side tables', 'Window treatments & curtains', 'Smart lighting with dimmer controls', 'Custom shelving & display units', 'Rugs, artwork & decorative accessories'],
    process: [
      { step: '01', title: 'Design Consultation', desc: 'Discuss your style, preferences, and functional needs.' },
      { step: '02', title: '3D Design & Mood Board', desc: 'Visualise the complete room with furniture, finishes, and lighting.' },
      { step: '03', title: 'Material & Furniture Selection', desc: 'Choose from our curated collection of materials and furnishings.' },
      { step: '04', title: 'Civil & Carpentry Work', desc: 'False ceiling, electrical, wall work, and carpentry executed simultaneously.' },
      { step: '05', title: 'Styling & Handover', desc: 'Final dressing with accessories, rugs, and art for a complete look.' }
    ]
  },
  'bedroom': {
    name: 'Master Bedroom', icon: '🛏️',
    tagline: 'Your Personal Sanctuary',
    heroImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop',
    desc: 'Sleep better, wake up inspired. Your bedroom should be the most restful room in the house — a personal sanctuary that reflects who you are.',
    startingAt: '₹1.8 Lakhs', timeline: '18–30 days',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&auto=format',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&auto=format',
      'https://images.unsplash.com/photo-1560185127-6a6abd5f5dbf?w=700&auto=format',
      'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=700&auto=format'
    ],
    features: ['Custom upholstered headboard', 'Walk-in or built-in wardrobe', 'Layered ambient lighting', 'Accent wall with wallpaper or plaster', 'Under-bed storage', 'Study nook or dressing table area', 'Blackout curtains & window treatments', 'Smart lighting & bedside charging'],
    process: [
      { step: '01', title: 'Lifestyle Discovery', desc: 'We learn about your sleep preferences, routines, and dream bedroom.' },
      { step: '02', title: 'Space Planning', desc: 'Optimal furniture layout with traffic flow and storage planning.' },
      { step: '03', title: '3D Visualisation', desc: 'Full 3D render showing every element before a single nail is hammered.' },
      { step: '04', title: 'Execution', desc: 'Carpentry, civil, electrical, and furniture — all coordinated seamlessly.' },
      { step: '05', title: 'Handover', desc: 'A bedroom that feels like your forever home from day one.' }
    ]
  },
  'wardrobe': {
    name: 'Wardrobe Design', icon: '🚪',
    tagline: 'Every Item, A Perfect Home',
    heroImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop',
    desc: 'A well-designed wardrobe isn\'t just storage — it\'s the start of a stress-free morning. Our wardrobes are custom-built to maximise every centimetre of space.',
    startingAt: '₹80,000', timeline: '10–18 days',
    gallery: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format', 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=700&auto=format'],
    features: ['Sliding, hinged & walk-in options', 'Mirror, PU lacquer & laminate doors', 'Custom internal organisation layout', 'Soft-close mechanism throughout', 'LED strip lighting inside', 'Trouser rail, saree sections & accessories tray', 'Shoe rack with pull-out drawers', 'Anti-slam & anti-dust design'],
    process: [
      { step: '01', title: 'Measurement & Planning', desc: 'Precise wall measurement and internal layout planning.' },
      { step: '02', title: 'Design Selection', desc: 'Choose door style, finish, handles, and internal configuration.' },
      { step: '03', title: 'Factory Production', desc: 'CNC precision fabrication for consistent quality.' },
      { step: '04', title: 'Installation', desc: 'Expert installation and calibration of all mechanisms.' },
      { step: '05', title: 'Handover', desc: 'Full demo of all features and warranty handover.' }
    ]
  },
  'false-ceiling': {
    name: 'False Ceiling', icon: '✨',
    tagline: 'Look Up and Be Inspired',
    heroImg: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&auto=format&fit=crop',
    desc: 'False ceilings are the most transformative element in any room. Multi-level POP designs, hidden cove lighting, and decorative elements that change the entire feel of your space.',
    startingAt: '₹60,000', timeline: '7–14 days',
    gallery: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&auto=format', 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=700&auto=format'],
    features: ['Multi-level POP & gypsum designs', 'Cove lighting with LED strips', 'Recessed downlights & spotlights', 'Moisture-resistant board options', 'Fire-rated gypsum boards', 'Flush diffuser for AC grilles', 'Concealed wiring channels', 'Custom shapes and profiles'],
    process: [
      { step: '01', title: 'Site Assessment', desc: 'Room height, beam positions, and lighting point planning.' },
      { step: '02', title: 'Design Approval', desc: 'Layout of levels, lights, and fan positions presented.' },
      { step: '03', title: 'Frame & Board', desc: 'Metal framework and gypsum/POP board installation.' },
      { step: '04', title: 'Putty & Finish', desc: 'Smooth finish, primer, and paint to match the room.' },
      { step: '05', title: 'Lighting Installation', desc: 'LED cove strips, spots, and chandelier points connected.' }
    ]
  },
  'full-home': {
    name: 'Full Home Interior', icon: '🏠',
    tagline: 'From Bare Walls to Beautiful Living',
    heroImg: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&auto=format&fit=crop',
    desc: 'Our complete home interior package transforms every room in your home with a unified design vision, dedicated project manager, and end-to-end execution within 45 days.',
    startingAt: '₹8 Lakhs', timeline: '35–45 days',
    gallery: ['https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=700&auto=format', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&auto=format', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=700&auto=format'],
    features: ['Dedicated project manager', 'Modular kitchen (fully equipped)', 'All bedrooms with wardrobes', 'Living & dining design', 'False ceilings throughout', 'Bathroom vanities & fittings', 'All electrical & lighting', 'Turnkey handover within 45 days'],
    process: [
      { step: '01', title: 'Design Brief', desc: 'Comprehensive discussion covering all rooms, preferences, and budget.' },
      { step: '02', title: 'Full Home 3D Design', desc: 'Complete 3D visualisation of every room before work begins.' },
      { step: '03', title: 'BOQ & Sign-off', desc: 'Itemised bill of quantities with zero hidden charges.' },
      { step: '04', title: 'Parallel Execution', desc: 'Multiple teams working room by room for fastest delivery.' },
      { step: '05', title: '45-Day Handover', desc: 'Complete snag-free handover with 10-year warranty.' }
    ]
  },
  'bathroom': {
    name: 'Bathroom Design', icon: '🚿',
    tagline: 'Your Private Spa at Home',
    heroImg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&auto=format&fit=crop',
    desc: 'Transform your bathroom from purely functional to a spa-like experience. Premium tiles, custom vanities, elegant mirrors, and smart storage.',
    startingAt: '₹1.2 Lakhs', timeline: '10–20 days',
    gallery: ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&auto=format'],
    features: ['Premium wall & floor tiles', 'Custom vanity units', 'LED backlit mirrors', 'Shower enclosures & partitions', 'Anti-skid flooring', 'Waterproofing guarantee', 'Towel rails & accessories', 'Sensor faucets (optional)'],
    process: [
      { step: '01', title: 'Measurement & Planning', desc: 'Drain points, fixture positions, and tile layout planning.' },
      { step: '02', title: 'Design & Tile Selection', desc: 'Choose from 500+ tile options with 3D layout preview.' },
      { step: '03', title: 'Civil & Plumbing', desc: 'Waterproofing, tile work, and plumbing coordination.' },
      { step: '04', title: 'Fixtures & Fittings', desc: 'Vanity, mirror, faucets, and accessories installation.' },
      { step: '05', title: 'Handover', desc: 'Final checks and handover with waterproofing warranty.' }
    ]
  },
  'pooja-room': {
    name: 'Pooja Room', icon: '🪔',
    tagline: 'A Sacred Space, Crafted With Devotion',
    heroImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop',
    desc: 'A pooja room should be a place of peace, beauty, and devotion. We craft traditional and contemporary mandirs with fine wood, marble, and spiritual lighting that elevates your home.',
    startingAt: '₹60,000', timeline: '7–15 days',
    gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&auto=format'],
    features: ['Teak wood & marble options', 'Backlit panel with LED deepam', 'Custom storage for puja items', 'Traditional carved door panels', 'Acoustic insulation (optional)', 'Jali work & ornamental details', 'Waterproof base for ritual use', 'Custom mandir sizes'],
    process: [
      { step: '01', title: 'Space Planning', desc: 'Identify the ideal location with vastu consultation (optional).' },
      { step: '02', title: 'Design & Material Selection', desc: 'Wood species, marble grade, and finish selection.' },
      { step: '03', title: 'Fabrication', desc: 'Precision carving and fabrication at our workshop.' },
      { step: '04', title: 'Installation', desc: 'Expert installation with lighting and storage.' },
      { step: '05', title: 'Handover', desc: 'Blessing ceremony ready handover with care guide.' }
    ]
  }
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = SERVICES_DATA[slug];

  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      <Helmet>
        <title>{service.name} — Hillspace Interior Design Studio</title>
        <meta name="description" content={service.desc} />
      </Helmet>

      {/* Hero */}
      <div className="sd-hero">
        <img src={service.heroImg} alt={service.name} />
        <div className="sd-hero__overlay">
          <div className="container">
            <Link to="/services" className="sd-back-btn">
              <FiArrowLeft size={16} /> Back to Services
            </Link>
            <span className="sd-hero__icon">{service.icon}</span>
            <h1 className="sd-hero__title">{service.name}</h1>
            <p className="sd-hero__tagline">{service.tagline}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="sd-layout">
            {/* Main */}
            <div className="sd-main">
              <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
                <p className="sd-desc">{service.desc}</p>

                {/* Gallery */}
                {service.gallery.length > 0 && (
                  <div className="sd-gallery">
                    {service.gallery.map((img, i) => (
                      <div key={i} className={`sd-gallery__item ${i === 0 ? 'sd-gallery__item--large' : ''}`}>
                        <img src={img} alt={`${service.name} ${i + 1}`} loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Process */}
                <h2 className="sd-section-title">Our Process</h2>
                <div className="sd-process">
                  {service.process.map((p, i) => (
                    <div key={i} className="sd-process__step">
                      <div className="sd-process__num">{p.step}</div>
                      <div>
                        <h4 className="sd-process__title">{p.title}</h4>
                        <p className="sd-process__desc">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="sd-sidebar">
              <div className="sd-sidebar__card">
                <h3 className="sd-sidebar__title">Quick Info</h3>
                <div className="sd-sidebar__meta">
                  <div className="sd-sidebar__meta-row">
                    <span>Starting at</span>
                    <strong>{service.startingAt}</strong>
                  </div>
                  <div className="sd-sidebar__meta-row">
                    <span>Timeline</span>
                    <strong>{service.timeline}</strong>
                  </div>
                  <div className="sd-sidebar__meta-row">
                    <span>Warranty</span>
                    <strong>10 Years</strong>
                  </div>
                </div>
                <h4 className="sd-sidebar__feat-title">What's Included</h4>
                <ul className="sd-sidebar__features">
                  {service.features.map((f, i) => (
                    <li key={i}><FiCheck size={14} color="var(--gold-dark)" /> {f}</li>
                  ))}
                </ul>
                <div className="sd-sidebar__actions">
                  <Link to="/contact" className="btn btn-gold" style={{width:'100%',justifyContent:'center'}}>
                    Book Free Consultation
                  </Link>
                  <a
                    href="https://wa.me/917888709747"
                    target="_blank" rel="noreferrer"
                    className="btn btn-outline"
                    style={{width:'100%',justifyContent:'center',gap:'8px',display:'flex',alignItems:'center'}}
                  >
                    <FaWhatsapp size={18} color="#25D366" /> Chat on WhatsApp
                  </a>
                  <a href="tel:+917888709747" className="btn btn-outline" style={{width:'100%',justifyContent:'center',gap:'8px',display:'flex',alignItems:'center'}}>
                    <FiPhone size={16} /> +91 7888709747
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;
