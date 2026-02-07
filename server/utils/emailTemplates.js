// Contact form email template (sent to admin)
export const contactFormTemplate = (data) => {
  const { name, email, phone, message, propertyTitle, propertyId } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #EF4444 0%, #F97316 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #F97316; border-radius: 5px; }
        .label { font-weight: bold; color: #EF4444; margin-bottom: 5px; }
        .value { color: #333; margin-bottom: 15px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 New Contact Form Submission</h1>
          <p> Estate Platform</p>
        </div>
        <div class="content">
          <div class="info-box">
            <div class="label">From:</div>
            <div class="value">${name}</div>
            
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
            
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${phone}">${phone}</a></div>
            
            ${propertyTitle ? `
              <div class="label">Property Interested In:</div>
              <div class="value">${propertyTitle}${propertyId ? ` (ID: ${propertyId})` : ''}</div>
            ` : ''}
            
            <div class="label">Message:</div>
            <div class="value">${message}</div>
          </div>
          
          <p><strong>Action Required:</strong> Please respond to this inquiry as soon as possible.</p>
        </div>
        <div class="footer">
          <p>This email was sent from  Estate contact form</p>
          <p>Received: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Auto-reply template (sent to user)
export const contactAutoReplyTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #EF4444 0%, #F97316 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #EF4444; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 Thank You for Contacting Us!</h1>
          <p> Estate</p>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to  Estate! We have received your inquiry and our team will get back to you within 24 hours.</p>
          
          <p>In the meantime, feel free to browse our latest properties on our website.</p>
          
          <a href="${process.env.CLIENT_URL}/properties" class="button">View Properties</a>
          
          <p>If you need immediate assistance, please contact us at:</p>
          <p>📞 Phone: +234 800 123 4567<br>
          📧 Email: info@estate.com</p>
          
          <p>Best regards,<br>
          <strong>The  Estate Team</strong></p>
        </div>
        <div class="footer">
          <p> Estate - Your Dream Home Awaits</p>
          <p>Victoria Island, Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Appointment confirmation template
export const appointmentConfirmationTemplate = (data) => {
  const { clientName, propertyTitle, appointmentDate, appointmentTime, agentName, agentPhone } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #EF4444 0%, #F97316 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .appointment-box { background: white; padding: 25px; margin: 20px 0; border-radius: 8px; border: 2px solid #F97316; }
        .detail { margin: 15px 0; padding: 10px; background: #FFF7ED; border-radius: 5px; }
        .icon { font-size: 20px; margin-right: 10px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Appointment Confirmed!</h1>
          <p> Estate</p>
        </div>
        <div class="content">
          <p>Dear ${clientName},</p>
          
          <p>Your property viewing appointment has been successfully scheduled.</p>
          
          <div class="appointment-box">
            <h2 style="color: #EF4444; margin-top: 0;">Appointment Details</h2>
            
            <div class="detail">
              <span class="icon">🏠</span>
              <strong>Property:</strong> ${propertyTitle}
            </div>
            
            <div class="detail">
              <span class="icon">📅</span>
              <strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            
            <div class="detail">
              <span class="icon">⏰</span>
              <strong>Time:</strong> ${appointmentTime}
            </div>
            
            <div class="detail">
              <span class="icon">👤</span>
              <strong>Agent:</strong> ${agentName}
            </div>
            
            <div class="detail">
              <span class="icon">📞</span>
              <strong>Agent Contact:</strong> <a href="tel:${agentPhone}">${agentPhone}</a>
            </div>
          </div>
          
          <p><strong>Important Notes:</strong></p>
          <ul>
            <li>Please arrive 5 minutes early</li>
            <li>Bring a valid ID</li>
            <li>Contact the agent if you need to reschedule</li>
          </ul>
          
          <p>We look forward to seeing you!</p>
          
          <p>Best regards,<br>
          <strong>The  Estate Team</strong></p>
        </div>
        <div class="footer">
          <p> Estate - Your Dream Home Awaits</p>
        </div>
      </div>
    </body>
    </html>
  `;
};