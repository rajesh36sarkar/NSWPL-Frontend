// Company Email Addresses
export const EMAIL_ADDRESSES = {
  primary: "nswplsaha@yahoo.com",
  sales: "nswplsaha@yahoo.com",
  support: "nswplsaha@yahoo.com",
  info: "nswplsaha@yahoo.com"
};

// Email templates
export const EMAIL_TEMPLATES = {
  general: {
    subject: "Inquiry about Netai Stationery Products",
    body: "Hello,\n\nI would like to know more about your stationery products and services.\n\nThank you."
  },
  bulk: {
    subject: "Bulk Order Inquiry",
    body: "Hello,\n\nI'm interested in placing a bulk order for stationery products. Please share your wholesale pricing and minimum order quantity.\n\nThank you."
  },
  custom: {
    subject: "Custom Printing Inquiry",
    body: "Hello,\n\nI'm interested in custom printing services for notebooks/stationery. Please share details about your customization options and pricing.\n\nThank you."
  }
};

// Product inquiry template
export const getProductTemplate = (productName) => {
  return {
    subject: `Inquiry about ${productName}`,
    body: `Hello,\n\nI'm interested in "${productName}". Please share more details including pricing and availability.\n\nThank you.`
  };
};

// Open email client
export const openEmailClient = (to, subject, body) => {
  const emailTo = to || EMAIL_ADDRESSES.primary;
  const encodedSubject = subject ? encodeURIComponent(subject) : '';
  const encodedBody = body ? encodeURIComponent(body) : '';
  
  let mailtoUrl = `mailto:${emailTo}`;
  
  if (encodedSubject || encodedBody) {
    mailtoUrl += '?';
    if (encodedSubject) mailtoUrl += `subject=${encodedSubject}`;
    if (encodedSubject && encodedBody) mailtoUrl += '&';
    if (encodedBody) mailtoUrl += `body=${encodedBody}`;
  }
  
  window.location.href = mailtoUrl;
};

// General inquiry
export const generalInquiry = () => {
  const t = EMAIL_TEMPLATES.general;
  openEmailClient(EMAIL_ADDRESSES.primary, t.subject, t.body);
};

// Product inquiry
export const productInquiry = (productName) => {
  const t = getProductTemplate(productName);
  openEmailClient(EMAIL_ADDRESSES.primary, t.subject, t.body);
};

// Bulk order inquiry
export const bulkOrderInquiry = () => {
  const t = EMAIL_TEMPLATES.bulk;
  openEmailClient(EMAIL_ADDRESSES.primary, t.subject, t.body);
};

// Custom print inquiry
export const customPrintInquiry = () => {
  const t = EMAIL_TEMPLATES.custom;
  openEmailClient(EMAIL_ADDRESSES.primary, t.subject, t.body);
};