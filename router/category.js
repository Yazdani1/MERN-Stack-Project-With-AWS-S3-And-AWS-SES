const router = require("express").Router();
const Post = require("../model/Post");
const categoryController = require("../controller/category");

router.post("/categoryceate", categoryController.createCategory);
router.get("/getall-category",categoryController.getCategory);
router.patch("/category-edit/:id",categoryController.editCategory);

router.get("/getsingle-category/:id",categoryController.getSingleCategory);


router.delete("/category-delete/:id",categoryController.deleteCategory);


module.exports = router;
