import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Admin from "../modules/admin/admin.model.js";

const createInitialAdmin = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to database");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@nswpl.com" });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      console.log("Email: admin@nswpl.com");
      console.log("Use your existing password to login.");
      process.exit(0);
    }

    // Create new admin
    const admin = await Admin.create({
      name: "joyti",
      email: "joyti@nswpl.com",
      password: "joyti26",
      role: "admin",
    });

    console.log("✅ Initial admin created successfully!");
    console.log("--------------------------------");
    console.log("📧 Email: admin@nswpl.com");
    console.log("🔑 Password: admin123");
    console.log("--------------------------------");
    console.log("⚠️ Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createInitialAdmin();