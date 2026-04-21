import axios from "axios";

const API = axios.create({
  baseURL: "https://nswpl-backend.onrender.com/api",
});

export const getProducts = () => API.get("/products");
export const createOrder = (data) => API.post("/orders", data);
