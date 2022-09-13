const router = require("express").Router();

const formidableMiddleware = require('express-formidable');


const {uploadPdfFile,createPdfPost,getAllPDFFile,deletePdfPost} = require("../controller/pdffile");


router.post("/uploadpdf",formidableMiddleware(),uploadPdfFile);
router.post("/create-pdf-Post",createPdfPost);

// to get allthe post with pdf file

router.get("/getAllPdf",getAllPDFFile);

// to delete pdf post

router.delete("/delete-pdf/:id",deletePdfPost);




module.exports = router;
