import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/product/ProductCard";
import "../styles/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Nandita</h1>
        <p>Quality Book Printing & Stationery Works</p>
      </section>

      <section className="products">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </section>
    </div>
  );
};

export default Home;
