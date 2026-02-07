import Appointment from '../models/Appointment.js';
import Property from '../models/Property.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import { appointmentConfirmationTemplate } from '../utils/emailTemplates.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req, res) => {
  try {
    const property = await Property.findById(req.body.property).populate('agent', 'name phone email');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Add client and agent to req.body
    req.body.client = req.user.id;
    req.body.agent = property.agent._id;

    const appointment = await Appointment.create(req.body);

    // Send confirmation email to client
    try {
      await sendEmail({
        email: req.body.clientContact.email,
        subject: 'Property Viewing Appointment Confirmed -  Estate',
        html: appointmentConfirmationTemplate({
          clientName: req.body.clientContact.name,
          propertyTitle: property.title,
          appointmentDate: req.body.appointmentDate,
          appointmentTime: req.body.appointmentTime,
          agentName: property.agent.name,
          agentPhone: property.agent.phone
        })
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the appointment creation if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully. Confirmation email sent!',
      appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all appointments (for agents/admin)
// @route   GET /api/appointments
// @access  Private (Agent/Admin)
export const getAppointments = async (req, res) => {
  try {
    let query = {};

    // If agent, only show their appointments
    if (req.user.role === 'agent') {
      query.agent = req.user.id;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const appointments = await Appointment.find(query)
      .populate('property', 'title location images')
      .populate('client', 'name email phone avatar')
      .populate('agent', 'name email phone avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments/my
// @access  Private
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ client: req.user.id })
      .populate('property', 'title location images')
      .populate('agent', 'name email phone avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('property', 'title location images')
      .populate('client', 'name email phone avatar')
      .populate('agent', 'name email phone avatar');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    if (
      appointment.client._id.toString() !== req.user.id &&
      appointment.agent._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this appointment'
      });
    }

    res.status(200).json({
      success: true,
      appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Agent/Admin)
export const updateAppointmentStatus = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if agent owns this appointment
    if (
      appointment.agent.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }

    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    if (
      appointment.client.toString() !== req.user.id &&
      appointment.agent.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this appointment'
      });
    }

    await appointment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};