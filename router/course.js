const express = require("express");
const CourseController = require("../controllers/course");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/course", [md_auth.asureAuth], CourseController.createCourse);

module.exports = api;
