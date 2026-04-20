import express from "express";
import {
  adminLogin,
  getAdminProfile,
  updateProfile,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  changePassword,
  deleteAdmin,
  setupInitialAdmin,
} from "./admin.controller.js";
import { protect, admin, superAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", adminLogin);
router.post("/setup", setupInitialAdmin);

// Protected routes (requires authentication)
router.get("/profile", protect, admin, getAdminProfile);
router.put("/profile", protect, admin, updateProfile);  // ✅ ADDED
router.put("/change-password", protect, admin, changePassword);

// Superadmin only routes
router.post("/", protect, superAdmin, createAdmin);
router.get("/", protect, superAdmin, getAllAdmins);
router.put("/:id", protect, superAdmin, updateAdmin);
router.delete("/:id", protect, superAdmin, deleteAdmin);

export default router;