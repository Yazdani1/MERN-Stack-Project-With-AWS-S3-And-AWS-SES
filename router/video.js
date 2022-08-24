const router = require("express").Router();

const {uploadVideo} = require("../controller/video");


router.get("/upload-video",uploadVideo);




module.exports = router;
