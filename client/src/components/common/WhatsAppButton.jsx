import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsApp, WHATSAPP_NUMBERS, DEFAULT_MESSAGE } from "../../utils/whatsapp";
import "./styles/WhatsAppButton.css";

const WhatsAppButton = ({ 
  position = "fixed", // 'fixed' or 'inline'
  showText = true 
}) => {
  const handleClick = () => {
    openWhatsApp(WHATSAPP_NUMBERS.primary, DEFAULT_MESSAGE);
  };

  if (position === "fixed") {
    return (
      <div className="whatsapp-fixed">
        <button onClick={handleClick} className="whatsapp-float">
          <FaWhatsapp />
          {showText && <span>Chat with us</span>}
        </button>
      </div>
    );
  }

  return (
    <button onClick={handleClick} className="whatsapp-btn">
      <FaWhatsapp />
      {showText && <span>WhatsApp</span>}
    </button>
  );
};

export default WhatsAppButton;