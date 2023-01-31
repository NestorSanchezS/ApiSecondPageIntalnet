const User = require("../models/user");

function register(req, res) {
  console.log(req.body);
  res.status(200).send({ msg: "TODO OK" });
}

module.exports = {
  register,
};
