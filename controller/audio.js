const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
const { readFileSync } = require("fs");
const Audio = require("../model/Audio");

require("dotenv").config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  correctClockSkew: true,
};

const S3 = new AWS.S3(awsConfig);

exports.uploadAudioFile = async (req, res) => {
  try {
    const { audio } = req.files;

    // console.log(video);

    const params = {
      Bucket: "news-note",
      Key: `${uuid()}.${audio.type.split("/")[1]}`,
      Body: readFileSync(audio.path),
      ContentType: "audio/wav",
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

// to create post with audio

exports.createAudioPost = async (req, res) => {
  try {
    const { title, audiofile } = req.body;

    if (!title) {
      return res.status(422).json({ error: "Please add Title" });
    }

    if (!audiofile) {
      return res.status(422).json({ error: "Please add Audio File" });
    }

    const audioDetails = Audio({ title, audiofile });

    const createAudioPost = await Audio.create(audioDetails);

    res.status(201).json(createAudioPost);
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all the post with audio

exports.getAllAudioPost = async (req, res) => {
  try {
    const allaudiopost = await Audio.find({}).sort({ date: "DESC" });

    res.status(200).json(allaudiopost);
  } catch (error) {
    return res.status(400).json({ error: "Something Went Wrong" });
  }
};
