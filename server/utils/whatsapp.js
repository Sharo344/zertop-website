// WhatsApp helper functions
// You can integrate with WhatsApp Business API later

// Generate WhatsApp link
export const generateWhatsAppLink = (phone, message = '') => {
  // Remove all non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Return WhatsApp web link
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

// Format property message for WhatsApp
export const formatPropertyMessage = (property, userName) => {
  return `Hi! I'm ${userName}. I'm interested in your property:\n\n` +
         `📍 ${property.title}\n` +
         `💰 ₦${property.price.toLocaleString()}\n` +
         `📌 ${property.location.area}, ${property.location.city}\n\n` +
         `Can we schedule a viewing?`;
};

// Format appointment confirmation for WhatsApp
export const formatAppointmentMessage = (appointment, propertyTitle) => {
  return `Hello! Your property viewing appointment has been scheduled:\n\n` +
         `🏠 Property: ${propertyTitle}\n` +
         `📅 Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}\n` +
         `⏰ Time: ${appointment.appointmentTime}\n\n` +
         `See you there!`;
};