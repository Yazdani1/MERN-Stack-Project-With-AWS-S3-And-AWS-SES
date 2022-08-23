const router = require("express").Router();

const Post = require("../model/Post");
const {
  createPost,
  getPosts,
  getpostBycategory,
  getrelatedPostbyCategory,
  deletePost,
  postrandomWinner,
  getrandomWinner,
} = require("../controller/post");

require("dotenv").config();


const { requireLogin } = require("../middleware/auth");

router.post("/post", requireLogin, createPost);

router.get("/getposts",requireLogin, getPosts);

// post get by category

router.get("/getpostsbycategory/:slug", getpostBycategory);

// related post by category

router.get("/details-post/:id", getrelatedPostbyCategory);

router.delete("/delete/:id",requireLogin, deletePost);

// get random post selection

router.post("/postrandom-winner", postrandomWinner);
router.get("/getrandom-winner", getrandomWinner);

module.exports = router;
