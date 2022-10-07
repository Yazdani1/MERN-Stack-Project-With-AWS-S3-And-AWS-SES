const express = require("express");
const cors = require("cors");
const app = express();
// swagger
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const router = require("express").Router();
const {
  uploadImagetoAWS,
  createNews,
  getAllnews,
  deleteNews,
  editNews,
  reduceImageSize,
} = require("../controller/news");

require("dotenv").config();

const { requireLogin } = require("../middleware/auth");

// const swaggerOptions={
//   definition:{
//       openapi:'3.0.0',
//       info:{
//           title:'News Portal',
//           version:'1.0.0',
//           description:'Employe Api for employee management',
//           contact:{
//               name:'Jayaramachandran Augustin',
//               url:'https://whizpath.com',
//               email:'jayaramachandran@whizpath.com'
//           },
//           servers:["http://localhost:5000"]
//       }
//   },
//   apis:["news.js"]
// }
// const swaggerDocs=swaggerJSDoc(swaggerOptions);
// app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

router.post("/upload-image", uploadImagetoAWS);
router.post("/create-news", createNews);

/**
 * @swagger
 * /api/getall-news:
 *  get:
 *    description: To get all the news
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: A bad response
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */


/**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
  */
router.get("/getall-news", getAllnews);

router.delete("/delete-news/:id", deleteNews);

// to edit news

router.patch("/edit-news/:id", editNews);

// to resize image

// router.post("/reduce-image-size", reduceImageSize);

module.exports = router;
