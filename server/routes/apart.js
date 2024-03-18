const express = require("express");
const router = express.Router();
let Roomsr = require("../models/rooms");
router.use(express.json());
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

router.get("/", async (req, res) => {
  try {
    let rooms = await Roomsr.find({});

    return res.json({ data: rooms });
  } catch (error) {
    console.log("AAAAAAAAAA" + error);
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
const upload = multer({ storage: storage });

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

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Create a new room object with the extracted data and the image file path
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
      // Add other fields as needed
    });

    // Save the new room to the database
    await newRoom.save();

    // Respond with success message
    res.status(201).json({ message: "Room created successfully" });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error("Error saving room:", error);
    res.status(500).json({ message: "Failed to save room" });
  }
});

module.exports = router;

// router.get("/:id", (req, res) => {
//   res.send(`Get aparts with ID ${req.params.id}`);
// });
