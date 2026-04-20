import Admin from './admin.model.js';
import bcrypt from 'bcryptjs';

class AdminService {
  async authenticateAdmin(email, password) {
    console.log('\n🔐 AUTHENTICATING...');
    console.log('📧 Email received:', email);
    console.log('🔑 Password received:', password);

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    
    if (!admin) {
      console.log('❌ Admin not found for email:', email.toLowerCase());
      throw new Error('Invalid email or password');
    }

    console.log('✅ Admin found:', admin.email);
    console.log('🔒 Stored hash:', admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('🔓 Password match result:', isMatch);

    if (!isMatch) {
      console.log('❌ Password does not match');
      throw new Error('Invalid email or password');
    }

    console.log('✅ Authentication successful');
    return admin;
  }

  async getAdminById(id) {
    const admin = await Admin.findById(id).select('-password');
    if (!admin) throw new Error('Admin not found');
    return admin;
  }
}

export default new AdminService();