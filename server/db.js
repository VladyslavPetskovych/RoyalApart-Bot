const mongoose = require("mongoose");
require("dotenv").config();

const mongopass = process.env.mongopass;

var mongoURL = `mongodb+srv://andriyyavir7:1111@cluster0.nbom1sb.mongodb.net/apartments`;

mongoose.connect(mongoURL);

var conection = mongoose.connection;


conection.on("error", () => {
  console.log("mongo db conection failed");
});

conection.on("connected", () => {
  console.log("Mongo DB Conection successful!!!!!!!!!!!!!!!");
});

module.exports = mongoose;
