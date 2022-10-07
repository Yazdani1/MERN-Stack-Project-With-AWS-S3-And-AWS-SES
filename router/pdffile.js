const router = require("express").Router();

const formidableMiddleware = require('express-formidable');


const {uploadPdfFile,createPdfPost,getAllPDFFile,deletePdfPost} = require("../controller/pdffile");


router.post("/uploadpdf",formidableMiddleware(),uploadPdfFile);
router.post("/create-pdf-Post",createPdfPost);

// to get allthe post with pdf file


/**
 * @swagger
 * /api/getAllPdf:
 *  get:
 *    description: To get all the news
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: A bad response
 */


router.get("/getAllPdf",getAllPDFFile);

// to delete pdf post

router.delete("/delete-pdf/:id",deletePdfPost);




module.exports = router;
