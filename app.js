const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require("./model/db");

app.use(cors());
app.use(express.json({ limit: "6mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

//  "proxy": "http://localhost:5000"
// "dev": "concurrently \"npm run server\" \"npm start --prefix client\""
//"proxy": "http://localhost:5000"

// swagger config

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "News Portal",
      version: "1.0.0",
      description: "A simple Express News Portal App",
    },

    servers: [
      {
        url: "http://localhost:5000"
        // url: "https://faro-coding-task.vercel.app",
      },
    ],
  },
  apis: ["./router/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// const swaggerOptions={
//   definition:{
//       openapi:'3.0.0',
//       info:{
//           title:'News Portal',
//           version:'1.0.0',
//           description:'Employe Api for employee management',
//           contact:{
//               name:'Jayaramachandran Augustin',

//               email:'jayaramachandran@whizpath.com'
//           },
//           servers:["http://localhost:5000"]
//       }
//   },
//   apis:["*.js"]
// }
// const swaggerDocs=swaggerJSDoc(swaggerOptions);
// app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.use("/api", require("./router/post"));
app.use("/api", require("./router/category"));
app.use("/api", require("./router/user"));
app.use("/api", require("./router/news"));
app.use("/api", require("./router/video"));
app.use("/api", require("./router/pdffile"));
app.use("/api", require("./router/audio"));

// Serve static assets if in production

//deploy for heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
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
