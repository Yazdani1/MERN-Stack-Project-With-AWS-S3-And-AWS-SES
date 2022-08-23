import { nanoid } from "nanoid";

const AWS = require("aws-sdk");


require("dotenv").config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  correctClockSkew: true,
};


const S3 = new AWS.S3(awsConfig);


exports.uploadImagetoAWS = async (req, res) => {
  try {

    const {image} = req.body;

    if(!image) return res.status(400).send("No Image");

    // prepare the image

    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/,""),"base64")

    const type = image.split(";")[0].split("/")[1];

    // image params

    const params = {
        Bucket: "news-note",
        Key: `${nanoid}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
    }




  } catch (error) {}
};
