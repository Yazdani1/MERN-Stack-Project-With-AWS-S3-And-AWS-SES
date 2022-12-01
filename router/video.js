const express = require('express');
const router = require("express").Router();

const formidableMiddleware = require('express-formidable');

const {uploadVideo,createVideoPost,getAllvideos,deleteVideoPost} = require("../controller/video");

router.post("/upload-video",formidableMiddleware(),uploadVideo);
router.post("/create-video",createVideoPost);

router.get("/get-all-video",getAllvideos);
router.delete("/delete-video/:id",deleteVideoPost);


module.exports = router;
