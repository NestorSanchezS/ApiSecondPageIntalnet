const User = require("../models/user");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");

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
  const user = new User({ ...req.body, actuve: false });

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);
  user.password = hasPassword;

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }
  user.save((error, userStore) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear usuario" });
    } else {
      res.status(201).send(userStore);
    }
  });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  //vulve a encriptar la contraseña cuando se actualiza
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  //Para actualizacion de imagen avatar
  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar usuario" });
    } else {
      res.status(200).send({ msg: "Actualización correcta" });
    }
  });
}

async function deleteUser(req, res) {
  const { id } = req.params;

  User.findOneAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar usuario" });
    } else {
      res.status(200).send({ msg: "Usuario eliminado satisfactoriamente" });
    }
  });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
