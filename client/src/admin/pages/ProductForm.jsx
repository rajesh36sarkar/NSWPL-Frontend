import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../api/adminApi";

const initialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
};

const ProductForm = ({ editingProduct, setEditingProduct, refresh }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price || "",
        category: editingProduct.category || "",
        image: editingProduct.image || "",
      });
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category) {
      return setError("Name, price and category are required");
    }

    try {
      setLoading(true);
      setError("");

      if (editingProduct) {
        await updateProduct(editingProduct._id, form);
      } else {
        await createProduct(form);
      }

      setForm(initialState);
      setEditingProduct(null);
      refresh();
    } catch (err) {
      setError("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h4>{editingProduct ? "Edit Product" : "Add Product"}</h4>

      {error && <p className="error-text">{error}</p>}

      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Price"
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

      <input
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <button disabled={loading}>
        {loading
          ? "Saving..."
          : editingProduct
          ? "Update Product"
          : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
