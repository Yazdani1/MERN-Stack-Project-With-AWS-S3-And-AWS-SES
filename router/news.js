const router = require("express").Router();

const Post = require("../model/Post");
const {
  uploadImagetoAWS,
  createNews,
  getAllnews,
  deleteNews,
  editNews
} = require("../controller/news");

require("dotenv").config();

const { requireLogin } = require("../middleware/auth");

router.post("/upload-image", uploadImagetoAWS);
router.post("/create-news", createNews);
router.get("/getall-news", getAllnews);
router.delete("/delete-news/:id", deleteNews);

// to edit news

router.patch("/edit-news/:id", editNews);

module.exports = router;
