const express = require("express");
const router = express.Router();
const urModel = require("../models/users");
const nodemailer = require("nodemailer");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const user = req.body;

    // Find the user by chatId
    const existingUser = await urModel.findOne({ chatId: user.chatId });

    if (existingUser) {
      // User exists, update the entire user document
      try {
        const updatedUser = await urModel.findOneAndUpdate(
          { chatId: user.chatId },
          user,
          { new: true, upsert: true }
        );

        res.status(200).json(updatedUser);
      } catch (updateError) {
        console.error("Error updating user:", updateError);
        res.status(500).json({ err: "Could not update user" });
      }
    } else {
      // User does not exist, create a new user
      try {
        const newUser = await urModel.create(user);
        res.status(201).json(newUser);
      } catch (createError) {
        console.error("Error creating new user:", createError);
        res.status(500).json({ err: "Could not create a new user" });
      }
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
});
router.get("/:chatId", (req, res) => {
  const chatId = req.params.chatId;

  // Find the user by chatId
  urModel
    .findOne({ chatId: chatId })
    .then((user) => {
      if (user) {
        res.status(200).json({
          chatId: user.chatId,
          checkedRooms: user.checkedRooms,
          insexr: user.insexr,
          roomsid: user.roomsid,
          markup: user.markup,
          chkin: user.chkin,
          chkout: user.chkout,
          lastMessage: user.lastMessage,
          name: user.name,
          phone: user.phone,
          currentroom: user.currentroom,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: "Internal server error" });
    });
});
router.post("/updateLastMessage/:chatId", async (req, res) => {
  try {
    const user = req.body;

    // Find the user by chatId
    const existingUser = await urModel.findOne({ chatId: user.chatId });

    if (existingUser) {
      // User exists, update the lastMessage field
      try {
        existingUser.lastMessage = user.message;
        existingUser.lastMessageTimestamp = Date.now();
        await existingUser.save();

        res.status(200).json(existingUser);
      } catch (updateError) {
        console.error("Error updating user:", updateError);
        res.status(500).json({ err: "Could not update user" });
      }
    } else {
      // User does not exist, create a new user
      try {
        const newUser = await urModel.create({
          chatId: user.chatId,
          checkedRooms: [], // Provide the required fields
          lastMessage: user.message,
          lastMessageTimestamp: Date.now(),
        });

        res.status(201).json(newUser);
      } catch (createError) {
        console.error("Error creating new user:", createError);
        res.status(500).json({ err: "Could not create a new user" });
      }
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
});
router.get("/getLastMessageId/:chatId", async (req, res) => {
  try {
    const chatId = req.params.chatId;

    // Find the user by chatId
    const existingUser = await urModel.findOne({ chatId });

    if (existingUser) {
      // Return the lastMessage ID if user exists
      const lastMessageId = existingUser.lastMessage;
      res.status(200).json({ lastMessageId });
    } else {
      // User not found
      res.status(404).json({ err: "User not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = router;
