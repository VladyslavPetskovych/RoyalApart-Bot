const bot = require("../bot");
const axios = require("axios");

const roomOptions2 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1-кімнатні", callback_data: "room1" },
        { text: "2-кімнатні", callback_data: "room2" },
        { text: "3-кімнатні", callback_data: "room3" },
      ],
      [{ text: "💖для романтичного відпочинку", callback_data: "romantic" }],
      [{ text: "👪для сімейного відпочинку", callback_data: "family" }],
      [{ text: "💼для бізнес подорожей", callback_data: "business" }],
    ],
  }),
};

const filterModule = async (chatId, msgId) => {
  const userData = {};

  const toggleCheck = (chatId, data) => {
    if (!userData[chatId]) {
      userData[chatId] = {};
    }

    // Toggle the check state
    userData[chatId][data] = !userData[chatId][data];
    return userData[chatId][data];
  };

  const msg = await bot.sendMessage(chatId, "Оберіть категорію .", {
    reply_markup: roomOptions2.reply_markup,
  });

  const msgIdOfReply = msg.message_id;

  bot.on("callback_query", async (callbackQuery) => {
    const data = callbackQuery.data;

    try {
      const parsedMarkup = JSON.parse(roomOptions2.reply_markup);

      const isValidData = parsedMarkup.inline_keyboard
        .flatMap((row) => row.map((button) => button.callback_data))
        .includes(data);

      if (isValidData) {
        const wasChecked = toggleCheck(chatId, data);

        const updatedMarkup = parsedMarkup.inline_keyboard.map((row) =>
          row.map((button) => ({
            ...button,
            text:
              userData[chatId] && userData[chatId][button.callback_data]
                ? `${button.text}✅`
                : button.text.replace(/✅$/, ''), // Remove check emoji if present
          }))
        );

        // Edit the message with the updated markup
        await bot.editMessageText("Оберіть категорію .", {
          chat_id: chatId,
          message_id: msgId,
          reply_markup: JSON.stringify({ inline_keyboard: updatedMarkup }),
        });

        // Use Axios to make a POST request to store the checkedRooms object
        const checkedRoomsData = {
          chatId: chatId,
          checkedRooms: userData[chatId] || {},
          markup: JSON.stringify({ inline_keyboard: updatedMarkup }),
        };

        await axios.post("http://localhost:3000/users", checkedRoomsData);
      }
    } catch (error) {
      console.error("Error parsing markup:", error);
    }
  });
};
const generateMarkupFromData = (storedData) => {
  return [
    [
      { text: "1-кімнатні", callback_data: "room1", checked: storedData["room1"] },
      { text: "2-кімнатні", callback_data: "room2", checked: storedData["room2"] },
      { text: "3-кімнатні", callback_data: "room3", checked: storedData["room3"] },
    ],
    [
      { text: "💖для романтичного відпочинку", callback_data: "romantic", checked: storedData["romantic"] },
    ],
    [
      { text: "👪для сімейного відпочинку", callback_data: "family", checked: storedData["family"] },
    ],
    [
      { text: "💼для бізнес подорожей", callback_data: "business", checked: storedData["business"] },
    ],
  ].map(row => row.map(button => ({
    ...button,
    text: `${button.text}${button.checked ? "✅" : ""}`, // Add check emoji if button is checked
  })));
};
module.exports = {
  filterModule,
  roomOptions2,
};