import { Link } from "react-router-dom";
import "../../styles/header.css";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <h2 className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Nandita
          </Link>
        </h2>

        <nav className="nav-links">
          <Link to="/">Home</Link>

          <div className="dropdown">
            <span>Pages</span>
            <div className="dropdown-menu">
              <Link to="/blog">About Us</Link>
              <Link to="/blog">About Team</Link>
              <Link to="/blog">FAQ</Link>
              <Link to="/blog">404</Link>
              <Link to="/blog">Wishlist</Link>
              <Link to="/blog">Login</Link>
            </div>
          </div>

          <div className="dropdown">
            <span>Shop</span>
            <div className="dropdown-menu">
              <Link to="/shop">Shop</Link>
              <Link to="/categories">Categories</Link>
              {/* <Link to="/accoount">Accoount</Link> */}
            </div>
          </div>

          <Link to="/contact">Contact</Link>

          <div>
            <IoSearch />
            <IoCartOutline />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
