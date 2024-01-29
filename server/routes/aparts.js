const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ text: "world" });
});

router.post("/", (req,res)=>{
  res.send('Create user')
})

router.get('/:id')

module.exports = router;