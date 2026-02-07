import sendEmail from '../utils/sendEmail.js';
import { contactFormTemplate, contactAutoReplyTemplate } from '../utils/emailTemplates.js';
import { generateWhatsAppLink } from '../utils/whatsapp.js';

// @desc    Send contact form via email
// @route   POST /api/contact
// @access  Public
export const sendContactForm = async (req, res) => {
  try {
    const { name, email, phone, message, propertyTitle, propertyId } = req.body;

    // Send email to admin
    await sendEmail({
      email: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: contactFormTemplate({
        name,
        email,
        phone,
        message,
        propertyTitle,
        propertyId
      })
    });

    // Send auto-reply to user
    await sendEmail({
      email: email,
      subject: 'Thank you for contacting  Estate',
      html: contactAutoReplyTemplate(name)
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error.message
    });
  }
};

// @desc    Generate WhatsApp contact link
// @route   POST /api/contact/whatsapp
// @access  Public
export const generateWhatsAppContact = async (req, res) => {
  try {
    const { agentPhone, propertyTitle, userName, customMessage } = req.body;

    let message = customMessage;
    
    if (!message && propertyTitle) {
      message = `Hi! I'm ${userName}. I'm interested in your property: ${propertyTitle}. Can we discuss more details?`;
    }

    const whatsappLink = generateWhatsAppLink(agentPhone, message);

    res.status(200).json({
      success: true,
      whatsappLink
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};