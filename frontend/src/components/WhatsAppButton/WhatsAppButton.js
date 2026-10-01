import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);

  const whatsappUrl = "https://wa.me/917888709747?text=Hi%20Hillspace!%20I%27m%20interested%20in%20your%20interior%20design%20services.%20Can%20you%20help%20me%3F";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={`whatsapp-btn__tooltip ${hovered ? 'visible' : ''}`}>
        Chat with us!
      </span>
      <span className="whatsapp-btn__pulse"></span>
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
