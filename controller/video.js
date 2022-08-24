const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
const {readFileSync} = require('fs');

require("dotenv").config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  correctClockSkew: true,

};

const S3 = new AWS.S3(awsConfig);

exports.uploadVideo = async (req, res) => {

  try {

    const { video } = req.files;

    console.log(video);

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
        console.log(params);
      });

  } catch (error) {
    console.log(error);
  }

};
