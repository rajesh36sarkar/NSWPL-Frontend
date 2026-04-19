import React from "react";
import "../../styles/Loader.css";

const Loader = ({ 
  fullScreen = false, 
  text = "Loading...", 
  type = "spinner", // spinner, pulse, dots, gradient
  size = "medium" // small, medium, large
}) => {
  
  const renderLoader = () => {
    switch (type) {
      case "pulse":
        return (
          <div className={`loader-pulse loader-${size}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        );
      
      case "dots":
        return (
          <div className={`loader-dots loader-${size}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        );
      
      case "gradient":
        return (
          <div className={`loader-gradient loader-${size}`}>
            <div className="gradient-spinner"></div>
          </div>
        );
      
      case "spinner":
      default:
        return (
          <div className={`loader-spinner-container loader-${size}`}>
            <div className="loader-spinner"></div>
          </div>
        );
    }
  };

  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className="loader-content">
          {renderLoader()}
          {text && <p className="loader-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loader-inline">
      <div className="loader-content">
        {renderLoader()}
        {text && <p className="loader-text">{text}</p>}
      </div>
    </div>
  );
};

export default Loader;