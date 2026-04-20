// Company WhatsApp Numbers
export const WHATSAPP_NUMBERS = {
  primary: "919830770400",
  secondary: "917044189887",
  office: "919830770400"
};

// Default message
export const DEFAULT_MESSAGE = "Hi, I would like to talk with you";

// Open WhatsApp with message
export const openWhatsApp = (phoneNumber, message) => {
  const number = phoneNumber || WHATSAPP_NUMBERS.primary;
  const msg = message || DEFAULT_MESSAGE;
  const cleanNumber = number.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

// Product inquiry
export const inquireProduct = (productName) => {
  const message = `Hi, I'm interested in "${productName}". Please share more details.`;
  openWhatsApp(WHATSAPP_NUMBERS.primary, message);
};

// Bulk order inquiry
export const bulkOrderInquiry = () => {
  const message = `Hi, I'm interested in placing a bulk order for stationery products. Please share your wholesale pricing and minimum order quantity.`;
  openWhatsApp(WHATSAPP_NUMBERS.primary, message);
};

// Custom printing inquiry
export const customPrintingInquiry = () => {
  const message = `Hi, I'm interested in custom printing services for notebooks/stationery. Please share details about your customization options and pricing.`;
  openWhatsApp(WHATSAPP_NUMBERS.primary, message);
};