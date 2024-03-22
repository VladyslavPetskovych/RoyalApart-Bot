const express = require("express");
const app = express();
var cors = require("cors");

const dbConfig = require("./db");

app.use(cors());

app.use("/imgs", express.static("imgs"));
app.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json({ text: " 33 квартири на сьогодні" });
});

const apartRouter = require("./routes/apart");
const userRouter = require("./routes/user");
const froomsRouter = require("./routes/freeRooms");
const pricesRouter = require("./routes/getprices");
const emailRouter = require("./routes/email");
const authRouter = require("./routes/auth");

app.use("/aparts", apartRouter);
app.use("/users", userRouter);
app.use("/freeRooms", froomsRouter);
app.use("/getprices", pricesRouter);
app.use("/email", emailRouter);
app.use("/auth", authRouter);

app.listen(3000);
