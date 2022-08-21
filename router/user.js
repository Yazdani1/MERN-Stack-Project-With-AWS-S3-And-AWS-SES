const router = require("express").Router();

const User = require("../model/User");


const {userRegistration,userLogIn} = require("../controller/user");


router.post("/registration",userRegistration);
router.post("/login",userLogIn);



module.exports = router;
