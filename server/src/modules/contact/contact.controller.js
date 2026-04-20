import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import contactService from "./contact.service.js";
import { sendContactNotification, sendEmail } from "../../utils/emailService.js";

// 🔥 Submit Contact
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    throw new Error("Name, email, and message are required");
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Please provide a valid email address");
  }

  // Create contact record in database
  const contact = await contactService.createContact({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone?.trim() || "",
    subject: subject?.trim() || "General Inquiry",
    message: message.trim(),
  });

  // 📧 Send email notification to admin
  const adminEmailData = {
    firstName: name.split(' ')[0],
    lastName: name.split(' ').slice(1).join(' ') || '',
    email,
    phone: phone || "Not provided",
    subject: subject || "General Inquiry",
    message,
  };

  sendContactNotification(adminEmailData).catch((err) =>
    console.error("❌ Admin email error:", err.message)
  );

  // 📧 Send confirmation email to client
  const clientSubject = "Thank you for contacting Netai Stationery Works";
  const clientHtml = generateClientEmailHtml(name, message, subject, phone);

  sendEmail({
    to: email,
    subject: clientSubject,
    html: clientHtml,
  }).catch((err) => console.error("❌ Client email error:", err.message));

  ApiResponse.success(res, "Message sent successfully! We'll get back to you soon.", contact, 201);
});

// 🔥 Get All Contacts (with pagination and filters)
export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await contactService.getAllContacts(req.query);
  ApiResponse.success(res, "Contacts retrieved successfully", contacts);
});

// 🔥 Get Single Contact
export const getContactById = asyncHandler(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);
  
  if (!contact) {
    throw new Error("Contact not found");
  }
  
  ApiResponse.success(res, "Contact retrieved successfully", contact);
});

// 🔥 Mark as Read
export const markAsRead = asyncHandler(async (req, res) => {
  const contact = await contactService.markAsRead(req.params.id);
  
  if (!contact) {
    throw new Error("Contact not found");
  }
  
  ApiResponse.success(res, "Marked as read", contact);
});

// 🔥 Mark as Unread
export const markAsUnread = asyncHandler(async (req, res) => {
  const contact = await contactService.markAsUnread(req.params.id);
  
  if (!contact) {
    throw new Error("Contact not found");
  }
  
  ApiResponse.success(res, "Marked as unread", contact);
});

// 🔥 Delete Contact
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);
  
  if (!contact) {
    throw new Error("Contact not found");
  }
  
  await contactService.deleteContact(req.params.id);
  ApiResponse.success(res, "Contact deleted successfully");
});

// 🔥 Bulk Delete Contacts
export const bulkDeleteContacts = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new Error("Please provide an array of contact IDs");
  }
  
  await contactService.bulkDeleteContacts(ids);
  ApiResponse.success(res, `${ids.length} contacts deleted successfully`);
});

// 🔥 Get Contact Statistics
export const getContactStats = asyncHandler(async (req, res) => {
  const stats = await contactService.getContactStats();
  ApiResponse.success(res, "Contact statistics retrieved", stats);
});

// 🔥 Reply to Contact (Send custom email)
export const replyToContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { subject, message } = req.body;
  
  if (!subject || !message) {
    throw new Error("Subject and message are required");
  }
  
  const contact = await contactService.getContactById(id);
  
  if (!contact) {
    throw new Error("Contact not found");
  }
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #E09C27;">Response to Your Inquiry</h2>
      <p>Dear ${contact.name},</p>
      <p>Thank you for reaching out to Netai Stationery Works Pvt. Ltd.</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
        ${message}
      </div>
      <p>If you have any further questions, please don't hesitate to contact us.</p>
      <hr style="border: 1px solid #eee; margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        <strong>Netai Stationery Works Pvt. Ltd.</strong><br>
        14 B, Patwar Bagan Lane, Sealdah, Kolkata - 700009<br>
        📞 +91 98307 70400 | ✉️ nswplsaha@yahoo.com
      </p>
    </div>
  `;
  
  await sendEmail({
    to: contact.email,
    subject: subject,
    html: html,
  });
  
  // Mark as replied
  await contactService.markAsReplied(id);
  
  ApiResponse.success(res, "Reply sent successfully");
});

// Helper function to generate client confirmation email
function generateClientEmailHtml(name, message, subject, phone) {
  const firstName = name.split(' ')[0];
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #E09C27, #E5CD2F); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Thank You!</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0; font-size: 16px;">We've received your message</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">
            Dear <strong>${firstName}</strong>,
          </p>
          
          <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 20px;">
            Thank you for reaching out to <strong>Netai Stationery Works Pvt. Ltd.</strong> We have received your inquiry and our team will get back to you as soon as possible. We typically respond within 24 hours during business days.
          </p>
          
          <!-- Message Summary -->
          <div style="background: #f8f9fa; border-left: 4px solid #E09C27; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin: 0 0 15px; color: #E09C27; font-size: 16px;">Your Message Details:</h3>
            <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            ${phone ? `<p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Phone:</strong> ${phone}</p>` : ''}
            <p style="margin: 15px 0 5px; color: #666; font-size: 14px;"><strong>Message:</strong></p>
            <p style="margin: 5px 0; color: #888; font-size: 14px; line-height: 1.6; font-style: italic;">"${message.slice(0, 200)}${message.length > 200 ? '...' : ''}"</p>
          </div>
          
          <!-- Quick Links -->
          <div style="margin: 30px 0;">
            <h3 style="margin: 0 0 15px; color: #333; font-size: 16px;">While you wait, feel free to:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
              <li>Browse our <a href="http://localhost:5173/shop" style="color: #E09C27; text-decoration: none; font-weight: 500;">product catalog</a></li>
              <li>Learn more <a href="http://localhost:5173/about" style="color: #E09C27; text-decoration: none; font-weight: 500;">about our company</a></li>
              <li>Check our <a href="http://localhost:5173/services" style="color: #E09C27; text-decoration: none; font-weight: 500;">services</a></li>
            </ul>
          </div>
          
          <!-- Contact Info -->
          <div style="background: #f0f4ff; padding: 20px; border-radius: 12px; margin: 30px 0;">
            <h3 style="margin: 0 0 12px; color: #333; font-size: 15px;">📞 Need immediate assistance?</h3>
            <p style="margin: 5px 0; color: #555; font-size: 14px;">
              <strong>Call us:</strong> +91 98307 70400<br>
              <strong>WhatsApp:</strong> +91 98307 70400<br>
              <strong>Email:</strong> nswplsaha@yahoo.com
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #1a1a2e; padding: 30px; text-align: center;">
          <h3 style="color: white; margin: 0 0 10px; font-size: 18px;">Netai Stationery Works Pvt. Ltd.</h3>
          <p style="color: #8892b0; margin: 5px 0; font-size: 13px;">
            14 B, Patwar Bagan Lane, Sealdah, Kolkata - 700009, West Bengal
          </p>
          <p style="color: #8892b0; margin: 5px 0; font-size: 13px;">
            GSTIN: 19AACCN1563G1ZI
          </p>
          <div style="margin-top: 20px;">
            <a href="http://localhost:5173" style="color: #E09C27; text-decoration: none; font-size: 13px;">www.nswpl.com</a>
          </div>
          <p style="color: #6b7280; margin: 20px 0 0; font-size: 11px;">
            © ${new Date().getFullYear()} Netai Stationery Works Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}