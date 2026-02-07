import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Please specify appointment date']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Please specify appointment time']
  },
  type: {
    type: String,
    enum: ['viewing', 'consultation', 'inspection'],
    default: 'viewing'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  clientContact: {
    name: String,
    email: String,
    phone: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Appointment', AppointmentSchema);