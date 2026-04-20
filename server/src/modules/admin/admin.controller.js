import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Admin from "./admin.model.js";
import generateToken from "../../utils/generateToken.js";

// @desc    Admin Login
// @route   POST /api/auth/admin/login
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  // Find admin by email
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    throw new Error("Invalid email or password");
  }

  // Check if admin is active
  if (!admin.isActive) {
    throw new Error("Your account has been deactivated. Contact superadmin.");
  }

  // Check password
  const isPasswordMatch = await admin.comparePassword(password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  // Generate token
  const token = generateToken(admin._id);

  // Remove password from response
  admin.password = undefined;

  ApiResponse.success(res, "Login successful", {
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
    token,
  });
});

// @desc    Get Admin Profile
// @route   GET /api/admin/profile
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    throw new Error("Admin not found");
  }

  ApiResponse.success(res, "Profile retrieved successfully", admin);
});

// @desc    Update Admin Profile (name only)
// @route   PUT /api/admin/profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new Error("Name is required");
  }

  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    throw new Error("Admin not found");
  }

  admin.name = name.trim();

  const updatedAdmin = await admin.save();
  updatedAdmin.password = undefined;

  ApiResponse.success(res, "Profile updated successfully", {
    _id: updatedAdmin._id,
    name: updatedAdmin.name,
    email: updatedAdmin.email,
    role: updatedAdmin.role,
  });
});

// @desc    Create Admin (Superadmin only)
// @route   POST /api/admin
export const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new Error("Admin with this email already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
    role: role || "admin",
  });

  // Remove password from response
  admin.password = undefined;

  ApiResponse.success(res, "Admin created successfully", admin, 201);
});

// @desc    Get All Admins (Superadmin only)
// @route   GET /api/admin
export const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({}).select("-password");
  ApiResponse.success(res, "Admins retrieved successfully", admins);
});

// @desc    Update Admin
// @route   PUT /api/admin/:id
export const updateAdmin = asyncHandler(async (req, res) => {
  const { name, email, role, isActive } = req.body;

  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    throw new Error("Admin not found");
  }

  admin.name = name || admin.name;
  admin.email = email || admin.email;
  admin.role = role || admin.role;
  admin.isActive = isActive !== undefined ? isActive : admin.isActive;

  const updatedAdmin = await admin.save();
  updatedAdmin.password = undefined;

  ApiResponse.success(res, "Admin updated successfully", updatedAdmin);
});

// @desc    Change Password
// @route   PUT /api/admin/change-password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Validate password length
  if (!newPassword || newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  if (newPassword.length > 12) {
    throw new Error("Password must be less than 12 characters");
  }

  const admin = await Admin.findById(req.admin._id).select("+password");

  if (!admin) {
    throw new Error("Admin not found");
  }

  // Check current password
  const isMatch = await admin.comparePassword(currentPassword);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  admin.password = newPassword;
  await admin.save();

  ApiResponse.success(res, "Password changed successfully");
});

// @desc    Delete Admin (Superadmin only)
// @route   DELETE /api/admin/:id
export const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    throw new Error("Admin not found");
  }

  // Prevent deleting the last superadmin
  if (admin.role === "superadmin") {
    const superadminCount = await Admin.countDocuments({ role: "superadmin" });
    if (superadminCount <= 1) {
      throw new Error("Cannot delete the last superadmin");
    }
  }

  await admin.deleteOne();

  ApiResponse.success(res, "Admin deleted successfully");
});

// @desc    Create initial admin (for setup)
// @route   POST /api/auth/admin/setup
export const setupInitialAdmin = asyncHandler(async (req, res) => {
  // Check if any admin exists
  const adminCount = await Admin.countDocuments();
  
  if (adminCount > 0) {
    throw new Error("Setup already completed. Admins exist.");
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please provide name, email and password");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
    role: "superadmin",
  });

  const token = generateToken(admin._id);
  admin.password = undefined;

  ApiResponse.success(res, "Initial admin created successfully", {
    admin,
    token,
  }, 201);
});