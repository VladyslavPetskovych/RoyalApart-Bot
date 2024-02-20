const express = require("express");
const router = express.Router();
const urModel = require("../models/users");

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
        res
          .status(200)
          .json({
            chatId: user.chatId,
            checkedRooms: user.checkedRooms,
            markup: user.markup,
          });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: "Internal server error" });
    });
});

module.exports = router;
