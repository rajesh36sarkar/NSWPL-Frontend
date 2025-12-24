import { Link } from "react-router-dom";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOP NEWSLETTER */}
        <div className="footer-top">
          <div className="footer-top-left">
            <h4>Many desktop publishing</h4>
            <p>
              Do you want to receive exclusive email offers? Subscribe to our
              newsletter and get special discounts on our products.
            </p>
          </div>

          <div className="footer-top-right">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

        <hr />

        {/* MAIN FOOTER */}
        <div className="footer-main">

          {/* BRAND */}
          <div className="footer-brand">
            <h3>Netai Stationery</h3>
            <p>
              High quality notebooks, custom printing and premium stationery
              products for professionals and students.
            </p>

            <div className="footer-socials">
              <a href="https://google.com" target="_blank" rel="noreferrer">G</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">T</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">L</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">F</a>
            </div>
          </div>

          {/* LINKS */}
          <div className="footer-links">
            <h5>Company</h5>
            <Link to="/about">What We Do</Link>
            <Link to="/services">Available Services</Link>
            <Link to="/blog">Latest Posts</Link>
            <Link to="/faq">FAQs</Link>
          </div>

          <div className="footer-links">
            <h5>My Account</h5>
            <Link to="/admin/login">Sign In</Link>
            <Link to="/orders">Order Tracking</Link>
            <Link to="/support">Help & Support</Link>
          </div>

          <div className="footer-links">
            <h5>Customer Service</h5>
            <Link to="/contact">Help & Contact Us</Link>
            <Link to="/returns">Returns & Refunds</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>

        </div>

        <hr />

        {/* BOTTOM */}
        <div className="footer-bottom">
          © 2025 Netai Stationery. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;