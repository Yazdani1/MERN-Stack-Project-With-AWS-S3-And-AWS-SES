// import got from 'got';
const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");

// const got = require("got");
const sharp = require("sharp");
const News = require("../model/News");

require("dotenv").config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  correctClockSkew: true,
};

const S3 = new AWS.S3(awsConfig);

// to upload image to the AWS S3

exports.uploadImagetoAWS = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) return res.status(400).send("No Image");

    // prepare the image

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const typess = image.split(";")[0].split("/")[1];

    // image params

    const params = {
      Bucket: "news-note",
      Key: `${uuid()}.${typess}`,

      // Key: `category/${uuid()}`, to create a folder in s3 and then store image there
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${typess}`,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      res.send(data);
    });
  } catch (error) {}
};

// to reduce image size

exports.reduceImageSize = async (req, res) => {
  try {
    const { url } = req.body;

    const body = await got(url).buffer();

    const data = await sharp(body)
      .resize({ width: 100 })
      .jpeg({ quality: 70 })
      .toBuffer();

    const params = {
      Bucket: "news-note",
      Key: `${uuid()}`,

      // Key: `category/${uuid()}`, to create a folder in s3 and then store image there
      Body: data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/jpeg`,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      res.send(data);
      res.json(data);
    });
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong" });
  }
};

// to post news with aws image to database

exports.createNews = async (req, res) => {
  try {
    const { title, des, image } = req.body;

    if (!title) {
      return res.status(422).json({ error: "Title is required" });
    }

    if (!des) {
      return res.status(422).json({ error: "Description is required" });
    }
    if (!image) {
      return res.status(422).json({ error: "Image is required" });
    }

    const newsInfo = new News({ title, des, image });

    const newsDetails = await News.create(newsInfo);

    return res.status(201).json(newsDetails);
  } catch (error) {
    return res.status(400).json({ error: "Could not ceate news" });
  }
};

// to get all the news

exports.getAllnews = async (req, res) => {
  try {
    const newsList = await News.find({}).sort({ date: "DESC" });

    return res.status(200).json(newsList);
  } catch (error) {
    return res.status(400).json({ error: "Could not load news" });
  }
};

// to delete single news

exports.deleteNews = async (req, res) => {
  try {
    var deleteQuery = { _id: req.params.id };

    const delete_news = await News.findByIdAndDelete(deleteQuery);
    res.status(200).json({ message: "News Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ error: "News id could not found" });
  }
};

// to delte multiple news

exports.delteMultipleNews = async (req, res) => {
  try {
    const { id } = req.body;

    const deleteQuery = [id];

    const delete_news = await News.deleteMany({ _id: { $in: id } });

    console.log(deleteQuery);

    console.log(delete_news);

    res.status(200).json("Many post deleted");
  } catch (error) {
    res.status(400).json({ error: "Soething went wrog" });
  }
};

// to edit news

exports.editNews = async (req, res) => {
  try {
    const { title, des, image } = req.body;

    const editQuery = { _id: req.params.id };

    const payload = { title, des, image };

    const editDetails = await News.findByIdAndUpdate(editQuery, {
      $set: payload,
    });

    res.status(200).json(editDetails);
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
