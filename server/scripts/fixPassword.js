import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import Admin from '../modules/admin/admin.model.js';
import bcrypt from 'bcryptjs';

const fixPassword = async () => {
  await connectDB();
  
  const email = 'joyti@nswpl.com';
  const plainPassword = 'joytinswpl26';
  
  // Generate a fresh hash with the same bcrypt version
  const newHash = await bcrypt.hash(plainPassword, 10);
  console.log('🔑 New hash generated:', newHash);
  
  // Test the hash immediately
  const testMatch = await bcrypt.compare(plainPassword, newHash);
  console.log('🧪 Self-test match:', testMatch);
  
  // Update the admin document
  const result = await Admin.updateOne(
    { email },
    { password: newHash }
  );
  
  if (result.modifiedCount > 0) {
    console.log('✅ Password updated successfully');
  } else {
    console.log('⚠️ Admin not found or no change');
  }
  
  process.exit(0);
};

fixPassword().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});