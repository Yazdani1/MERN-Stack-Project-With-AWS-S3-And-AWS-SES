const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
