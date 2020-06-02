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
  else if (!Validator.isLength(data.description, { min: 1, max: 500 })) {
    errors.description = "Description must be between 1 and 500 characters";
  }  
  
  // City checks
  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  else if (!Validator.isLength(data.city, { min: 1, max: 50 })) {
    errors.city = "City must be between 1 and 50 characters";
  }

  // Players level checks
  if (Validator.isEmpty(data.playersLevel)) {
    errors.playersLevel = "Player level field is required";
  }

  // Players number checks
  if (Validator.isEmpty(data.playersMax)) {
    errors.playersMax = "Player number field is required";
  }

  // Game date checks
  if (data.gameDate === null) {
    errors.gameDate = "Game date field is required";
    errors.gameHour = "Game hour field is required";
  }
  if (new Date(data.gameDate) < new Date()) {
    errors.gameDate = "Game date is incorrect";
    errors.gameHour = "Game hour is incorrect";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};