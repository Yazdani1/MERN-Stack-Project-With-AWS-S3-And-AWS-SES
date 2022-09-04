const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var audiSchema = mongoose.Schema({
  title: {
    type: String,
  },
 
  audiofile: {},
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AudioFile", audiSchema);
