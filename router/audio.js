const router = require("express").Router();

const formidableMiddleware = require('express-formidable');


const {uploadAudioFile,createAudioPost,getAllAudioPost,deleteAudio} = require("../controller/audio");

router.post("/upload-audio",formidableMiddleware(),uploadAudioFile);

router.post("/create-audio-post",createAudioPost);


// to get allthe post with audio file

router.get("/get-all-audiopost",getAllAudioPost);


// to delete audio file

router.delete("/delete-audio/:id",deleteAudio);




module.exports = router;
