const router = require("express").Router();
const Post = require("../model/Post");

const postController = require("../controller/post");

router.post("/post", postController.createPost);

router.get("/getposts", postController.getPosts);

// post get by category

router.get("/getpostsbycategory/:slug", postController.getpostBycategory);

// related post by category

router.get("/details-post/:id", postController.getrelatedPostbyCategory);


router.delete("/delete/:id", postController.deletePost);

// get random post selection

router.post("/postrandom-winner",postController.postrandomWinner)
router.get("/getrandom-winner",postController.getrandomWinner)

module.exports = router;
