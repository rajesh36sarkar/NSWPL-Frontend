import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-name.onrender.com/api",
});

// 🔐 Attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ==========================
// PRODUCTS (JSON)
// ==========================
export const fetchProducts = () => API.get("/products");
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// ==========================
// PRODUCTS (FORM DATA - 🔥 IMPORTANT)
// ==========================
export const createProduct = (formData) =>
  API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ==========================
// ORDERS
// ==========================
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}/status`, { status });

// ==========================
// EXTRA (RECOMMENDED)
// ==========================
export const fetchOrders = () => API.get("/orders");
export const fetchMessages = () => API.get("/contact");