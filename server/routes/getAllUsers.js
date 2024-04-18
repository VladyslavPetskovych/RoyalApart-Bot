const express = require("express");
const router = express.Router();
const urModel = require("../models/users");
const nodemailer = require("nodemailer");

router.use(express.json());

router.get('/AllUsers', async (req, res) => {
    try {
  
      const users = await urModel.find({}, 'chatId');
      const userIds = users.map(user => user.chatId);
      res.status(200).json({ userIds });
    } catch (error) {
      console.error('Error fetching user IDs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
module.exports = router;
