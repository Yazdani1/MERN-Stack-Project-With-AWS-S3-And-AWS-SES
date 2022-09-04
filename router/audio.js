const router = require("express").Router();

const formidableMiddleware = require('express-formidable');


const {uploadAudioFile,createAudioPost} = require("../controller/audio");

router.post("/upload-audio",formidableMiddleware(),uploadAudioFile);

router.post("/create-audio-post",createAudioPost);


// to get allthe post with pdf file






module.exports = router;
