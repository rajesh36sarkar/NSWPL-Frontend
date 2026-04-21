import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes, FaBox, FaLayerGroup, FaArrowRight, FaStar, FaCheckCircle } from "react-icons/fa";
import {  AnimatePresence } from "framer-motion";
import axios from "axios";
import Loader from "../components/common/Loader";
import "../styles/productsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  const features = [
    { icon: "💡", title: "Concept Development", description: "We work with you to develop innovative product concepts that align with your brand and objectives." },
    { icon: "🎨", title: "Customization", description: "Tailor our existing products with your branding, colors, materials, and specific requirements." },
    { icon: "🏭", title: "Bulk Manufacturing", description: "Large-scale production capabilities to meet high-volume requirements with consistent quality." }
  ];

  const qualityFeatures = [
    "Premium materials sourced from trusted suppliers",
    "Rigorous quality control at every stage of production",
    "Adherence to international quality standards",
    "Continuous improvement in processes and products"
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      const productList = res.data?.data?.products || [];
      setProducts(productList);
      setFilteredProducts(productList);

      const uniqueCategories = ["all", ...new Set(productList.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const getPrimaryImage = (product) => {
    return product.images?.[0]?.url || "https://via.placeholder.com/300x250?text=No+Image";
  };

  const getPriceDisplay = (product) => {
    const priceField = product.dynamicFields?.find(f => f.key?.toLowerCase() === "price");
    return priceField?.value || "Price on Request";
  };

  const getMinPages = (product) => {
    if (!product.variants?.length) return null;
    const pages = product.variants.map(v => v.pages).filter(Boolean);
    return pages.length ? Math.min(...pages) : null;
  };

  return (
    

      <div className="products-page">
        {/* Hero Section */}
        <section className="products-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="hero-badge">Our Collection</span>
            <h1 style={{ color: "#ffffff" }} >Premium Stationery Products</h1>
            <p>Discover our wide range of high-quality notebooks, drawing books, and custom stationery solutions</p>
          </div>
          <div className="hero-wave">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="filter-section">
          <div className="container">
            <div className="filter-wrapper">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products by name, category, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="clear-search" onClick={() => setSearchTerm("")}>
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="category-filter">
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === "all" ? "All Products" : cat}
                  </button>
                ))}
              </div>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <FaBox />
                </button>
                <button
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <FaLayerGroup />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-grid-section">
          <div className="container">
            {loading ? (
              <Loader type="gradient" size="large" text="Loading Products..." />
            ) : filteredProducts.length === 0 ? (
              <div className="no-products">
                <FaBox className="empty-icon" />
                <h3>No Products Found</h3>
                <p>Try adjusting your search or category filter</p>
              </div>
            ) : (
              <div className={`products-${viewMode}`}>
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      className="product-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="product-image">
                        <img src={getPrimaryImage(product)} alt={product.name} />
                        {product.images?.length > 1 && (
                          <span className="image-count">+{product.images.length - 1}</span>
                        )}
                        <div className="card-overlay">
                          <button className="quick-view-btn">
                            Quick View <FaArrowRight />
                          </button>
                        </div>
                      </div>

                      <div className="product-info">
                        <span className="product-category">{product.category}</span>
                        <h3>{product.name}</h3>
                        <p className="product-description">{product.description?.slice(0, 80)}...</p>

                        <div className="product-meta">
                          {getMinPages(product) && (
                            <span className="meta-tag">
                              <FaBox /> {getMinPages(product)}+ Pages
                            </span>
                          )}
                          <span className="meta-tag">
                            <FaLayerGroup /> {product.variants?.length || 0} Variants
                          </span>
                        </div>

                        <div className="product-footer">
                          <span className="product-price">{getPriceDisplay(product)}</span>
                          <button className="inquiry-btn">Inquiry</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" id="features" ref={el => sectionRefs.current[0] = el}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Why Choose Us</span>
              <h2>Need Custom Solutions?</h2>
              <p>We specialize in creating tailored products that meet your specific requirements</p>
            </div>

            <div className={`features-grid ${visibleSections.features ? 'visible' : ''}`}>
              {features.map((feature, index) => (
                <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section className="quality-section" id="quality" ref={el => sectionRefs.current[1] = el}>
          <div className="container">
            <div className="quality-wrapper">
              <div className="quality-content">
                <span className="section-badge">Our Commitment</span>
                <h2>Quality at the Heart of Everything We Do</h2>
                <p>We are committed to delivering products that not only meet but exceed your expectations.</p>

                <ul className="quality-list">
                  {qualityFeatures.map((feature, index) => (
                    <li key={index}>
                      <FaCheckCircle /> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="quality-stats">
                <div className="stat-card">
                  <FaStar className="stat-icon" />
                  <h3>100%</h3>
                  <p>Quality Assurance</p>
                </div>
                <div className="stat-card">
                  <FaBox className="stat-icon" />
                  <h3>500+</h3>
                  <p>Products Delivered</p>
                </div>
                <div className="stat-card">
                  <FaCheckCircle className="stat-icon" />
                  <h3>50+</h3>
                  <p>Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                className="product-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>

                <div className="modal-images">
                  <div className="main-image">
                    <img src={getPrimaryImage(selectedProduct)} alt={selectedProduct.name} />
                  </div>
                  {selectedProduct.images?.length > 1 && (
                    <div className="thumbnail-list">
                      {selectedProduct.images.map((img, i) => (
                        <img key={i} src={img.url} alt={`Thumbnail ${i + 1}`} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="modal-info">
                  <span className="modal-category">{selectedProduct.category}</span>
                  <h2>{selectedProduct.name}</h2>
                  <p className="modal-description">{selectedProduct.description}</p>

                  <div className="modal-variants">
                    <h4>Available Variants</h4>
                    <table className="variants-table">
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Type</th>
                          <th>Pages</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProduct.variants?.map((v, i) => (
                          <tr key={i}>
                            <td>{v.size}</td>
                            <td>{v.type}</td>
                            <td>{v.pages}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {selectedProduct.dynamicFields?.length > 0 && (
                    <div className="modal-dynamic">
                      <h4>Additional Details</h4>
                      {selectedProduct.dynamicFields.map((field, i) => (
                        <div key={i} className="dynamic-row">
                          <span>{field.key}:</span>
                          <span>{field.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="modal-actions">
                    <button className="inquiry-btn-large">Request Inquiry</button>
                    <button className="contact-btn">Contact Us</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    
  );
};

export default ProductsPage;