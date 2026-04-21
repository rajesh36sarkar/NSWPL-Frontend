import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import logoWithNSWPL from "../../assets/icons/logoWithNSWPL.png";
import "../../styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* BRAND LOGO */}
        <div className="brand">
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <img src={logoWithNSWPL} alt="NSWPL Logo" />
          </Link>
        </div>

        {/* NAVIGATION - 5 Links */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
          <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          {/* Social Icons */}
          <div className="header-social">
            <a
              href="https://www.facebook.com/share/1HxoyMiKf8/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/netaistationery?igsh=em0xajE5a2FkbmF2"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/919830770400?text=Hi%2C%20I%20would%20like%20to%20talk%20with%20you" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link whatsapp"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* Modern Animated Hamburger Menu */}
          <button
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;