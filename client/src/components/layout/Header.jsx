import { Link, NavLink } from "react-router-dom";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import "../../styles/header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">

        {/* BRAND */}
        <div className="brand">
          <span className="brand-icon">✎</span>
          <Link to="/" className="brand-name">Nandita</Link>
        </div>

        {/* NAV */}
        <nav className="nav">
          <NavLink to="/">Home</NavLink>

          <div className="nav-item dropdown">
            <span>Pages</span>
            <div className="dropdown-menu">
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/team">Team</NavLink>
              <NavLink to="/faq">FAQ</NavLink>
              <NavLink to="/wishlist">Wishlist</NavLink>
            </div>
          </div>

          <div className="nav-item dropdown">
            <span>Shop</span>
            <div className="dropdown-menu">
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/categories">Categories</NavLink>
            </div>
          </div>

          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          <IoSearchOutline />
          <IoCartOutline />
        </div>

      </div>
    </header>
  );
};

export default Header;
