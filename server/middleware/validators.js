import { body, validationResult } from 'express-validator';

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Register validation rules
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('role')
    .optional()
    .isIn(['client', 'agent', 'admin'])
    .withMessage('Invalid role')
];

// Login validation rules
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Property validation rules
export const propertyValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Property title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  
  body('type')
    .notEmpty()
    .withMessage('Property type is required')
    .isIn(['House', 'Apartment', 'Duplex', 'Villa', 'Penthouse', 'Townhouse', 'Studio', 'Commercial', 'Land', 'Office Space'])
    .withMessage('Invalid property type'),
  
  body('status')
    .optional()
    .isIn(['For Sale', 'For Rent', 'Sold', 'Rented'])
    .withMessage('Invalid property status'),
  
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(value => value >= 0)
    .withMessage('Price cannot be negative'),
  
  body('location.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  
  body('location.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  
  body('location.area')
    .trim()
    .notEmpty()
    .withMessage('Area is required'),
  
  body('details.bedrooms')
    .notEmpty()
    .withMessage('Number of bedrooms is required')
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a non-negative integer'),
  
  body('details.bathrooms')
    .notEmpty()
    .withMessage('Number of bathrooms is required')
    .isInt({ min: 0 })
    .withMessage('Bathrooms must be a non-negative integer'),
  
  body('details.size')
    .notEmpty()
    .withMessage('Property size is required')
    .isNumeric()
    .withMessage('Size must be a number')
];

// Appointment validation rules
export const appointmentValidation = [
  body('property')
    .notEmpty()
    .withMessage('Property ID is required')
    .isMongoId()
    .withMessage('Invalid property ID'),
  
  body('appointmentDate')
    .notEmpty()
    .withMessage('Appointment date is required')
    .isISO8601()
    .withMessage('Invalid date format'),
  
  body('appointmentTime')
    .notEmpty()
    .withMessage('Appointment time is required'),
  
  body('type')
    .optional()
    .isIn(['viewing', 'consultation', 'inspection'])
    .withMessage('Invalid appointment type'),
  
  body('clientContact.name')
    .trim()
    .notEmpty()
    .withMessage('Contact name is required'),
  
  body('clientContact.email')
    .trim()
    .notEmpty()
    .withMessage('Contact email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  
  body('clientContact.phone')
    .trim()
    .notEmpty()
    .withMessage('Contact phone is required')
];

// Contact form validation (for WhatsApp integration)
export const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters')
];