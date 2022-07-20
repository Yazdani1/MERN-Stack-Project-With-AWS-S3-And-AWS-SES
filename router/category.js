const router = require("express").Router();
const Post = require("../model/Post");
const categoryController = require("../controller/category");
router.post("/categoryceate", categoryController.createCategory);
router.get("/getall-category",categoryController.getCategory);


module.exports = router;
