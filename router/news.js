const router = require("express").Router();

const Post = require("../model/Post");
const {uploadImagetoAWS,createNews} = require("../controller/news");

require("dotenv").config();

const { requireLogin } = require("../middleware/auth");

router.post("/upload-image",uploadImagetoAWS);
router.post("/create-news",createNews);



module.exports = router;
