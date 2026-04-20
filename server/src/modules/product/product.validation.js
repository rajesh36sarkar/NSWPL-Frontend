import { body } from 'express-validator';

export const validateProduct = [
  body('name').notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').notEmpty().withMessage('Description is required'),
];