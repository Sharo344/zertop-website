import api from './api';

const contactService = {
  // Send contact form
  sendContactForm: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  // Generate WhatsApp link
  generateWhatsAppLink: async (data) => {
    const response = await api.post('/contact/whatsapp', data);
    return response.data;
  },

  // Send property inquiry
  sendPropertyInquiry: async (propertyId, inquiryData) => {
    const response = await api.post('/contact', {
      ...inquiryData,
      propertyId
    });
    return response.data;
  },

  // Contact agent directly
  contactAgent: async (agentId, message) => {
    const response = await api.post('/contact', {
      recipient: agentId,
      message
    });
    return response.data;
  }
};

export default contactService;