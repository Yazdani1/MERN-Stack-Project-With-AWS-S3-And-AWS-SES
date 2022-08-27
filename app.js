const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("./model/db");

app.use(cors());
app.use(express.json({ limit: "6mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

//  "proxy": "http://localhost:5000"
// "dev": "concurrently \"npm run server\" \"npm start --prefix client\""
//"proxy": "http://localhost:5000"

app.use("/api", require("./router/post"));
app.use("/api", require("./router/category"));
app.use("/api", require("./router/user"));
app.use("/api", require("./router/news"));
app.use("/api", require("./router/video"));

// Serve static assets if in production

//deploy for heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//to deploy vercel

// if (process.env.NODE_ENV == "production") {
//   const path = require("path");

//   app.get("/", (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "client", "build")));
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

//json for vercel.json file
// {

//   "builds":[
//       {
//           "src":"./app.js",
//           "use":"@vercel/node"
//       }
//   ],
//   "routes":[
//       {
//           "src":"/.*",
//           "dest":"app.js"
//       }
//   ]
// }

app.listen(port, (req, res) => {
  console.log("Server connected");
});
