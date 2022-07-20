const router = require("express").Router();
const Post = require("../model/Post");

const postController = require("../controller/post");

router.post("/post", postController.createPost);

router.get("/getposts", postController.getPosts);

//post get by category

router.get("/getpostsbycategory/:id", postController.getpostBycategory);


router.delete("/delete/:id",postController.deletePost);



module.exports = router;
