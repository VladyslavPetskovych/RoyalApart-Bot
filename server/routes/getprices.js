const express = require("express");
const router = express.Router();
const axios = require('axios');
const Roomsrr = require("../models/rooms");

router.get("/", async (req, res) => {
  try {
    const apiUrl = 'https://kapi.wubook.net/kp/property/fetch_products';
    const apiKey = 'wb_5dc6d45a-5f50-11ec-acc7-001a4a908fff'; // Replace with your actual API key

    // Make a POST request to the specified API with the x-api-key header
    const response = await axios.post(apiUrl, {}, {
      headers: {
        'x-api-key': apiKey,
      },
    });

    // Extract the data from the response
    const responseData = response.data.data;

    // Iterate through the responseData and process each room object
    for (const room of responseData) {
      try {
        // Update the existing document in MongoDB using wubid
        const updateResult = await Roomsrr.updateOne(
          { wubid: room.id_zak_room_type },
          {
            $set: {
              globalId: room.id, // Assuming "id" from the API is the globalId
              // ... other fields ...
            }
          }
        );

        if (updateResult.nModified > 0) {
          console.log('Updated globalId in MongoDB:', updateResult);
        } else {
          console.log('Document not found for wubid:', room.id_zak_room_type);
        }
      } catch (error) {
        console.error('Error updating MongoDB:', error.message);
      }
    }

    // Send the modified responseData to the client
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching prices:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/setPrice", async (req, res) => {
  try {
    const apiUrl = 'https://kapi.wubook.net/kp/inventory/fetch_rate_values';
    const apiKey = 'wb_5dc6d45a-5f50-11ec-acc7-001a4a908fff'; // Replace with your actual API key
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    // Make a POST request to the specified API with the x-api-key header
    const response = await axios.post(apiUrl, null, {
      params: {
        from: formattedDate,
        rate: 31732,
        n: 1,
      },
      headers: {
        'x-api-key': apiKey,
      },
    });

    // Extract the data from the response
    const responseData = response.data.data;

    // Iterate through the response data and update Roomsrr model
    for (const roomId in responseData) {
      const priceData = responseData[roomId][0];
      const updatedRoom = await Roomsrr.findOneAndUpdate(
        { globalId: parseInt(roomId) },
        { $set: { price: priceData.p } },
        { new: true }
      );

      if (updatedRoom) {
        console.log(`Updated price for room with globalId ${roomId} to ${priceData.p}`);
      } else {
        console.log(`Room with globalId ${roomId} not found in MongoDB`);
      }
    }

    // Send the response to the client
    res.json(responseData);
  } catch (error) {
    console.error('Error setting price:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
