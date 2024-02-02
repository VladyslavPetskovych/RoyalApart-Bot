const express = require("express");
const app = express();

const dbConfig = require("./db");

app.get("/", (req, res) => {
  res.json({ text: " 33 квартири на сьогодні" }); 
});

const useRouter = require("./routes/apart");

app.use("/aparts", useRouter);

const server = app.listen(3000, function (err) {
  if (err) {
    console.error("Error starting the server:", err);
    return;
  }

  const address = server.address();
  const host = address.address === "::" ? "localhost" : address.address;
  const port = address.port;

  console.log(`Node.js server running at http://${host}:${port}`);
});