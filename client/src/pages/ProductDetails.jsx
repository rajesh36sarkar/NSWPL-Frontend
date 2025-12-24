import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // order form states
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/orders", {
        customerName,
        phone,
        productName: product.name,
        quantity,
      });

      alert("✅ Order placed successfully!");
      setCustomerName("");
      setPhone("");
      setQuantity(1);
    } catch (error) {
      alert("❌ Failed to place order");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image || "/book.jpg"} alt={product.name} />

      <div className="info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        {/* ORDER FORM */}
        <form className="order-form" onSubmit={handleOrderSubmit}>
          <h3>Place Order</h3>

          <input
            type="text"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Placing Order..." : "Submit Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
