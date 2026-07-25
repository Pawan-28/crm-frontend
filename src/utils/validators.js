export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateMinLength = (value, min) => {
  return value && value.length >= min;
};

export const validateMaxLength = (value, max) => {
  return value && value.length <= max;
};

export const getValidationErrors = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const value = data[field];
    const fieldRules = rules[field];
    
    fieldRules.forEach((rule) => {
      if (rule === 'required' && !validateRequired(value)) {
        errors[field] = 'This field is required';
      }
      if (rule === 'email' && !validateEmail(value)) {
        errors[field] = 'Please enter a valid email';
      }
      if (rule === 'phone' && !validatePhone(value)) {
        errors[field] = 'Please enter a valid phone number';
      }
      if (rule === 'password' && !validatePassword(value)) {
        errors[field] = 'Password must be at least 8 characters';
      }
    });
  });
  
  return errors;
};