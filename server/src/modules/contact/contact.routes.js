import express from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  markAsRead,
  markAsUnread,
  deleteContact,
  bulkDeleteContacts,
  getContactStats,
  replyToContact,
} from './contact.controller.js';
import { protect, admin } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Admin only routes
router.get('/', protect, admin, getAllContacts);
router.get('/stats', protect, admin, getContactStats);
router.get('/:id', protect, admin, getContactById);
router.patch('/:id/read', protect, admin, markAsRead);
router.patch('/:id/unread', protect, admin, markAsUnread);
router.post('/:id/reply', protect, admin, replyToContact);
router.delete('/:id', protect, admin, deleteContact);
router.post('/bulk-delete', protect, admin, bulkDeleteContacts);

export default router;