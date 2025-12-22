import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <img src={product.image || "/book.jpg"} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button>Order Now</button>
    </div>
  );
};

export default ProductCard;
