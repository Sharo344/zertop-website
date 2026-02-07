import express from 'express';
import {
  getAgents,
  getAgent,
  saveProperty,
  unsaveProperty,
  getSavedProperties
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/agents', getAgents);
router.get('/agents/:id', getAgent);

// Protected routes
router.get('/saved', protect, getSavedProperties);
router.post('/save/:propertyId', protect, saveProperty);
router.delete('/save/:propertyId', protect, unsaveProperty);

export default router;