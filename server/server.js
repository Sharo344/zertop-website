import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';
import userRoutes from './routes/users.js';
import appointmentRoutes from './routes/appointments.js';
import uploadRoutes from './routes/upload.js';
import contactRoutes from './routes/contact.js';

// Initialize app
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🏠  Estate API',
    version: '1.0.0',
    status: 'Server is running!',
    database: 'Connected',
    endpoints: {
      auth: '/api/auth',
      properties: '/api/properties',
      users: '/api/users',
      appointments: '/api/appointments',
      upload: '/api/upload',
      contact: '/api/contact'
    }
  });
});

// Error handler (must be after routes)
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`╔════════════════════════════════════════════════════╗`.cyan.bold);
  console.log(`║                                                    ║`.cyan.bold);
  console.log(`║          🏠  ESTATE API SERVER 🏠           ║`.cyan.bold);
  console.log(`║                                                    ║`.cyan.bold);
  console.log(`╠════════════════════════════════════════════════════╣`.cyan.bold);
  console.log(`║  Status: ${'✅ RUNNING'.green.bold}                                  ║`.cyan.bold);
  console.log(`║  Mode: ${process.env.NODE_ENV.toUpperCase().yellow.bold}                                    ║`.cyan.bold);
  console.log(`║  Port: ${PORT.toString().yellow.bold}                                        ║`.cyan.bold);
  console.log(`║  URL: ${'http://localhost:'.yellow.bold}${PORT.toString().yellow.bold}                         ║`.cyan.bold);
  console.log(`╚════════════════════════════════════════════════════╝`.cyan.bold);
  console.log(``);
  console.log(`📚 API Endpoints:`.green.bold);
  console.log(`   🔐 Auth:         /api/auth`.white);
  console.log(`   🏘️  Properties:   /api/properties`.white);
  console.log(`   👥 Users:        /api/users`.white);
  console.log(`   📅 Appointments: /api/appointments`.white);
  console.log(`   📤 Upload:       /api/upload`.white);
  console.log(`   📧 Contact:      /api/contact`.white);
  console.log(``);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`.red.bold);
  // Close server & exit process
  server.close(() => process.exit(1));
});