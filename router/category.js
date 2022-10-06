const router = require("express").Router();
const Post = require("../model/Post");
const categoryController = require("../controller/category");

router.post("/categoryceate", categoryController.createCategory);


/**
 * @swagger
 * /api/getall-category:
 *  get:
 *    description: To get all the category
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: A bad response
 */


router.get("/getall-category",categoryController.getCategory);
router.patch("/category-edit/:id",categoryController.editCategory);

router.get("/getsingle-category/:id",categoryController.getSingleCategory);


router.delete("/category-delete/:id",categoryController.deleteCategory);


module.exports = router;
