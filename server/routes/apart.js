const express = require("express");
const router = express.Router();
let Roomsr = require("../models/rooms");
router.use(express.json());
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const axios = require('axios')

router.get("/", async (req, res) => {
  try {
    let rooms = await Roomsr.find({});

    return res.json({ data: rooms });
  } catch (error) {
    console.log("AAAAAAAAAA" + error);
  }
});
router.get("/roomType", async (req, res) => {
  try {
    // Make the Axios request to the external API
    const response = await axios.post(
      "https://kapi.wubook.net/kp/property/fetch_rooms",
      {},
      {
        headers: {
          "x-api-key": "wb_5dc6d45a-5f50-11ec-acc7-001a4a908fff",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }
    );

    // Send the response from the external API to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const roomId = req.params.id;
    console.log(roomId);
    // Find the room by ID
    const room = await Roomsr.findById(roomId);
    console.log(room);
    // If room not found, return 404
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Delete the image file from the imgs folder
    const imagePath = path.join(__dirname, "../imgs", room.imgurl[0]);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete the room from the database
    await Roomsr.findByIdAndDelete(roomId);

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Server error" });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../imgs"));
  },
  filename: function (req, file, cb) {
    const hash = crypto
      .createHash("md5")
      .update(file.originalname)
      .digest("hex");
    cb(null, `${hash}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.put("/:id", upload.single("file"), async (req, res) => {
  const roomId = req.params.id;
  const updatedData = req.body;

  try {
    // Find the room by ID
    const room = await Roomsr.findById(roomId);

    if (!room) {
      // If the room with the given ID is not found, return a 404 error
      return res.status(404).json({ error: "Room not found" });
    }

    if (req.file) {
      // Delete previous file
      const previousFile = room.imgurl[0];
      const previousFilePath = path.join(__dirname, "../imgs", previousFile);
      if (fs.existsSync(previousFilePath)) {
        fs.unlinkSync(previousFilePath);
        console.log(`Previous file ${previousFile} deleted`);
      }

      // Save new file
      const fileName = req.file.filename;
      updatedData.imgurl = [fileName];
      console.log(fileName);
      console.log("Saving file to disk:", req.file);

      // Store the image file in the imgs folder
      const targetPath = path.join(__dirname, "../imgs", fileName);
      fs.renameSync(req.file.path, targetPath);

      console.log("File saved to disk:", targetPath);
    }

    // Update the room data with the new data
    const updatedRoom = await Roomsr.findByIdAndUpdate(roomId, updatedData, {
      new: true,
    });

    // If the room is successfully updated, return the updated room data
    return res.json({
      message: "Room updated successfully",
      data: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room:", error);
    // If an error occurs during the update, return a 500 error
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/newRoom", upload.single("image"), async (req, res) => {
  try {
    // Extract data from the request body
    const {
      address,
      body,
      category,
      roomcount,
      price,
      floor,
      beds,
      guests,
      square,
      wubid,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const newRoom = new Roomsr({
      name: address, // Assuming 'address' as the room name
      numrooms: roomcount,
      description: body,
      category: category,
      price: price,
      imgurl: req.file.filename, // Use the file path provided by multer
      beds: beds,
      guests: guests,
      floor: floor,
      surface: square,
      wubid: wubid,
   
    });

    await newRoom.save();

    res.status(201).json({ message: "Room created successfully" });
  } catch (error) {
    console.error("Error saving room:", error);
    res.status(500).json({ message: "Failed to save room" });
  }
});

module.exports = router;

// router.get("/:id", (req, res) => {
//   res.send(`Get aparts with ID ${req.params.id}`);
// });
