const Validator = require("validator");


module.exports = function (data) {
  let errors = {};  
  
  // Login checks
  if (Validator.isEmpty(data.login)) {
    errors.login = "Login field is required";
  }
  else if (!Validator.isLength(data.login, { min: 4, max: 30 })) {
    errors.login = "Login must be between 4 and 30 characters";
  }  

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }  
  
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }  
  else if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};