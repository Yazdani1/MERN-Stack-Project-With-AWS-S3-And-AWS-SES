const router = require("express").Router();

const Post = require("../model/Post");
const {uploadImagetoAWS,createNews,getAllnews} = require("../controller/news");

require("dotenv").config();

const { requireLogin } = require("../middleware/auth");

router.post("/upload-image",uploadImagetoAWS);
router.post("/create-news",createNews);
router.get("/getall-news",getAllnews);



module.exports = router;
