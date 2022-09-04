const router = require("express").Router();

const formidableMiddleware = require('express-formidable');


const {uploadPdfFile,createPdfPost,getAllPDFFile} = require("../controller/pdffile");


router.post("/uploadpdf",formidableMiddleware(),uploadPdfFile);
router.post("/create-pdf-Post",createPdfPost);

// to get allthe post with pdf file

router.get("/getAllPdf",getAllPDFFile);




module.exports = router;
