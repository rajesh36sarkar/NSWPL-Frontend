import Admin from "../admin/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


// 🔐 LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔐 AUTHENTICATING...");
    console.log("📧 Email received:", email);
    console.log("🔑 Password received:", password);

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email" });
    }

    console.log("✅ Admin found:", admin.email);
    console.log("🔒 Stored hash:", admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("🔓 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔑 FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const admin = await Admin.findOne({ role: "admin" });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    admin.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    admin.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await admin.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    console.log("🔗 RESET LINK:", resetUrl);

    res.json({
      message: "Reset link generated",
      resetUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔁 RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        message: "Token invalid or expired",
      });
    }

    admin.password = password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};