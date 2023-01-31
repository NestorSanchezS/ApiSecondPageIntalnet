const { default: mongoose } = require("mongoose");
const moongose = require("moongose");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} = require("./constans");

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
  (error) => {
    if (error) console.log(error);
    console.log("--CONEXION EXITOSA--");
  }
);
