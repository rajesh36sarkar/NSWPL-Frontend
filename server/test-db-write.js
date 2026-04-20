import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/db.js';
import Contact from './src/modules/contact/contact.model.js';

const test = async () => {
  await connectDB();
  const contact = await Contact.create({
    firstName: 'DB',
    lastName: 'Test',
    email: 'dbtest@example.com',
    message: 'Direct write test'
  });
  console.log('✅ Wrote to database:', contact._id);
  process.exit(0);
};

test().catch(err => {
  console.error('❌ Write failed:', err);
  process.exit(1);
});