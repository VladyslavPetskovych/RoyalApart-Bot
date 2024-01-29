const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.json({ text: " 33 квартири на сьогодні" }); // Return JSON data for the bot
});

const useRouter = require("./routes/aparts");

app.use("/aparts", useRouter);

app.listen(3000);
