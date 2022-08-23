const jwt = require("jsonwebtoken");
const User = require("../model/User");

//for token

exports.requireLogin = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      //aatach tokemnn
      req.user = decode;
      next();
    } else {
      return res.status(400).json({ message: "Unauthorized Dont have access" });
    }
  } catch (err) {
    console.log(err);
  }
};


