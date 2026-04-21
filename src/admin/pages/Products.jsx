import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../api/adminApi";
import ProductForm from "../components/ProductForm";
import ConfirmModal from "../components/ConfirmModal";
import ProductDetailModal from "../components/ProductDetailModal";
import useToast from "../hooks/useToast";
import "../styles/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast, ToastComponent } = useToast();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchProducts();
      const productList = res?.data?.data?.products || [];
      setProducts(Array.isArray(productList) ? productList : []);
    } catch (err) {
      console.error("Failed to load products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, productId: id });
    setSelectedProduct(null);
  };

  const handleDeleteConfirm = async () => {
    const id = deleteModal.productId;
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      setDeleteModal({ isOpen: false, productId: null });
    }
  };

  const handleEditFromModal = (product) => {
    setEditingProduct(product);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalPages = (product) => {
    if (!product.variants?.length) return "N/A";
    const pages = product.variants.map(v => v.pages || 0);
    const min = Math.min(...pages);
    const max = Math.max(...pages);
    return min === max ? `${min}` : `${min}-${max}`;
  };

  const getPrimaryImage = (product) => {
    return product.images?.[0]?.url || "https://via.placeholder.com/300x200?text=No+Image";
  };

  const truncateText = (text, maxLength = 40) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="products-container">
      <ToastComponent />
      
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, productId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEdit={handleEditFromModal}
        onDelete={handleDeleteClick}
      />

      <div className="products-header">
        <h3>Products</h3>
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ProductForm
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        refresh={loadProducts}
        toast={toast}
      />

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className="product-card"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="product-card-image">
                  <img src={getPrimaryImage(product)} alt={product.name} />
                  {product.images?.length > 1 && (
                    <span className="image-count">+{product.images.length - 1}</span>
                  )}
                </div>
                
                <div className="product-card-content">
                  <h4 title={product.name}>{truncateText(product.name, 25)}</h4>
                  <span className="category-badge">{product.category}</span>
                  <p className="product-description">{truncateText(product.description, 35)}</p>
                  
                  <div className="product-meta">
                    <span className="meta-item">📄 {getTotalPages(product)} pgs</span>
                    <span className="meta-item">📦 {product.variants?.length || 0} var</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="icon">📦</div>
              <h3>No Products Found</h3>
              <p>{searchTerm ? "Try a different search" : "Add your first product"}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;