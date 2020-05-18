const Validator = require("validator");


module.exports = function (data) {
  let errors = {};  
  
  // Title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  else if (!Validator.isLength(data.title, { min: 1, max: 30 })) {
    errors.title = "Title must be between 1 and 30 characters";
  }  

  // Description checks
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }
  else if (!Validator.isLength(data.description, { min: 1, max: 255 })) {
    errors.description = "Description must be between 1 and 255 characters";
  }  
  
  // City checks
  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  else if (!Validator.isLength(data.city, { min: 1, max: 50 })) {
    errors.city = "City must be between 1 and 50 characters";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};