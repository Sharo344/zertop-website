import express from "express";
import {
  generateWhatsAppContact,
  sendContactForm,
} from "../controllers/contactController.js";
import { contactValidation, validate } from "../middleware/validators.js";

const router = express.Router();

// Public routes
router.post("/whatsapp", generateWhatsAppContact);
router.post("/", contactValidation, validate, sendContactForm);

export default router;
