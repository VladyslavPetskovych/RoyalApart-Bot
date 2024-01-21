const express = require("express");
const router = express.Router();

router.get("/", (res, req) => {
  res.json({ text: "world" });
});

router.get("/new",(res,req)=>{
    res.send('new aparts');
})

router.post('/', (req,res)=>{
  res.send('show aparts')
})

router.get('/:id',(req,res)=>{
  res.send(`Get aparts with ID ${req.params.id}`)
})

module.exports = router;