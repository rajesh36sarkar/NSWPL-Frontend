import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaStar, FaQuoteLeft, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTruck, FaMedal, FaUsers, FaBox, FaShieldAlt } from "react-icons/fa";
import { MdDesignServices, MdPrint, MdFactory } from "react-icons/md";
import axios from "axios";
import videoBg from "../assets/videos/hero-video.mp4";
import logoWithNSWPL from "../assets/icons/logoWithNSWPL.png";
import img1 from "../assets/images/others/mc4.jpeg";
import img2 from "../assets/images/others/mc1.jpeg";
import img3 from "../assets/images/others/mc3.jpeg";
import "../styles/home.css";
import SEO from "../components/common/SEO";

const Home = () => {


  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [stats, setStats] = useState({
    products: 0,
    clients: 500,
    experience: 25,
    cities: 50
  });
  const videoRef = useRef(null);

  const categories = [
    { icon: "📓", name: "Notebooks", count: 120, color: "#E09C27" },
    { icon: "🎨", name: "Drawing Books", count: 45, color: "#E5CD2F" },
    { icon: "📊", name: "Project Files", count: 35, color: "#E09C27" },
    { icon: "📝", name: "Exercise Books", count: 80, color: "#E5CD2F" },
    { icon: "📒", name: "Diaries", count: 25, color: "#E09C27" },
    { icon: "✏️", name: "Stationery Kits", count: 30, color: "#E5CD2F" }
  ];

  const services = [
    { icon: <MdDesignServices />, title: "Custom Design", description: "Tailored stationery solutions that reflect your brand identity" },
    { icon: <MdPrint />, title: "Commercial Printing", description: "High-quality printing for marketing materials and documents" },
    { icon: <MdFactory />, title: "Bulk Manufacturing", description: "Large-scale production with consistent quality" }
  ];

  const testimonials = [
    { name: "Rajesh Sharma", company: "Kolkata Publishers", text: "NSWPL has been our trusted partner for over 5 years. Their quality and service are unmatched.", rating: 5, image: img1 },
    { name: "Priya Banerjee", company: "Creative Minds", text: "The custom notebooks they designed for our corporate gifting were absolutely stunning.", rating: 5, image: img2 },
    { name: "Amit Mukherjee", company: "Eastern Enterprises", text: "Professional service, timely delivery, and excellent product quality.", rating: 5, image: img3 }
  ];

  const features = [
    { icon: <FaTruck />, title: "Free Shipping", description: "On orders above ₹500" },
    { icon: <FaMedal />, title: "Premium Quality", description: "100% quality assurance" },
    { icon: <FaUsers />, title: "24/7 Support", description: "Dedicated customer service" },
    { icon: <FaShieldAlt />, title: "Secure Payment", description: "100% secure transactions" }
  ];

  useEffect(() => {
    fetchFeaturedProducts();

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const products = res.data?.data?.products || [];
      setFeaturedProducts(products.slice(0, 6));
      setStats(prev => ({ ...prev, products: products.length }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const AnimatedSection = ({ children, className }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.2 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 }
        }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <>
      <SEO
        title="Netai Stationery Works | Premium Stationery Manufacturer India"
        description="Leading manufacturer of premium notebooks, journals, and custom stationery in India. Bulk manufacturing, corporate gifting, and custom printing services since 2009."
        keywords="stationery manufacturer, notebooks wholesale, custom journals, bulk stationery, corporate gifting"
        schemaType="Organization"
        preconnectUrls={[
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com",
          "https://cdn.jsdelivr.net",
        ]}
      />

      <div className="home-page">
        {/* Video Hero Section */}
        <section className="video-hero">
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster={img1}
          >
            <source src={videoBg} type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* <img src={logoWithNSWPL} alt="NSWPL" className="hero-logo" /> */}
              <h1 style={{color:"#ffffff"}} >Crafting Ideas on Paper</h1>
              <p>Premium stationery, notebooks, and custom printing solutions for students, professionals, and businesses</p>
              <div className="hero-buttons">
                <Link to="/products" className="hero-btn primary">
                  Shop Now <FaArrowRight />
                </Link>
                <Link to="/contact" className="hero-btn secondary">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="scroll-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>

        {/* Features Bar */}
        <section className="features-bar">
          <div className="container">
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-text">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <AnimatedSection className="categories-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Shop by Category</span>
              <h2>Explore Our Collection</h2>
              <p>Find the perfect stationery for every need</p>
            </div>

            <div className="categories-grid">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  className="category-card"
                  whileHover={{ y: -8 }}
                  style={{ '--accent': category.color }}
                >
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p>{category.count}+ Products</p>
                  <Link to="/shop" className="category-link">
                    Explore <FaArrowRight />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* About Section */}
        <section className="about-section">
          <div className="container">
            <div className="about-wrapper">
              <motion.div
                className="about-content"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="section-badge">About NSWPL</span>
                <h2>Netai Stationery Works Pvt. Ltd.</h2>
                <p className="about-description">
                  With over 25 years of excellence in the stationery industry, we are Kolkata's premier manufacturer of high-quality notebooks, drawing books, and custom stationery solutions.
                </p>

                <div className="about-features">
                  <div className="about-feature">
                    <FaCheckCircle /> Premium quality materials
                  </div>
                  <div className="about-feature">
                    <FaCheckCircle /> State-of-the-art manufacturing
                  </div>
                  <div className="about-feature">
                    <FaCheckCircle /> Custom design capabilities
                  </div>
                  <div className="about-feature">
                    <FaCheckCircle /> Pan-India delivery
                  </div>
                </div>

                <div className="about-stats">
                  <div className="stat">
                    <h3>{stats.experience}+</h3>
                    <p>Years Experience</p>
                  </div>
                  <div className="stat">
                    <h3>{stats.products}+</h3>
                    <p>Products</p>
                  </div>
                  <div className="stat">
                    <h3>{stats.clients}+</h3>
                    <p>Happy Clients</p>
                  </div>
                  <div className="stat">
                    <h3>{stats.cities}+</h3>
                    <p>Cities Served</p>
                  </div>
                </div>

                <Link to="/about" className="about-btn">
                  Learn More <FaArrowRight />
                </Link>
              </motion.div>

              <motion.div
                className="about-image"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="image-grid">
                  <div className="grid-item large">
                    <img src={img1} alt="Manufacturing" />
                  </div>
                  <div className="grid-item small">
                    <img src={img2} alt="Products" />
                  </div>
                  <div className="grid-item medium">
                    <img src={img3} alt="Quality" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <AnimatedSection className="services-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">What We Offer</span>
              <h2>Comprehensive Stationery Solutions</h2>
              <p>From design to delivery, we handle every aspect</p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card"
                  whileHover={{ y: -8 }}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/services" className="service-link">
                    Learn More <FaArrowRight />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <AnimatedSection className="featured-section">
            <div className="container">
              <div className="section-header">
                <span className="section-badge">Featured Products</span>
                <h2>Our Bestsellers</h2>
                <p>Discover our most popular stationery items</p>
              </div>

              <div className="featured-grid">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    className="product-card"
                    whileHover={{ y: -8 }}
                  >
                    <div className="product-image">
                      <img src={product.images?.[0]?.url || img1} alt={product.name} />
                      <div className="product-overlay">
                        <Link to="/products" className="view-product">
                          View Product
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <span className="product-category">{product.category}</span>
                      <h4>{product.name}</h4>
                      <p className="product-pages">
                        {product.variants?.[0]?.pages || 'N/A'} Pages
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="view-all">
                <Link to="/products" className="view-all-btn">
                  View All Products <FaArrowRight />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Testimonials Section */}
        <AnimatedSection className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Testimonials</span>
              <h2>What Our Clients Say</h2>
              <p>Trusted by businesses across India</p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="testimonial-card"
                  whileHover={{ y: -5 }}
                >
                  <FaQuoteLeft className="quote-icon" />
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < testimonial.rating ? "filled" : ""} />
                    ))}
                  </div>
                  <div className="testimonial-author">
                    <img src={testimonial.image} alt={testimonial.name} />
                    <div>
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <motion.div
              className="cta-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2>Ready to Start Your Project?</h2>
              <p>Let's discuss your stationery requirements and create something exceptional together.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get a Quote <FaArrowRight />
                </Link>
                <Link to="/products" className="cta-secondary">
                  Browse Products
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Bar */}
        <section className="contact-bar">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-item">
                <FaPhone />
                <div>
                  <h4>Call Us</h4>
                  <p>+91 983 077 0400</p>
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <div>
                  <h4>Email Us</h4>
                  <p>nswplsaha@yahoo.com</p>
                </div>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <div>
                  <h4>Visit Us</h4>
                  <p>14 B, Patwar Bagan Lane, Kolkata</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;