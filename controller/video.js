const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
const { readFileSync } = require("fs");
const Video = require("../model/Video");

require("dotenv").config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  correctClockSkew: true,
};

const S3 = new AWS.S3(awsConfig);

// to upload video to aws s3

exports.uploadVideo = async (req, res) => {
  try {
    const { video } = req.files;

    // console.log(video);

    const params = {
      Bucket: "news-note",
      Key: `${uuid()}.${video.type.split("/")[1]}`,
      Body: readFileSync(video.path),
      ACL: "public-read",
      ContentType: video.type,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      res.send(data);
      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }
};

// to create video

exports.createVideoPost = async (req, res) => {
  try {
    const { title, video_link } = req.body;

    const videoPost = new Video({ title, video_link });

    const saveVideo = await Video.create(videoPost);

    res.status(201).json(saveVideo);
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all the video post

exports.getAllvideos = async (req, res) => {
  try {
    const allvideopost = await Video.find({}).sort({ date: "DESC" });

    res.status(200).json(allvideopost);
  } catch (error) {
    return res.status(400).json({ error: "Something Went Wrong" });
  }
};
