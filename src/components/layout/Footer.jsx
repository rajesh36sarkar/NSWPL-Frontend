import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "../../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* TOP SECTION - Newsletter */}
        <div className="footer-top">
          <div className="footer-top-left">
            <h4>NSWPL <span className="tagline">— Crafting Ideas on Paper</span></h4>
            <p>Get updates about new products, exclusive offers, and stationery inspiration.</p>
          </div>

          <div className="footer-newsletter">
            <input type="email" placeholder="Your email address" />
            <button aria-label="Subscribe">
              Send Massage
              <span className="arrow">→</span>
            </button>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* MAIN SECTION */}
        <div className="footer-main">
          <div className="footer-brand">
            <h3>Netai Stationery Works Pvt. Ltd.</h3>
            <p>
              Premium notebooks, journals, and custom stationery for students, 
              professionals, and creative minds. Quality paper for every story.
            </p>

            <div className="footer-socials">
              <a href="https://www.facebook.com/share/1HxoyMiKf8/"  target="_blank"  className="social-icon facebook" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/netaistationery?igsh=em0xajE5a2FkbmF2"  target="_blank"  className="social-icon instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://wa.me/919830770400?text=Hi%2C%20I%20would%20like%20to%20talk%20with%20you"  target="_blank"  className="social-icon whatsapp" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h5>Company</h5>
            <Link to="/about">Who We Are</Link>
            <Link to="/products">Our Products</Link>
            <Link to="/admin/login">Admin Login</Link>
          </div>

          <div className="footer-links">
            <h5>Our Services</h5>
            <Link to="*">Bulk Manufacturing</Link>
            <Link to="*">Custom Stationery Design</Link>
             <Link to="*">Commercial Printing</Link>
          </div>

          <div className="footer-links">
            <h5>Support</h5>
            <Link to="/contact">Help & Contact</Link>
            <a href="../../../public/others/t&c.html" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
            <a href="../../../public/others/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* BOTTOM SECTION */}
        <div className="footer-bottom">
          <p>© {currentYear} Netai Stationery Works Pvt. Ltd. All rights reserved.</p>
          <div className="developer-credit">
            <a 
              href="https://www.linkedin.com/in/rajesh36sarkar/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Developed by <span>Rajesh Sarkar</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;