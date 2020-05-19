const Validator = require("validator");


module.exports = function (data) {
  let errors = {};  
  
  // Login checks
  if (Validator.isEmpty(data.login)) {
    errors.login = "Login field is required";
  }
  
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};