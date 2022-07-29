const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var winnerSchema = mongoose.Schema({
  winnername: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WinnerList", winnerSchema);
