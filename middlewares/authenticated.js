const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: "La peticion no tiene la cabecera de autenticación" });
  }
  const token = req.headers.authorization.replace("Bearer", "");
  try {
    const payload = jwt.decoded(token);
    console.log(payload);
  } catch (error) {
    return res.status(400).send({ msg: "Token invalido" });
  }
}

module.exports = {
  asureAuth,
};
