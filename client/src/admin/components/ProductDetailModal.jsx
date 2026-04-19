import React, { useState } from "react";
import "../styles/modal.css";

const ProductDetailModal = ({ product, onClose, onEdit, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const images = product.images || [];
  const mainImage = images[selectedImage]?.url || "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="detail-images">
          <div className="main-image">
            <img src={mainImage} alt={product.name} />
          </div>
          {images.length > 1 && (
            <div className="thumbnail-list">
              {images.map((img, i) => (
                <img 
                  key={i} 
                  src={img.url} 
                  alt={`Thumbnail ${i + 1}`}
                  className={selectedImage === i ? 'active' : ''}
                  onClick={() => setSelectedImage(i)}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="detail-info">
          <h2>{product.name}</h2>
          <span className="detail-category">{product.category}</span>
          <p className="detail-description">{product.description}</p>
          
          <div className="detail-section">
            <h4>Variants</h4>
            <div className="variants-table-wrapper">
              <table className="variants-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Pages</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants?.map((v, i) => (
                    <tr key={i}>
                      <td>{v.size}</td>
                      <td>{v.type}</td>
                      <td>{v.pages}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {product.dynamicFields?.length > 0 && (
            <div className="detail-section">
              <h4>Additional Information</h4>
              <div className="dynamic-fields-display">
                {product.dynamicFields.map((field, i) => (
                  <div key={i} className="detail-row">
                    <span className="field-key">{field.key}:</span>
                    <span className="field-value">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-actions">
            <button 
              className="modal-btn edit-btn"
              onClick={() => {
                onEdit(product);
                onClose();
              }}
            >
              ✏️ Edit Product
            </button>
            <button 
              className="modal-btn delete-btn"
              onClick={() => {
                onDelete(product._id);
                onClose();
              }}
            >
              🗑️ Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;