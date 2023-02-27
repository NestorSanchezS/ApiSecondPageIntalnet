const Course = require("../models/course");

async function createCourse(req, res) {
  const course = new Course(req.body);
  course.save((error, courseStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear curso" });
    } else {
      res.status(200).send(courseStored);
    }
  });
}

module.exports = {
  createCourse,
};
