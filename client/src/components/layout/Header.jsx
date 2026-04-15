import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  IoSearchOutline,
  IoCartOutline,
  IoMenu,
  IoClose
} from "react-icons/io5";
import logo from "../../assets/icons/NSWPL_Logo.png";
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

        {/* BRAND */}
        <div className="brand">
          <img src={logo} alt="Logo" className="brand-icon" />
          <Link to="/" className="brand-name" onClick={closeMenu}>
            <span className="brand-full">Netai Stationery Works</span>
            <span className="brand-short">NSWPL</span>
          </Link>
        </div>

        {/* NAV */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>

          <NavLink to="/" onClick={closeMenu}>Home</NavLink>

          {/* Pages */}
          <div className="nav-item dropdown">
            <span onClick={() => toggleDropdown("pages")}>Pages</span>

            <div className={`dropdown-menu ${openDropdown === "pages" ? "show" : ""}`}>
              <NavLink to="/about" onClick={closeMenu}>About</NavLink>
              <NavLink to="/team" onClick={closeMenu}>Team</NavLink>
              <NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink>
            </div>
          </div>

          {/* Shop */}
          <div className="nav-item dropdown">
            <span onClick={() => toggleDropdown("shop")}>Shop</span>

            <div className={`dropdown-menu ${openDropdown === "shop" ? "show" : ""}`}>
              <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
              <NavLink to="/categories" onClick={closeMenu}>Categories</NavLink>
            </div>
          </div>

          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>

        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          <button className="icon-btn"><IoSearchOutline /></button>

          <Link to="/cart" className="icon-btn">
            <IoCartOutline />
            <span className="cart-badge">2</span>
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;