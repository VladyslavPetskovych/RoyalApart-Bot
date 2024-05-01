const express = require("express");
const router = express.Router();
const Room = require("../models/rooms");
const mongoose = require("../db");
const fs = require("fs");
const path = require("path");

router.use(express.json());

const connection = mongoose.connection;
async function createRoomFoldersAndCopyImages(rooms) {
    try {
      const imgsRoyalDir = path.join(__dirname, "../imgsRoyal");
      if (!fs.existsSync(imgsRoyalDir)) {
        fs.mkdirSync(imgsRoyalDir, { recursive: true });
      }
  
      console.log("Rooms:", rooms); // Log the contents of the rooms array
  
      for (const room of rooms) {
        console.log("Room:", room); // Log the current room object
        const roomDir = path.join(imgsRoyalDir, room.wubid.toString()); // Ensure room.wubid is a string
        if (!fs.existsSync(roomDir)) {
          fs.mkdirSync(roomDir, { recursive: true });
        }
  
        const imgFilename = Array.isArray(room.imgurl)
          ? room.imgurl[0]
          : room.imgurl; // Accessing the image filename correctly
        const imgPath = path.join(__dirname, "../imgs/", imgFilename); // Constructing the full path to the image
  
        if (fs.existsSync(imgPath)) {
          const imgDest = path.join(roomDir, imgFilename); // Constructing the destination path correctly
          fs.copyFileSync(imgPath, imgDest);
          console.log(`Copied ${imgFilename} to ${room.wubid} folder.`);
        } else {
          console.warn(
            `Image file ${imgFilename} not found for room ${room.wubid}. Skipping...`
          );
        }
      }
  
      console.log("Folders and images copied successfully!");
    } catch (error) {
      console.error("Error creating folders and copying images:", error);
      throw error;
    }
  }
  
  
  async function updateImgUrlsInCopyAparts() {
    try {
      const imgsRoyalDir = path.join(__dirname, "../imgsRoyal");
  
      // Read the names of folders in imgsRoyal
      const roomFolders = fs
        .readdirSync(imgsRoyalDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
  
      // Get the connection to the 'apartments' database
      const db = connection.useDb("apartments");
      const newCollection = db.collection("copy_aparts");
  
      for (const folderName of roomFolders) {
        const imgNames = fs.readdirSync(path.join(imgsRoyalDir, folderName));
  
        // Update the corresponding document in the 'copy_aparts' collection
        // Use the room ID instead of the name to identify the document
        await newCollection.updateOne(
          { wubid: parseInt(folderName) }, // Assuming folderName is the room ID
          { $set: { imgurl: imgNames } }
        );
  
        console.log(`Updated imgurl for room '${folderName}'`);
      }
  
      console.log("Imgurls updated successfully!");
    } catch (error) {
      console.error("Error updating imgurls:", error);
      throw error;
    }
  }
  

async function copyData() {
  try {
    const rooms = await Room.find().lean();

    const roomsWithoutIds = rooms.map((room) => {
      const { _id, ...rest } = room;
      return rest;
    });
    const db = connection.useDb("apartments");

    const newCollection = db.collection("copy_aparts");

    for (const room of roomsWithoutIds) {
      const existingRoom = await newCollection.findOne({ name: room.name });
      if (!existingRoom) {
        await newCollection.insertOne(room);
        console.log(`Room '${room.name}' copied successfully!`);
      } else {
        console.log(
          `Room '${room.name}' already exists in the new collection. Skipping...`
        );
      }
    }

    await createRoomFoldersAndCopyImages(roomsWithoutIds);
    await updateImgUrlsInCopyAparts();
    console.log("Data copied successfully!");

    return "Data copied successfully!";
  } catch (error) {
    console.error("Error copying data:", error);
    throw error;
  }
}


router.get("/copy-db", async (req, res) => {
  try {
    const copiedData = await copyData();
    return res.json({
      success: true,
      message: "Database copied successfully!",
      data: copiedData,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to copy database.",
    });
  }
});
router.get("/copied-rooms", async (req, res) => {
  try {
    const db = mongoose.connection.useDb("apartments");

    const copiedRooms = await db.collection("copy_aparts").find({}).toArray();

    return res.json({
      data: copiedRooms,
    });
  } catch (error) {
    console.error("Error fetching copied rooms:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch copied rooms",
      error: error.message,
    });
  }
});

module.exports = router;
