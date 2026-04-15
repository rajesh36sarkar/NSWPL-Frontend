import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Using axios directly as requested
import ProductCard from "../components/product/ProductCard";
import "../styles/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- Slider Data (Static) ---
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1920&auto=format&fit=crop",
      title: "Stationery & Printing",
      subtitle: "PREMIUM QUALITY",
      desc: "Equipping schools and offices with the finest tools."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop",
      title: "Bulk Manufacturing",
      subtitle: "WHOLESALE ORDERS",
      desc: "High-volume notebook production for corporate clients."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1920&auto=format&fit=crop",
      title: "Enough Thinking.",
      subtitle: "START CREATING",
      desc: "It's time to upgrade your workspace with Netai Stationery."
    }
  ];

  // --- Auto Rotate Slider ---
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  // --- Fetch Products from Backend ---
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        // Take first 8 products
        setProducts(res.data.slice(0, 8)); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      
      {/* 1. HERO SLIDER */}
      <section className="hero-slider-section">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay-dark">
              <div className="hero-content">
                <span className="hero-subtitle">{slide.subtitle}</span>
                <h1>{slide.title}</h1>
                <p>{slide.desc}</p>
                <Link to="/shop" className="btn-hero">Shop Now</Link>
              </div>
            </div>
          </div>
        ))}
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* 2. CATEGORY BANNERS */}
      <section className="content-wrapper categories-section">
        <div className="cat-card">
          <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop" alt="Notebooks" />
          <div className="cat-overlay">
            <h3>Notebooks</h3>
            <Link to="/categories">Browse</Link>
          </div>
        </div>
        <div className="cat-card">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop" alt="Office" />
          <div className="cat-overlay">
            <h3>Office Supplies</h3>
            <Link to="/categories">Browse</Link>
          </div>
        </div>
        <div className="cat-card">
          <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop" alt="Art" />
          <div className="cat-overlay">
            <h3>Art Essentials</h3>
            <Link to="/categories">Browse</Link>
          </div>
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section className="content-wrapper best-sellers">
        <div className="section-header">
          <h2>Best Sellers</h2>
          <p>Our most popular products this week</p>
        </div>
        
        {loading ? (
          <p className="loading-text">Loading products from server...</p>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <div key={p._id} className="product-card-wrapper">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
        
        <div className="center-btn">
          <Link to="/shop" className="btn-outline">View All Products</Link>
        </div>
      </section>

      {/* 4. PROMO BANNER */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Bulk Orders for Schools?</h2>
          <p>Get up to <strong>20% OFF</strong> on wholesale notebook printing.</p>
          <Link to="/contact" className="btn-white">Contact Us</Link>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section className="content-wrapper features-section">
        <div className="feature-item">
          <div className="icon">🚚</div>
          <h4>Fast Delivery</h4>
          <p>Across West Bengal</p>
        </div>
        <div className="feature-item">
          <div className="icon">↺</div>
          <h4>Easy Returns</h4>
          <p>Hassle-free policy</p>
        </div>
        <div className="feature-item">
          <div className="icon">🔒</div>
          <h4>Secure Payment</h4>
          <p>100% Secure checkout</p>
        </div>
        <div className="feature-item">
          <div className="icon">📞</div>
          <h4>24/7 Support</h4>
          <p>Dedicated team</p>
        </div>
      </section>

    </div>
  );
};

export default Home;