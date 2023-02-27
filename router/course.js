const express = require("express");
const multiparty = require("connect-multiparty");
const CourseController = require("../controllers/course");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();
const md_upload = multiparty({ uploadDir: "uploads/course" });

api.post("/course", [md_auth.asureAuth], CourseController.createCourse);

module.exports = api;
