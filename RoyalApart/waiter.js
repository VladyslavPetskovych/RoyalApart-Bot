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

    // Make a request to Server A to fetch data including the image as a Base64 string
    console.log("Making POST request to /advert/sendData");
    const response = await axios.post("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/advert/sendData");
    console.log("Received response from /advert/sendData:", response.data);

    // Convert the Base64 string back to binary image data
    console.log("Converting Base64 to binary data");
    const imageData = Buffer.from(response.data.imgData, "base64");

    // Save the binary image data as an image file in the tempImg folder
    const tempImagePath = path.join(__dirname, "tempImg", "tempImage.jpg");
    console.log("Saving image data to:", tempImagePath);
    fs.writeFileSync(tempImagePath, imageData);
    console.log("Image saved successfully");

    // Fetch chat IDs from the server
    console.log("Making GET request to /getAllUsers/AllUsers");
    const chatIdsResponse = await axios.get("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/getAllUsers/AllUsers");
    console.log("Received response from /getAllUsers/AllUsers:", chatIdsResponse.data);

    const chatIds = chatIdsResponse.data.userIds;
    console.log("Chat IDs received:", chatIds);

    await bot.sendPhoto(938729564, tempImagePath, {
        caption: ` ${response.data.msg}`,
   });

    // Send photo to each chat ID
    // for (const chatId of chatIds) {
    //   try {
    //     console.log(`Sending photo to chat ID: ${chatId}`);
    //     await bot.sendPhoto(chatId, tempImagePath, {
    //       caption: ` ${response.data.msg}`,
    //     });
    //     console.log(`Message sent successfully to chat ID: ${chatId}`);
    //   } catch (error) {
    //     console.error(`Error sending message to chat ID ${chatId}:`, error);
    //   }
    // }

    res.status(200).send("Message sent");
  } catch (error) {
    console.error("Error receiving data:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(3001, () => {
  console.log('Express server running on port 3001');
});
