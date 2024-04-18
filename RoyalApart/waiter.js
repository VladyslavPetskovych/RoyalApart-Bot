const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");
const bot = require("./bot");
const path = require("path");
const cors = require("cors");
app.use(cors());
app.use("/tempImg", express.static("tempImg"));

app.get("/s2", async function (req, res) {
  try {
    // Make a request to Server A to fetch data including the image as a Base64 string
    const response = await axios.post("http://localhost:3000/advert/sendData");

    // Convert the Base64 string back to binary image data
    const imageData = Buffer.from(response.data.imgData, "base64");

    // Save the binary image data as an image file in the tempImg folder
    const tempImagePath = path.join(__dirname, "tempImg", "tempImage.jpg");
    fs.writeFileSync(tempImagePath, imageData);

    // const chatIds = await axios.get("http://localhost:3000/getAllUsers/AllUsers");
    // console.log(chatIds);
    // await bot.sendPhoto(938729564, `./tempImg/tempImage.jpg`, {
    //   caption: ` ${response.data.msg}`,
    // });

    const chatIdsResponse = await axios.get(
      "http://localhost:3000/getAllUsers/AllUsers"
    );
    const chatIds = chatIdsResponse.data.userIds;
    console.log(chatIds.data);
    await bot.sendPhoto(938729564, `./tempImg/tempImage.jpg`, {
        caption: ` ${response.data.msg}`,
      });
    // for (const chatId of chatIds) {
    //     try {
    //         await bot.sendPhoto(chatId, `./tempImg/tempImage.jpg`, {
    //           caption: ` ${response.data.msg}`,
    //         });
    //         console.log(`Message sent successfully to chat ID: ${chatId}`);
    //       } catch (error) {
    //         console.error(`Error sending message to chat ID ${chatId}:`, error);
    //         // Continue to the next chat ID if there's an error
    //         continue;
    //       }
    // }

    res.status(200).send("Message sent");
  } catch (error) {
    console.error("Error receiving data:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(3001);
