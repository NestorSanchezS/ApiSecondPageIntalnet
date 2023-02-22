const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);
  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);
  const user = new User({ ...req.body, actuve: false, password: hasPassword });

  if (req.files.avatar) {
    console.log("Procesar avatar");
  }
  user.save((error, userStore) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear usuario" });
    } else {
      res.status(201).send(userStore);
    }
  });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
};
