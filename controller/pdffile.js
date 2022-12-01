const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
const { readFileSync } = require("fs");
const PDFFile = require("../model/PDFFile");

require("dotenv").config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  correctClockSkew: true,
};

const S3 = new AWS.S3(awsConfig);

// to upload pdf file to aws server

exports.uploadPdfFile = async (req, res) => {
  try {
    const { pdffile } = req.files;

    // console.log(video);

    const params = {
      Bucket: "news-note",
      Key: `${uuid()}.${pdffile.type.split("/")[1]}`,
      Body: readFileSync(pdffile.path),
      ContentType: "application/pdf",
      ACL: "public-read",
    };

    S3.upload(params, (err, data) => {
      if (err) {
        return res.sendStatus(400);
      }
      res.send(data);
      console.log(data);
    });
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
// to upload pdf file with post to the server
exports.createPdfPost = async (req, res) => {
  try {
    const { title, pdffile } = req.body;

    if (!title) {
      return res.status(422).json({ error: "Please add title" });
    }

    if (!pdffile) {
      return res.status(422).json({ error: "Please add pdf file" });
    }

    const postInfo = PDFFile({ title, pdffile });

    const createPostwithpdf = await PDFFile.create(postInfo);

    return res.status(201).json(createPostwithpdf);
  } catch (error) {
    return res.status(400).json({ error: "something went wrong" });
  }
};

// to get all the pdf file

exports.getAllPDFFile = async (req, res) => {
  try {
    const allpdf = await PDFFile.find({}).sort({ date: "DESC" });
    res.status(200).json(allpdf);
  } catch (error) {
    return res.status(400).json({ error: "something went wrong" });
  }
};
// to delete pdf file
exports.deletePdfPost = async () => {
  try {
    const delete_Query = { _id: req.params.id };

    const deletePdf = await PDFFile.findByIdAndDelete(delete_Query);

    res.status(200).json(deletePdf);
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Something went worng, could not found Id" });
  }
};
