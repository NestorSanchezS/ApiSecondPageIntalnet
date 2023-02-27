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

async function getCourses(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await Course.find();
  } else {
    response = await Course.finf({ active });
  }

  if (!response) {
    res.status(400).send({ nsg: "No se ha encontrado ningun curso" });
  } else {
    res.status(200).send(response);
  }
}

module.exports = {
  createCourse,
  getCourses,
};
