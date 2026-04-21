import React, { useEffect, useState } from "react";
import "./styles/Loader.css";

const Loader = ({
  fullScreen = false,
  text = "Loading",
  type = "morphing", // morphing, ripple, skeleton, wave, pulse, dots, gradient, branded
  size = "medium", // small, medium, large, xlarge
  colorScheme = "primary", // primary, success, warning, danger, neutral
  showProgress = false,
  progress = 0,
  blur = true,
  minHeight = "200px",
  className = "",
  onAnimationComplete,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [dotCount, setDotCount] = useState(0);

  // Animated dots effect
  useEffect(() => {
    if (type === "morphing" || type === "wave") {
      const interval = setInterval(() => {
        setDotCount((prev) => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [type]);

  // Update display text with animated dots
  useEffect(() => {
    if (type === "morphing" || type === "wave") {
      const dots = ".".repeat(dotCount);
      setDisplayText(`${text}${dots}`);
    } else {
      setDisplayText(text);
    }
  }, [text, dotCount, type]);

  const renderLoader = () => {
    const loaderProps = {
      size,
      colorScheme,
      progress,
      showProgress,
    };

    switch (type) {
      case "morphing":
        return <MorphingLoader {...loaderProps} />;

      case "ripple":
        return <RippleLoader {...loaderProps} />;

      case "skeleton":
        return <SkeletonLoader {...loaderProps} />;

      case "wave":
        return <WaveLoader {...loaderProps} />;

      case "pulse":
        return <PulseLoader {...loaderProps} />;

      case "dots":
        return <DotsLoader {...loaderProps} />;

      case "gradient":
        return <GradientLoader {...loaderProps} />;

      case "branded":
        return <BrandedLoader {...loaderProps} />;

      default:
        return <MorphingLoader {...loaderProps} />;
    }
  };

  const loaderContent = (
    <div
      className={`loader-content-wrapper loader-${colorScheme} ${
        fullScreen ? "loader-fullscreen" : "loader-inline"
      } ${blur && fullScreen ? "loader-blur" : ""} ${className}`}
      style={!fullScreen ? { minHeight } : {}}
    >
      <div className="loader-container">
        <div className="loader-animation-wrapper">{renderLoader()}</div>

        {text && (
          <div className="loader-text-wrapper">
            <span className="loader-text">{displayText}</span>
            {showProgress && (
              <span className="loader-progress-text">{Math.round(progress)}%</span>
            )}
          </div>
        )}

        {showProgress && (
          <div className="loader-progress-bar-container">
            <div
              className="loader-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );

  return loaderContent;
};

// ============================================
// MORPHING LOADER (Smooth Shape Morphing)
// ============================================
const MorphingLoader = ({ size, colorScheme }) => {
  return (
    <div className={`morphing-loader morphing-${size}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`morphGradient-${colorScheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={`gradient-start-${colorScheme}`} />
            <stop offset="100%" className={`gradient-end-${colorScheme}`} />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="40"
          fill={`url(#morphGradient-${colorScheme})`}
          className="morphing-circle"
        />
        <path
          d="M50 10 L90 50 L50 90 L10 50 Z"
          fill={`url(#morphGradient-${colorScheme})`}
          className="morphing-diamond"
          opacity="0"
        />
        <rect
          x="15"
          y="15"
          width="70"
          height="70"
          rx="10"
          fill={`url(#morphGradient-${colorScheme})`}
          className="morphing-square"
          opacity="0"
        />
      </svg>
    </div>
  );
};

// ============================================
// RIPPLE LOADER (Material Design Ripple)
// ============================================
const RippleLoader = ({ size, colorScheme }) => {
  return (
    <div className={`ripple-loader ripple-${size}`}>
      <div className={`ripple-container ripple-${colorScheme}`}>
        <div className="ripple-circle ripple-1"></div>
        <div className="ripple-circle ripple-2"></div>
        <div className="ripple-circle ripple-3"></div>
        <div className="ripple-circle ripple-4"></div>
      </div>
    </div>
  );
};

// ============================================
// SKELETON LOADER (Content Placeholder)
// ============================================
const SkeletonLoader = ({ size }) => {
  return (
    <div className={`skeleton-loader skeleton-${size}`}>
      <div className="skeleton-avatar shimmer"></div>
      <div className="skeleton-content">
        <div className="skeleton-line shimmer"></div>
        <div className="skeleton-line skeleton-line-short shimmer"></div>
        <div className="skeleton-line skeleton-line-medium shimmer"></div>
      </div>
    </div>
  );
};

// ============================================
// WAVE LOADER (Audio Wave Style)
// ============================================
const WaveLoader = ({ size, colorScheme }) => {
  return (
    <div className={`wave-loader wave-${size}`}>
      <div className={`wave-container wave-${colorScheme}`}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`wave-bar wave-bar-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// PULSE LOADER (Heartbeat Style)
// ============================================
const PulseLoader = ({ size, colorScheme }) => {
  return (
    <div className={`pulse-loader pulse-${size}`}>
      <div className={`pulse-ring pulse-${colorScheme}`}>
        <div className="pulse-core"></div>
        <div className="pulse-outer pulse-outer-1"></div>
        <div className="pulse-outer pulse-outer-2"></div>
        <div className="pulse-outer pulse-outer-3"></div>
      </div>
    </div>
  );
};

// ============================================
// DOTS LOADER (Bouncing Dots)
// ============================================
const DotsLoader = ({ size, colorScheme }) => {
  return (
    <div className={`dots-loader dots-${size}`}>
      <div className={`dots-container dots-${colorScheme}`}>
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>
    </div>
  );
};

// ============================================
// GRADIENT LOADER (Rotating Gradient)
// ============================================
const GradientLoader = ({ size, colorScheme, progress, showProgress }) => {
  return (
    <div className={`gradient-loader gradient-${size}`}>
      <svg className="gradient-svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id={`gradient-${colorScheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={`gradient-start-${colorScheme}`} />
            <stop offset="50%" className={`gradient-mid-${colorScheme}`} />
            <stop offset="100%" className={`gradient-end-${colorScheme}`} />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={`url(#gradient-${colorScheme})`}
          strokeWidth="6"
          strokeLinecap="round"
          className="gradient-circle"
          strokeDasharray={showProgress ? "264 264" : "200 264"}
          strokeDashoffset={showProgress ? 264 * (1 - progress / 100) : 0}
        />
      </svg>
    </div>
  );
};

// ============================================
// BRANDED LOADER (Company Branded)
// ============================================
const BrandedLoader = ({ size, colorScheme }) => {
  return (
    <div className={`branded-loader branded-${size}`}>
      <div className={`branded-logo branded-${colorScheme}`}>
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30 5L5 20V40L30 55L55 40V20L30 5Z"
            className="branded-hexagon"
            strokeWidth="2"
          />
          <text x="30" y="38" textAnchor="middle" className="branded-text">
            N
          </text>
        </svg>
      </div>
      <div className="branded-ring"></div>
    </div>
  );
};

export default Loader;