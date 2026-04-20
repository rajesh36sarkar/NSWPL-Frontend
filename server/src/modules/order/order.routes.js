// src/modules/order/order.routes.js
import express from "express";
import {
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} from "./order.controller.js";
import { protect, admin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, admin);

router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;