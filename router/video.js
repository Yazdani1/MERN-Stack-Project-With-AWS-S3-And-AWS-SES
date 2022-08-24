const express = require('express');
 
// var app = express();
 
// app.use(formidableMiddleware());

const router = require("express").Router();

const formidableMiddleware = require('express-formidable');


const {uploadVideo,createVideoPost,getAllvideos} = require("../controller/video");


router.post("/upload-video",formidableMiddleware(),uploadVideo);
router.post("/create-video",createVideoPost);

router.get("/get-all-video",getAllvideos);




module.exports = router;
