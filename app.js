const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constans");

const app = express();

//import routings
const authRoutes = require("./router/auth");

//_configure Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure static folder
app.use(express.static("uploads"));

//Configure Header HTTP -  CORS
app.use(cors());

//Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;
