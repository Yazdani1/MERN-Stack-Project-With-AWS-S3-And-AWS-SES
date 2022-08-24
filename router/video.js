const express = require('express');
 
// var app = express();
 
// app.use(formidableMiddleware());

const router = require("express").Router();

const formidableMiddleware = require('express-formidable');


const {uploadVideo} = require("../controller/video");


router.post("/upload-video",formidableMiddleware(),uploadVideo);




module.exports = router;
