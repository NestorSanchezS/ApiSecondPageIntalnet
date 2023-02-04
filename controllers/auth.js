const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function register(req, res) {
  const { firstName, lastName, email, password } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatorio" });

  const user = new User({
    firstName,
    lastName,
    email: email.toLowerCase(),
    role: "user",
    active: false,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  user.save((error, userStorage) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear usuario" });
    } else {
      res.status(200).send(userStorage);
    }
  });
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email) res.status(401).send({ msg: "El email es obligatorio" });
  if (!password) res.status(401).send({ msg: "La contraseña  es obligatorio" });

  const emailLowercase = email.toLowerCase();

  User.findOne({ email: emailLowercase }, (error, userStore) => {
    if (error) {
      res.status(404).send({ msg: "Error del servidor" });
    } else {
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
        } else if (!check) {
          res.status(500).send({ msg: "Contraseña incorrecta" });
        } else if (!userStore.active) {
          res.status(401).send({ msg: "Usuario no autorizado o no activo" });
        } else {
          res.status(200).send({ result: "OK" });
        }
      });
    }
  });
}

module.exports = {
  register,
  login,
};
