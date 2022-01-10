const router = require("express").Router();
const Post = require("../model/Post");

const postController = require("../controller/post");

router.post("/post", postController.createPost);

router.get("/getposts", postController.getPosts);

router.delete("/delete/:id",postController.deletePost); 

module.exports = router;
