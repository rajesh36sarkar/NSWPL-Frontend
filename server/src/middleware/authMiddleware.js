import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import Admin from "../modules/admin/admin.model.js";

// Protect routes - requires authentication
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    
    if (admin) {
      req.admin = admin;
      return next();
    }

    throw new Error("Not authorized");
  } catch (error) {
    throw new Error("Not authorized, token failed");
  }
});

// Admin middleware
export const admin = (req, res, next) => {
  if (req.admin) {
    next();
  } else {
    throw new Error("Not authorized as admin");
  }
};

// Superadmin middleware
export const superAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === "superadmin") {
    next();
  } else {
    throw new Error("Not authorized as superadmin");
  }
};