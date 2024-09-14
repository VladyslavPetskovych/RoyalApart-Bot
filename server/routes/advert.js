const express = require("express");
const router = express.Router();
const advertModel = require("../models/adverts");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../advertImgs"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Save advertisement
router.post("/save", upload.single("image"), async (req, res) => {
  try {
    const { msg } = req.body;
    let imgurl = "";

    if (req.file) {
      imgurl = req.file.filename;

      // Find and delete previous advert if exists
      const prevAdvert = await advertModel.findOne({});
      if (prevAdvert && prevAdvert.imgurl) {
        // Delete the previous image file
        fs.unlinkSync(path.join(__dirname, "../advertImgs", prevAdvert.imgurl));
        // Delete the previous document from the database
        await advertModel.deleteOne({ _id: prevAdvert._id });
      }
    }

    // Create and save new advert document
    const newAdvert = new advertModel({
      msg: msg,
      imgurl: imgurl,
    });

    const savedAdvert = await newAdvert.save();

    res
      .status(201)
      .json({ message: "Data saved successfully", data: savedAdvert });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Send advertisement data
router.post("/sendData", async (req, res) => {
  try {
    // Retrieve the latest advert
    const advert = await advertModel.findOne().sort({ createdAt: -1 });
    if (!advert) {
      return res.status(404).json({ error: "No advert found" });
    }

    const { msg, imgurl } = advert;

    // Fetch the image data
    const imageResponse = await axios.get(
      `http://localhost:3000/advertImgs/${imgurl}`,
      { responseType: "arraybuffer" }
    );

    // Convert image data to Base64
    const base64Image = Buffer.from(imageResponse.data, "binary").toString(
      "base64"
    );

    // Send the data as a response
    res.status(200).json({ msg, imgData: base64Image });
  } catch (error) {
    console.error("Error sending data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
