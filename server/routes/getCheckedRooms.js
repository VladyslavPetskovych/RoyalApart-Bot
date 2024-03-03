const express = require("express");
const router = express.Router();
let urModel = require("../models/user");


router.get("/", async (req, res) => {
  try {
    let rooms = await Roomsr.find({});
    

    
    return res.json({ data: rooms });
  } catch (error) {
    console.log('AAAAAAAAAA'+error)
  }

});