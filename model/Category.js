const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
