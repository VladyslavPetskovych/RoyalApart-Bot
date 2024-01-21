const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.json({ text: "world" }); // Return JSON data for the bot
});

const useRouter = require('./routes/aparts');

app.use('/aparts', useRouter);

app.listen(3000);