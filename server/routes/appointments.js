import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getMyAppointments
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { appointmentValidation, validate } from '../middleware/validators.js';

const router = express.Router();

// Protected routes
router.post(
  '/',
  protect,
  appointmentValidation,
  validate,
  createAppointment
);

router.get('/', protect, getAppointments);
router.get('/my', protect, getMyAppointments);
router.get('/:id', protect, getAppointment);

router.put(
  '/:id/status',
  protect,
  authorize('agent', 'admin'),
  updateAppointmentStatus
);

router.delete('/:id', protect, deleteAppointment);

export default router;