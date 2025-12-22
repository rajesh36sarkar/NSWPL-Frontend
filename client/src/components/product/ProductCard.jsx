import "../../styles/product.css";

const ProductCard = () => {
  return (
    <div className="product-card">
      <img src="/book.jpg" alt="Book" />
      <h3>Printed Notebook</h3>
      <p>Premium paper, strong binding</p>
      <button>Order Now</button>
    </div>
  );
};

export default ProductCard;
