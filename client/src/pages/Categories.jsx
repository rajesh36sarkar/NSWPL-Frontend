import React, { useState } from 'react';
import '../styles/Categories.css';

const Categories = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Mock Data for Stationery Products
  const products = [
    {
      id: 1,
      name: "Nandita Gold Notebook",
      category: "Notebooks",
      price: "₹45.00",
      image: "https://via.placeholder.com/300x300?text=Nandita+Gold",
      status: "Best Seller"
    },
    {
      id: 2,
      name: "Office Register (300 Pgs)",
      category: "Office Supplies",
      price: "₹120.00",
      image: "https://via.placeholder.com/300x300?text=Office+Register",
      status: "New"
    },
    {
      id: 3,
      name: "Practical Drawing Book",
      category: "Art Supplies",
      price: "₹65.00",
      image: "https://via.placeholder.com/300x300?text=Drawing+Book",
      status: ""
    },
    {
      id: 4,
      name: "Ball Point Pen Box (Blue)",
      category: "Writing",
      price: "₹150.00",
      image: "https://via.placeholder.com/300x300?text=Pen+Box",
      status: "Sale"
    },
    {
      id: 5,
      name: "A4 Cobra File",
      category: "Files & Folders",
      price: "₹25.00",
      image: "https://via.placeholder.com/300x300?text=Cobra+File",
      status: ""
    },
    {
      id: 6,
      name: "Executive Diary 2024",
      category: "Office Supplies",
      price: "₹350.00",
      image: "https://via.placeholder.com/300x300?text=Diary",
      status: "Premium"
    },
  ];

  const categories = ["All", "Notebooks", "Office Supplies", "Writing", "Art Supplies", "Files & Folders"];

  // Filter logic (Frontend only for demo)
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="cat-page-container">
      
      {/* Mobile Filter Toggle Button */}
      <div className="mobile-filter-bar">
        <button className="filter-toggle-btn" onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
          {mobileFilterOpen ? 'Close Filters' : 'Show Filters'}
        </button>
        <span className="product-count">{filteredProducts.length} Products Found</span>
      </div>

      <div className="cat-layout">
        
        {/* Sidebar Filters */}
        <aside className={`cat-sidebar ${mobileFilterOpen ? 'show-mobile' : ''}`}>
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul>
              {categories.map((cat, index) => (
                <li 
                  key={index} 
                  className={activeCategory === cat ? 'active' : ''}
                  onClick={() => { setActiveCategory(cat); setMobileFilterOpen(false); }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Price Range</h3>
            {/* Simple Visual Placeholder for Price Slider */}
            <div className="price-slider-mock">
              <div className="slider-track"></div>
              <div className="slider-range"></div>
            </div>
            <p>₹10 - ₹1000</p>
          </div>

          <div className="sidebar-section">
            <h3>Brands</h3>
            <ul>
              <li><input type="checkbox" id="nandita" defaultChecked /> <label htmlFor="nandita">Nandita</label></li>
              <li><input type="checkbox" id="classmate" /> <label htmlFor="classmate">Classmate</label></li>
              <li><input type="checkbox" id="doms" /> <label htmlFor="doms">DOMS</label></li>
            </ul>
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="cat-main">
          <div className="cat-header">
            <h1>{activeCategory === 'All' ? 'All Stationery' : activeCategory}</h1>
            <div className="sort-options">
              <label>Sort by:</label>
              <select>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-wrapper">
                  {product.status && <span className="product-badge">{product.status}</span>}
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <button className="btn-view">Quick View</button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-cat-label">{product.category}</span>
                  <h4>{product.name}</h4>
                  <div className="product-price">{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Categories;