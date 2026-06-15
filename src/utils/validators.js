export const validateSignup = ({ name, email, mobile, password, confirmPassword }) => {
  const errors = {};
  if (!name) errors.name = 'Full name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address.';
  if (!mobile) errors.mobile = 'Mobile number is required.';
  else if (!/^\d{10}$/.test(mobile)) errors.mobile = 'Enter a valid 10-digit mobile number.';
  if (!password) errors.password = 'Password is required.';
  else if (password.length < 8) errors.password = 'Password must be at least 8 characters.';
  if (!confirmPassword) errors.confirmPassword = 'Confirm password is required.';
  else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = 'Email is required.';
  if (!password) errors.password = 'Password is required.';
  return errors;
};
