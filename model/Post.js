const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var postSchema = mongoose.Schema({
  title: {
    type: Number,
  },
  des: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  categoryBy: {
    type: ObjectId,
    ref: "Category",
  },

  postedBy: {
    type: ObjectId,
    ref: "User",
  },


});

module.exports = mongoose.model("Post", postSchema);
