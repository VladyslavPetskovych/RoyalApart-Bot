const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const router = express.Router();
router.use(express.json());

router.post("/login", (req, res) => {
  const { login, password } = req.body;
  console.log(login);
  console.log(password);
  const envLogin = process.env.LGTOKEN;
  const envPassword = process.env.PSTOKEN;
 

  if (login === envLogin && password === envPassword) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
