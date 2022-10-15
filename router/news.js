const router = require("express").Router();

const Post = require("../model/Post");
const {
  uploadImagetoAWS,
  createNews,
  getAllnews,
  deleteNews,
  editNews,
  reduceImageSize,
  delteMultipleNews
} = require("../controller/news");

require("dotenv").config();

const { requireLogin } = require("../middleware/auth");

router.post("/upload-image", uploadImagetoAWS);
router.post("/create-news", createNews);
router.get("/getall-news", getAllnews);
router.delete("/delete-news/:id", deleteNews);

// to delte multiple news

router.delete("/delte-multiple-news",delteMultipleNews);

// to edit news

router.patch("/edit-news/:id", editNews);

// to resize image

router.post("/reduce-image-size",reduceImageSize);

module.exports = router;
