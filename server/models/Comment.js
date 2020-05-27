const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const commentSchema = new Schema({
  user: {
    type: Schema.Types.Object,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  gameId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Comment", commentSchema);