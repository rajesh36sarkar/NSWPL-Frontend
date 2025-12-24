import { Link } from "react-router-dom";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialYoutube,
} from "react-icons/sl";
import { AiOutlineWhatsApp } from "react-icons/ai";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOP / NEWSLETTER */}
        <div className="footer-top">
          <div className="footer-top-left">
            <h4>Newsletter</h4>
            <p>Get updates about new products and special offers.</p>
          </div>

          {/* SMALL FLATLOGIC STYLE SEARCH */}
          <div className="footer-search">
            <input type="email" placeholder="Your email" />
            <button aria-label="Subscribe">→</button>
          </div>
        </div>

        <hr />

        {/* MAIN */}
        <div className="footer-main">
          <div className="footer-brand">
            <h3>Netai Stationery Works Pvt. Ltd.</h3>
            <p>
              Premium stationery, notebooks, and custom printing solutions for
              students, professionals, and businesses.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><SlSocialFacebook /></a>
              <a href="#" aria-label="Instagram"><SlSocialInstagram /></a>
              <a href="#" aria-label="YouTube"><SlSocialYoutube /></a>
              <a href="#" aria-label="WhatsApp"><AiOutlineWhatsApp /></a>
            </div>
          </div>

          <div className="footer-links">
            <h5>Company</h5>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/faq">FAQs</Link>
          </div>

          <div className="footer-links">
            <h5>My Account</h5>
            <Link to="/admin/login">Login</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>

          <div className="footer-links">
            <h5>Support</h5>
            <Link to="/contact">Contact</Link>
            <Link to="/returns">Returns</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>

        <hr />

        {/* BOTTOM */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} Netai Stationery Works Pvt. Ltd. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
