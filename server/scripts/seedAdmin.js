import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import Admin from '../modules/admin/admin.model.js';

const seedAdmin = async () => {
  await connectDB();
  
  // Delete old admin if exists
  await Admin.deleteOne({ email: 'joyti@nswpl.com' });
  
  const admin = await Admin.create({
    name: 'Joyti',
    email: 'joyti@nswpl.com',
    password: 'admin123',  // simple password for testing
    role: 'superadmin',
  });
  
  console.log('✅ New admin created:', admin.email);
  process.exit(0);
};

seedAdmin();