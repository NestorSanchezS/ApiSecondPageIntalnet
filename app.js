const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constans");

const app = express();

//import routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");

//_configure Body Parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configure static folder
app.use(express.static("uploads"));

//Configure Header HTTP -  CORS
app.use(cors());

//Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);

module.exports = app;
