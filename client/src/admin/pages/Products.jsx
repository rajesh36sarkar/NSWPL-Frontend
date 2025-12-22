import { useEffect, useState } from "react";
import {
  fetchProducts,
  deleteProduct,
} from "../api/adminApi";
import ProductForm from "./ProductForm";
import "../styles/table.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = () => {
    fetchProducts().then(res => setProducts(res.data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="table-container">
      <h3>Products</h3>

      <ProductForm
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        refresh={loadProducts}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th width="160">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.category}</td>
              <td>
                <button onClick={() => setEditingProduct(p)}>Edit</button>
                <button
                  className="danger"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
