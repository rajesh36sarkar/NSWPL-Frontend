import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

// Create transporter with proper Gmail settings
const createTransporter = () => {
  // Check if credentials exist
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email credentials missing - email service disabled');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const transporter = createTransporter();

if (transporter) {
  // Verify connection
  transporter.verify((error, success) => {
    if (error) {
      console.warn('⚠️ Email verification failed:', error.message);
    } else {
      console.log('✅ Email service ready');
    }
  });
}

export const sendEmail = async ({ to, subject, html, text }) => {
  // In development, just log and skip
  if (isDevelopment) {
    console.log('📧 [DEV] Email would send to:', to);
    console.log('   Subject:', subject);
    return { success: true, skipped: true };
  }

  // If email is disabled or transporter failed, just return
  if (!transporter) {
    console.log('📧 Email skipped - service not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Netai Stationery Works" <sahakamal208@gmail.com>',
      to: to || process.env.EMAIL_TO,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    return { success: false, error: error.message };
  }
};

export const sendContactNotification = async (contactData) => {
  const { firstName, lastName, email, phone, subject, message } = contactData;
  const name = `${firstName} ${lastName}`.trim();

  const emailSubject = `📬 New Contact: ${name || email}`;
  
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name || 'Not provided'}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
    <p><strong>Message:</strong></p>
    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
      ${message}
    </div>
    <hr>
    <p><small>Sent from Netai Stationery Works website</small></p>
  `;

  return sendEmail({ subject: emailSubject, html });
};