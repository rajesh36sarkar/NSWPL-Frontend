import React, { useState } from 'react';
import '../styles/Shop.css';

const Shop = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(500);

  // Mock Data: Netai Stationery Products
  const products = [
    {
      id: 1,
      name: "Nandita Gold 172pg",
      category: "Notebooks",
      price: 45,
      oldPrice: 50,
      rating: 5,
      image: "https://via.placeholder.com/300x350?text=Notebook+Gold",
      isNew: true,
      isSale: false
    },
    {
      id: 2,
      name: "Ball Pen Packet (Blue)",
      category: "Pens",
      price: 120,
      oldPrice: null,
      rating: 4,
      image: "https://via.placeholder.com/300x350?text=Blue+Pens",
      isNew: false,
      isSale: false
    },
    {
      id: 3,
      name: "A4 Office Copier Paper",
      category: "Paper",
      price: 280,
      oldPrice: 320,
      rating: 5,
      image: "https://via.placeholder.com/300x350?text=A4+Paper",
      isNew: false,
      isSale: true
    },
    {
      id: 4,
      name: "Executive Leather Diary",
      category: "Diaries",
      price: 450,
      oldPrice: null,
      rating: 5,
      image: "https://via.placeholder.com/300x350?text=Leather+Diary",
      isNew: true,
      isSale: false
    },
    {
      id: 5,
      name: "School Drawing Kit",
      category: "Art",
      price: 150,
      oldPrice: 180,
      rating: 4,
      image: "https://via.placeholder.com/300x350?text=Drawing+Kit",
      isNew: false,
      isSale: true
    },
    {
      id: 6,
      name: "Cobra File Folder",
      category: "Files",
      price: 25,
      oldPrice: null,
      rating: 3,
      image: "https://via.placeholder.com/300x350?text=File+Folder",
      isNew: false,
      isSale: false
    },
  ];

  // Helper to render stars
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>&#9733;</span>
    ));
  };

  return (
    <div className="shop-container">
      {/* Mobile Header / Filter Toggle */}
      <div className="shop-mobile-header">
        <h1>Shop</h1>
        <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
          Filter <i className="fas fa-filter"></i>
        </button>
      </div>

      <div className="shop-layout">
        
        {/* --- Sidebar --- */}
        <aside className={`shop-sidebar ${mobileFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-widget">
            <h3 className="widget-title">Categories</h3>
            <ul className="category-list">
              <li><a href="#notebooks">Notebooks <span>(12)</span></a></li>
              <li><a href="#pens">Pens & Writing <span>(8)</span></a></li>
              <li><a href="#office">Office Supplies <span>(15)</span></a></li>
              <li><a href="#files">Files & Folders <span>(6)</span></a></li>
              <li><a href="#art">Art Supplies <span>(4)</span></a></li>
            </ul>
          </div>

          <div className="sidebar-widget">
            <h3 className="widget-title">Filter by Price</h3>
            <div className="price-filter">
              <p>Range: ₹0 - ₹{priceRange}</p>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)} 
              />
              <button className="btn-filter">Filter</button>
            </div>
          </div>

          <div className="sidebar-widget">
            <h3 className="widget-title">Brands</h3>
            <div className="checkbox-list">
              <label><input type="checkbox" defaultChecked /> Nandita</label>
              <label><input type="checkbox" /> Classmate</label>
              <label><input type="checkbox" /> DOMS</label>
              <label><input type="checkbox" /> Linc</label>
            </div>
          </div>

          <div className="sidebar-widget">
            <h3 className="widget-title">Color</h3>
            <div className="color-swatches">
              <span className="swatch blue" title="Blue"></span>
              <span className="swatch red" title="Red"></span>
              <span className="swatch black" title="Black"></span>
              <span className="swatch green" title="Green"></span>
              <span className="swatch white" title="White"></span>
            </div>
          </div>
        </aside>

        {/* --- Main Shop Content --- */}
        <main className="shop-main">
          
          {/* Top Bar */}
          <div className="shop-topbar">
            <p className="result-count">Showing 1–6 of 45 results</p>
            <div className="sort-dropdown">
              <select>
                <option>Default Sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="shop-grid">
            {products.map(product => (
              <div className="shop-card" key={product.id}>
                <div className="card-image">
                  <img src={product.image} alt={product.name} />
                  
                  {/* Badges */}
                  {product.isSale && <span className="badge sale">Sale</span>}
                  {product.isNew && <span className="badge new">New</span>}

                  {/* Hover Actions (The "Flatlogic" style icons) */}
                  <div className="card-actions">
                    <button title="Add to Cart">🛒</button>
                    <button title="View Details">👁</button>
                    <button title="Add to Wishlist">♥</button>
                  </div>
                </div>

                <div className="card-info">
                  <span className="card-category">{product.category}</span>
                  <h3 className="card-title">{product.name}</h3>
                  <div className="card-rating">
                    {renderStars(product.rating)}
                  </div>
                  <div className="card-price">
                    {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
                    <span className="current-price">₹{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>→</button>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Shop;