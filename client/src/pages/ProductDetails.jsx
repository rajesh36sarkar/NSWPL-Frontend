import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image || "/book.jpg"} alt={product.name} />
      <div className="info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <button>Place Order</button>
      </div>
    </div>
  );
};

export default ProductDetails;
