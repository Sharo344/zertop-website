import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getAgentProperties
} from '../controllers/propertyController.js';
import { protect, authorize } from '../middleware/auth.js';
import { propertyValidation, validate } from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/agent/:agentId', getAgentProperties);
router.get('/:id', getProperty);

// Protected routes (Agent/Admin only)
router.post(
  '/',
  protect,
  authorize('agent', 'admin'),
  propertyValidation,
  validate,
  createProperty
);

router.put(
  '/:id',
  protect,
  authorize('agent', 'admin'),
  updateProperty
);

router.delete(
  '/:id',
  protect,
  authorize('agent', 'admin'),
  deleteProperty
);

export default router;