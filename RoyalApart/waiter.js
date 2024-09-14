const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");
const bot = require("./bot");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use("/tempImg", express.static("tempImg"));

app.get("/getData", async function (req, res) {
  try {
    console.log("Request received at /getData");


    const response = await axios.post("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/advert/sendData");

    const imageData = Buffer.from(response.data.imgData, "base64");

 
    const tempImagePath = path.join(__dirname, "tempImg", "tempImage.jpg");

    fs.writeFileSync(tempImagePath, imageData);


    // Fetch chat IDs from the server
    console.log("Making GET request to /getAllUsers/AllUsers");
    const chatIdsResponse = await axios.get("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/getAllUsers/AllUsers");
    console.log("Received response from /getAllUsers/AllUsers:", chatIdsResponse.data);

    const chatIds = chatIdsResponse.data.userIds;
    console.log("Chat IDs received:", chatIds);

  //   await bot.sendPhoto(938729564, tempImagePath, {
  //       caption: ` ${response.data.msg}`,
  //  });
  const caption = ` ${response.data.msg}`;
   //Send photo to each chat ID
   for (let i = 0; i < chatIds.length; i++) {
    const chatId = chatIds[i];

    // Delay in milliseconds (e.g., 1000 ms = 1 second)
    const delay = 500; // Adjust the delay as needed

    // Use setTimeout to introduce a delay
    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      console.log(`Sending photo to chat ID: ${chatId}`);
      await bot.sendPhoto(chatId, tempImagePath, { caption });
      console.log(`Message sent successfully to chat ID: ${chatId}`);
    } catch (error) {
      console.error(`Error sending message to chat ID ${chatId}:`, error);
    }
  }

    res.status(200).send("Message sent");
  } catch (error) {
    console.error("Error receiving data:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(3001, () => {
  console.log('Express server running on port 3001');
});
