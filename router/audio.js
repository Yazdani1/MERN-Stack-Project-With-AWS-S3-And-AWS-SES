const router = require("express").Router();

const formidableMiddleware = require('express-formidable');


const {uploadAudioFile} = require("../controller/audio");

router.post("/upload-audio",formidableMiddleware(),uploadAudioFile);


// to get allthe post with pdf file






module.exports = router;
