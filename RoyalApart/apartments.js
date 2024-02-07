const bot = require("./bot");
const axios = require("axios");
const formModule = require("./form");

let currentRoomIndex = 0;
let roomData = [];
let msgId;
let currentRoom;

const roomOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "<<<", callback_data: "prev room" },
        { text: ">>>", callback_data: "next room" },
      ],
      [{ text: "Заповнити форму", callback_data: "send form" }],
      [{ text: "🔙 Назад ●", callback_data: "back_to_menu" }],
    ],
  }),
};

const sendRoomDetails = async (chatId, room) => {
  const imageUrl = room.imgurl[0];
  const roomName = room.name;
  const roomDescription = room.description;

  await bot.sendPhoto(chatId, `../server/imgs/${imageUrl}`, {
    caption: `Адреса: ${roomName}\n\n${roomDescription}`,
    reply_markup: roomOptions.reply_markup,
  });
};

const fetchRoomData = async () => {
  const apiUrl = "http://localhost:3000/aparts";
  try {
    const response = await axios.get(apiUrl);
    roomData = response.data.data;
    currentRoom = roomData[currentRoomIndex];
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const showApartments = async (chatId) => {
  await fetchRoomData();
  currentRoom = roomData[currentRoomIndex];
  if (currentRoom) {
    await sendRoomDetails(chatId, currentRoom);
  }
};

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  msgId = msg.message_id + 1;
  if (text === "/apartments" || text === "Show Apartments") {
    console.log("/apartments clicked"+currentRoom)
    await showApartments(chatId);
  }
});

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === "prev room" || data === "next room") {
    currentRoomIndex =
      (currentRoomIndex + (data === "prev room" ? -1 : 1) + roomData.length) %
      roomData.length;

    currentRoom = roomData[currentRoomIndex];
    const updatedRoom = roomData[currentRoomIndex];
    if (updatedRoom) {
      await sendRoomDetails(chatId, updatedRoom);
    }
    console.log("room is already send", msgId);
    bot.deleteMessage(chatId, msgId);
    msgId = msgId + 1;
    await bot.answerCallbackQuery({ callback_query_id: callbackQuery.id });
  }
  if (data === "send form") {
    await bot.deleteMessage(chatId, msgId);
    await bot.sendPhoto(chatId, `../server/imgs/${currentRoom.imgurl[0]}`, {
      caption: `Ви обрали квартиру за адресою: ${currentRoom.name}\n`,
    });
    await formModule(chatId);
  }
});

module.exports = showApartments;
