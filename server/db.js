const mongoose = require("mongoose");
require("dotenv").config();

const mongopass = process.env.MONGOPASS;

// Використовуємо змінну середовища для підключення до MongoDB
const mongoURL = `mongodb+srv://andriyyavir7:${mongopass}@cluster0.nbom1sb.mongodb.net/apartments`;

mongoose.connect(mongoURL);

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB connection failed");
});

connection.on("connected", () => {
  console.log("MongoDB connection successful!!!!!!!!!!!!!!!");
});

module.exports = mongoose;
