import { useEffect, useState } from "react";
import {
  createProduct,
  updateProduct,
} from "../api/adminApi";

const ProductForm = ({ editingProduct, setEditingProduct, refresh }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingProduct) {
      await updateProduct(editingProduct._id, form);
    } else {
      await createProduct(form);
    }

    setForm({ name: "", description: "", price: "", category: "" });
    setEditingProduct(null);
    refresh();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h4>{editingProduct ? "Edit Product" : "Add Product"}</h4>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button>{editingProduct ? "Update" : "Add"} Product</button>
    </form>
  );
};

export default ProductForm;
