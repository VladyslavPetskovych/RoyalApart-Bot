const bot = require("./bot");
const axios = require("axios");
const formModule = require("./form");

let currentRoomIndex = 0;
let roomData = [];
let msgId;
let currentRoom;

const roomOptions2 = {
  inline_keyboard: [
    [
      { text: "1-кімнатні", callback_data: "room1" },
      { text: "2-кімнатні", callback_data: "room2" },
      { text: "3-кімнатні", callback_data: "room3" },
    ],
    [
      { text: "для романтичного відпочинку", callback_data: "romantic" },
      { text: "для сімейного відпочинку", callback_data: "family" },
      { text: "для бізнес подорожей", callback_data: "busines" },
    ],
  ],
};

const roomOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "<<<", callback_data: "prev room" },
        { text: ">>>", callback_data: "next room" },
      ],
      ...roomOptions2.inline_keyboard,
      [{ text: "Заповнити форму", callback_data: "send form" }],
      [{ text: "🔙 Назад ●", callback_data: "back_to_menu" }],
    ],
  }),
};

const sendRoomDetails = async (chatId, room, updatedRoomOptions = null) => {
  const imageUrl = room.imgurl[0];
  const roomName = room.name;
  const roomDescription = room.description;

  try {
    const replyMarkup = updatedRoomOptions
      ? updatedRoomOptions.reply_markup
      : roomOptions.reply_markup;

    const sentMessage = await bot.sendPhoto(
      chatId,
      `../server/imgs/${imageUrl}`,
      {
        caption: `Адреса: ${roomName}\n\n${roomDescription}`,
        reply_markup: replyMarkup,
      }
    );

    return sentMessage;
  } catch (error) {
    console.error("Error sending room details:", error.message);
    return null;
  }
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
    const sentMessage = await sendRoomDetails(chatId, currentRoom);
    msgId = sentMessage.message_id;
  }
};

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  msgId = msg.message_id + 1;
  if (text === "/apartments" || text === "Show Apartments") {
    console.log("/apartments clicked" + currentRoom);
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
      const sentMessage = await sendRoomDetails(chatId, updatedRoom);
      msgId = sentMessage.message_id;
    }
    console.log("room is already sent", msgId);
    bot.deleteMessage(chatId, msgId - 1);
    await bot.answerCallbackQuery({ callback_query_id: callbackQuery.id });
  }

  if (data === "send form") {
    await bot.deleteMessage(chatId, msgId);
    await bot.sendPhoto(chatId, `../server/imgs/${currentRoom.imgurl[0]}`, {
      caption: `Ви обрали квартиру за адресою: ${currentRoom.name}\n`,
    });
    await formModule(chatId);
  }

  if (data === "room1" || data === "room2" || data === "room3") {
    const roomsToCheck = ["room1", "room2", "room3"];

    if (roomsToCheck.includes(data)) {
      for (const row of roomOptions2.inline_keyboard) {
        for (const button of row) {
          if (button.callback_data === data) {
            button.text = button.text.endsWith("✅")
              ? button.text.slice(0, -1)
              : button.text + "✅";
          }
        }
      }
    }

    const updatedRoomOptions = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "<<<", callback_data: "prev room" },
            { text: ">>>", callback_data: "next room" },
          ],
          ...roomOptions2.inline_keyboard,
          [{ text: "Заповнити форму", callback_data: "send form" }],
          [{ text: "🔙 Назад ●", callback_data: "back_to_menu" }],
        ],
      }),
    };

    console.log(roomOptions2.inline_keyboard);
    currentRoom = roomData[currentRoomIndex];
    const updatedRoom = roomData[currentRoomIndex];
    if (updatedRoom) {
      const sentMessage = await sendRoomDetails(
        chatId,
        updatedRoom,
        updatedRoomOptions
      );
      msgId = sentMessage.message_id;
    }
    console.log("room is already sent", msgId);
    await bot.deleteMessage(chatId, msgId - 1);
  }
});

module.exports = showApartments;
