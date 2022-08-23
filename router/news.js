const router = require("express").Router();

const Post = require("../model/Post");
const {uploadImagetoAWS} = require("../controller/news");

require("dotenv").config();

const { requireLogin } = require("../middleware/auth");

router.post("/upload-image",uploadImagetoAWS);


module.exports = router;
