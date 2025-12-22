import "../styles/home.css";
import ProductCard from "../components/product/ProductCard";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Nandita</h1>
        <p>Quality Book Printing & Stationery Works</p>
      </section>

      <section className="products">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </div>
  );
};

export default Home;
