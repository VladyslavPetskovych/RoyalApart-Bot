const express = require("express");
const router = express.Router();
const advertModel = require("../models/adverts");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../advertImgs"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/save", upload.single("image"), async (req, res) => {
  try {
    const { msg } = req.body;
    let imgurl = "";

    // Check if there is a file uploaded
    if (req.file) {
      // Store only the filename without the path
      imgurl = req.file.filename;

      // Find and delete previous image if it exists
      const prevAdvert = await advertModel.findOne({});
      if (prevAdvert && prevAdvert.imgurl) {
        fs.unlinkSync(path.join(__dirname, "../advertImgs", prevAdvert.imgurl)); // Delete previous image file
        await advertModel.deleteOne({ _id: prevAdvert._id }); // Delete previous document from database
      }
    }

    // Create new document with current data
    const newAdvert = new advertModel({
      msg: msg,
      imgurl: imgurl,
    });

    // Save the new document to the database
    const savedAdvert = await newAdvert.save();

    res
      .status(201)
      .json({ message: "Data saved successfully", data: savedAdvert });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const axios = require('axios');

router.post("/sendData", upload.single("image"), async (req, res) => {
    try {
      // Retrieve data from the database
      const advert = await advertModel.findOne().sort({ createdAt: -1 }); // Get the latest advert
      if (!advert) {
        return res.status(404).json({ error: "No advert found" });
      }
  
      // Extract msg and imgurl from the retrieved advert
      const { msg, imgurl } = advert;
  
      // Fetch the image data using the URL
      const imageResponse = await axios.get(`http://localhost:3000/advertImgs/${imgurl}`, { responseType: 'arraybuffer' });
  
      // Convert image data to Base64 string
      const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');
  
      // Send the extracted data as a response
      res.status(200).json({ msg, imgData: base64Image });
    } catch (error) {
      console.error("Error sending data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


module.exports = router;
