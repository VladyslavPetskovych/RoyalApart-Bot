const express = require("express");
const router = express.Router();
let Roomsr = require("../models/rooms");

router.get("/", async (req, res) => {
  try {
    let rooms = await Roomsr.find({});
    

    
    return res.json({ data: rooms });
  } catch (error) {
    console.log('AAAAAAAAAA'+error)
  }

});




module.exports = router;
// router.get("/:id", (req, res) => {
//   res.send(`Get aparts with ID ${req.params.id}`);
// });