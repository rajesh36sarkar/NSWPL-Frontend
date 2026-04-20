import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import Admin from '../modules/admin/admin.model.js';
import bcrypt from 'bcryptjs';

const resetPassword = async () => {
  await connectDB();
  const email = 'joyti@nswpl.com';
  const newPassword = 'admin123';
  const hashed = await bcrypt.hash(newPassword, 10);
  
  await Admin.updateOne({ email }, { password: hashed });
  console.log(`✅ Password reset for ${email}. New password: ${newPassword}`);
  process.exit(0);
};

resetPassword();