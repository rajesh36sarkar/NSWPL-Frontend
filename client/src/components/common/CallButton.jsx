import React from "react";
import { FaPhone, FaPhoneAlt } from "react-icons/fa";
import { makeCall, PHONE_NUMBERS } from "../../utils/call";
import "./styles/CallButton.css";

const CallButton = ({ 
  phoneNumber = PHONE_NUMBERS.primary,
  variant = "default",
  showText = true,
  text = "Call Now",
  icon = <FaPhone />,
  className = ""
}) => {
  const handleClick = () => {
    makeCall(phoneNumber);
  };

  if (variant === "floating") {
    return (
      <div className="call-floating">
        <button onClick={handleClick} className="call-float-btn">
          <FaPhoneAlt />
          {showText && <span>Call Us</span>}
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleClick} 
      className={`call-btn call-btn-${variant} ${className}`}
    >
      {icon}
      {showText && <span>{text}</span>}
    </button>
  );
};

export default CallButton;