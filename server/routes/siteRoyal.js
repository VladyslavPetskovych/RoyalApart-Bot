const express = require("express");
const router = express.Router();
let Roomsr = require("../models/rooms");
router.use(express.json());
const axios = require("axios");
const mongoose = require("mongoose");

async function copyData() {
    try {
      // Ensure that the MongoDB connection is established
      if (mongoose.connection.readyState !== 1) {
        console.log("MongoDB connection is not established.");
        return;
      }
  
      // Find all documents from the existing collection
      const rooms = await Roomsr.find();
  
      // Define a new model with the same schema for the copy
      const NewRoomsr = mongoose.model("aparts_copy", Roomsr.schema);
  
      // Iterate over the documents and save each one to the new collection
      for (const room of rooms) {
        // Create a new instance of the document to avoid VersionError
        const newRoom = new NewRoomsr(room.toObject());
        await newRoom.save();
      }
  
      console.log("Data copied successfully!");
    } catch (error) {
      console.error("Error copying data:", error);
    }
  }
  

// Route to trigger the copy process
router.get("/copy-db", async (req, res) => {
  try {
    // Call the function to copy the data
    await copyData();

    return res.json({
      success: true,
      message: "Database copied successfully!",
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to copy database." });
  }
});

module.exports = router;
