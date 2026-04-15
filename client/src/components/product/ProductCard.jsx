import { useNavigate } from "react-router-dom";
import "../../styles/product-card.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      
      {/* IMAGE */}
      <div
        className="product-image"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={product.image || "/book.jpg"}
          alt={product.name}
        />
      </div>

      {/* BODY */}
      <div className="product-body">
        <h4>{product.name}</h4>
        <p className="desc">
          {product.description?.slice(0, 80)}...
        </p>

        {/* FOOTER */}
        <div className="product-footer">
          <span className="price">₹{product.price}</span>

          <button
            onClick={(e) => {
              e.stopPropagation(); // IMPORTANT
              navigate(`/products/${product._id}`);
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
