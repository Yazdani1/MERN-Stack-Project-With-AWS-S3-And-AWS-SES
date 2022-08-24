const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var videoSchema = mongoose.Schema({
  title: {
    type: String,
  },

  video_link: {},

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Video", videoSchema);
