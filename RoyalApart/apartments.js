const bot = require("./bot");
const axios = require("axios");

// Assuming the room data is stored globally for simplicity
let currentRoomIndex = 0;
let roomData = [];

const roomOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "<<", callback_data: "prev room" },
        { text: ">>", callback_data: "next room" },
      ],
      [{ text: "🔙 Назад ●", callback_data: "back" }],
    ],
  }),
};

// Function to send room details
const sendRoomDetails = async (chatId, room) => {
  const imageUrl = room.imgurl[0];
  const roomName = room.name;
  const roomDescription = room.description;

  // Send the photo with caption
  await bot.sendPhoto(chatId, `../server/imgs/${imageUrl}`, {
    caption: `Адреса: ${roomName}\n\n${roomDescription}`,
    reply_markup: roomOptions.reply_markup,
  });
};

// Message handling
bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/apartments") {
    const apiUrl = "http://localhost:3000/aparts";

    try {
      const response = await axios.get(apiUrl);
      roomData = response.data.data;

      // Send details for the current room
      const currentRoom = roomData[currentRoomIndex];
      if (currentRoom) {
        await sendRoomDetails(chatId, currentRoom);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }
});

// Callback query handling
bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  if (data === "prev room") {
    currentRoomIndex = (currentRoomIndex - 1 + roomData.length) % roomData.length;
  } else if (data === "next room") {
    currentRoomIndex = (currentRoomIndex + 1) % roomData.length;
  }

  // Send details for the updated room
  const updatedRoom = roomData[currentRoomIndex];
  if (updatedRoom) {
    await sendRoomDetails(chatId, updatedRoom);
  }

  // Assuming you want to answer the callback query
  await bot.answerCallbackQuery({ callback_query_id: callbackQuery.id });
});
