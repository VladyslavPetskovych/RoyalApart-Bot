const express = require("express");
const router = express.Router();

router.use(express.json);

router.post('/',(req,res)=>{
    console.log("fdfsdfsdfs");
    res.send(req.body)
})

module.exports = router;