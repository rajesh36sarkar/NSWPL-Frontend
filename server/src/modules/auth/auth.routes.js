import express from "express";
import { loginAdmin, forgotPassword, resetPassword } from "./auth.controller.js";

const router = express.Router();

// 🔐 LOGIN
router.post("/login", loginAdmin);

// 🔑 FORGOT PASSWORD
router.post("/forgot-password", forgotPassword);

// 🔁 RESET PASSWORD
router.put("/reset-password/:token", resetPassword);

export default router;