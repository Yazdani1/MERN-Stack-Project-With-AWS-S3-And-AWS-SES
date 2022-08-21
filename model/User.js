const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  resetToken: String,
  expireToken: Date,
});

module.exports = mongoose.model("User", userSchema);
