const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var newsSchema = mongoose.Schema({
  title: {
    type: String,
  },
 
  pdffile: {},
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UploadPdf", newsSchema);
