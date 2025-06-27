const express = require("express");
const router = express.Router();
const Room = require("../models/rooms");
const axios = require("axios");

const WodooApart = require("../models/wodooAparts");

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
        await newCollection.updateOne({ name: room.name }, { $set: room });
        console.log(`Room '${room.name}' updated successfully!`);
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

router.get("/copy-to-wodoo", async (req, res) => {
  try {
    const rooms = await Room.find().lean();

    for (const room of rooms) {
      const { _id, ...rest } = room;
      rest.wdid = "0";

      const existing = await WodooApart.findOne({ name: rest.name });

      if (!existing) {
        await WodooApart.create(rest);
        console.log(`➕ Created: ${rest.name}`);
      } else {
        const { wdid, _id, ...fieldsToUpdate } = existing.toObject();

        await WodooApart.updateOne(
          { _id: existing._id },
          { $set: { ...rest, wdid: existing.wdid || "0" } }
        );
        console.log(`♻️ Updated (preserved wdid): ${rest.name}`);
      }
    }

    return res.json({
      success: true,
      message: "Rooms copied to wodoo_aparts with wdid successfully!",
    });
  } catch (err) {
    console.error("Error copying to wodoo_aparts:", err);
    return res.status(500).json({
      success: false,
      message: "Error copying rooms to wodoo_aparts",
    });
  }
});

router.get("/update-wodoo-images", async (req, res) => {
  const results = [];

  try {
    const rooms = await WodooApart.find();

    for (const room of rooms) {
      if (!room.wdid || room.wdid === "0") {
        results.push({
          name: room.name,
          wdid: room.wdid,
          status: "⛔ Пропущено (wdid відсутній або 0)",
        });
        continue;
      }

      const xmlBody = `<?xml version="1.0"?>
<methodCall>
  <methodName>room_images</methodName>
  <params>
    <param><value><string>wr_9fd536d9-2894-441a-85eb-4b1a670e2ff2</string></value></param>
    <param><value><int>1638349860</int></value></param>
    <param><value><int>${room.wdid}</int></value></param>
  </params>
</methodCall>`;

      try {
        const response = await axios.post(
          "https://wired.wubook.net/xrws/",
          xmlBody,
          {
            headers: { "Content-Type": "text/xml" },
          }
        );

        // Витягуємо всі image_link вручну з XML
        const matches = response.data.match(
          /<name>image_link<\/name>\s*<value><string>(.*?)<\/string><\/value>/g
        );

        if (!matches || matches.length === 0) {
          results.push({
            name: room.name,
            wdid: room.wdid,
            status: "❌ Зображення не знайдено у відповіді",
          });
          continue;
        }

        const images = matches
          .map((m) => {
            const match = m.match(/<string>(.*?)<\/string>/);
            return match ? match[1] : null;
          })
          .filter(Boolean);

        const updateResult = await WodooApart.updateOne(
          { _id: room._id },
          { $set: { imgurl: images } }
        );

        results.push({
          name: room.name,
          wdid: room.wdid,
          updated: updateResult.modifiedCount,
          images,
          status: "✅ Оновлено",
        });
      } catch (innerErr) {
        results.push({
          name: room.name,
          wdid: room.wdid,
          status: "⚠️ Помилка при запиті або парсингу",
          error: innerErr.message,
        });
      }
    }

    res.json({
      success: true,
      message: "Спроба оновлення зображень завершена",
      updatedRooms: results,
    });
  } catch (err) {
    console.error("Error in /update-wodoo-images:", err);
    res.status(500).json({
      success: false,
      message: "Помилка при оновленні зображень",
      error: err.message,
    });
  }
});

router.get("/get-all-wodoo", async (req, res) => {
  try {
    const allRooms = await WodooApart.find().lean();
    res.json({
      success: true,
      count: allRooms.length,
      data: allRooms,
    });
  } catch (err) {
    console.error("Error fetching all WodooApart records:", err);
    res.status(500).json({
      success: false,
      message: "Помилка при отриманні даних",
      error: err.message,
    });
  }
});

module.exports = router;
