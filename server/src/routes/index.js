import express from 'express';

import productRoutes from '../modules/product/product.routes.js';
import adminRoutes from '../modules/admin/admin.routes.js';
import contactRoutes from '../modules/contact/contact.routes.js';
import authRoutes from '../modules/auth/auth.routes.js';
import orderRoutes from '../modules/order/order.routes.js';

const router = express.Router();

const defaultRoutes = [
  { path: '/products', route: productRoutes },
  { path: '/admin', route: adminRoutes },
  { path: '/contact', route: contactRoutes },
  { path: '/auth', route: authRoutes },
  { path: '/orders', route: orderRoutes },
  // Add admin login under /auth/admin
  { path: '/auth/admin', route: adminRoutes },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;