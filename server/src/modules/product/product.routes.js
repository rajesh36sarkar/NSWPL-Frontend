// src/modules/product/product.routes.js
import express from "express";
import upload from "../../config/multerConfig.js";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

import { protect, admin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PUBLIC ROUTES
router.get("/", getProducts);
router.get("/:id", getProduct);

// ✅ ADMIN ROUTES
router.post(
  "/",
  protect,
  admin,
  upload.array("images", 5),
  createProduct
);

router.put(
  "/:id",
  protect,
  admin,
  upload.array("images", 5),
  updateProduct
);

router.delete("/:id", protect, admin, deleteProduct);

export default router;