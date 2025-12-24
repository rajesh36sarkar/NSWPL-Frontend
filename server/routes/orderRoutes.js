import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public – customer places order
router.post("/", createOrder);

// Admin – get all orders
router.get("/", protect, getOrders);

// Admin – update order status (NEW)
router.put("/:id/status", protect, updateOrderStatus);

export default router;
