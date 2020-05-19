const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },  
  password: {
    type: String,
    required: true
  },
  inscriptionDate: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  followers: [],
  following: [],
  topGames: [],
  blockedUsers: [],
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: Boolean,
    default: false
  }
});


module.exports = mongoose.model("User", userSchema);