const Menu = require("../models/menu");

async function createMenu(req, res) {
  const menu = new Menu(req.body);
  menu.save((error, menuStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear usuario" });
    } else {
      res.status(200).send(menuStored);
    }
  });
}

async function getMenus(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await Menu.find().sort({ order: "asc" });
  } else {
    response = await Menu.find({ active }).sort({ order: "asc" });
  }
  if (!response) {
    res.status(400).send({ msg: "No se ha encontado ningun menú" });
  } else {
    res.status(200).send(response);
  }
}

module.exports = {
  createMenu,
  getMenus,
};
