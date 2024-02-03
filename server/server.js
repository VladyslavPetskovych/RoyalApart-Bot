const express = require("express");
const app = express();

const dbConfig = require("./db");

app.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ text: " 33 квартири на сьогодні" }); 
});

const useRouter = require("./routes/apart");

app.use("/aparts", useRouter);

app.listen(3000,"0.0.0.0");