const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var newsSchema = mongoose.Schema({
  title: {
    type: String,
  },
  des: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },




});

module.exports = mongoose.model("News", newsSchema);
