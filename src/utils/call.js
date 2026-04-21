// Company Phone Numbers
export const PHONE_NUMBERS = {
  primary: "+919830770400",
  secondary: "+917044189887",
  office: "+919830770400",
  support: "+919830770400"
};

// Make a phone call
export const makeCall = (phoneNumber) => {
  const number = phoneNumber || PHONE_NUMBERS.primary;
  const cleanNumber = number.replace(/[^\d+]/g, '');
  const telUrl = `tel:${cleanNumber}`;
  window.location.href = telUrl;
};

// Call primary number
export const callPrimary = () => {
  makeCall(PHONE_NUMBERS.primary);
};

// Call secondary number
export const callSecondary = () => {
  makeCall(PHONE_NUMBERS.secondary);
};