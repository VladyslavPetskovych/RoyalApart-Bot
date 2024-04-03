const bot = require("../bot");
const axios = require("axios");

const roomOptions = [
  [
    { text: "1-кімнатні", callback_data: "room1" },
    { text: "2-кімнатні", callback_data: "room2" },
    { text: "3-кімнатні", callback_data: "room3" },
  ],
  [{ text: "💖для романтичного відпочинку", callback_data: "romantic" }],
  [{ text: "👪для сімейного відпочинку", callback_data: "family" }],
  [{ text: "💼для бізнес подорожей", callback_data: "business" }],
  [{ text: "ПОКАЗАТИ ЖИТЛО", callback_data: "shw" }],
];

const getUserSelections = async (chatId) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${chatId}`);
    return response.data.checkedRooms || {};
  } catch (error) {
    console.error("Error getting user selections:", error);
    return {};
  }
};

const updateUserSelections = async (chatId, selections, markup) => {
  try {
    const data = { chatId: chatId, checkedRooms: selections, markup: markup };
    console.log(chatId);
    await axios.post("http://localhost:3000/users", data);
  } catch (error) {
    console.error("Error updating user selections:", error);
  }
};

const filterModule = async (chatId) => {
  const userSelections = await getUserSelections(chatId);

  const initialMarkup = {
    inline_keyboard: roomOptions.map((row) =>
      row.map((button) => ({
        ...button,
        text: userSelections[button.callback_data]
          ? `✅ ${button.text}`
          : button.text,
      }))
    ),
  };

  const msg = await bot.sendMessage(chatId, "Оберіть категорію.", {
    reply_markup: JSON.stringify(initialMarkup),
  });

  bot.on("callback_query", async (callbackQuery) => {
    const data = callbackQuery.data;
    const chatId = callbackQuery.message.chat.id;
    const userSelections = await getUserSelections(chatId);
    const wasChecked = userSelections[data];
    userSelections[data] = !wasChecked;
    const updatedMarkup = {
      inline_keyboard: roomOptions.map((row) =>
        row.map((button) => ({
          ...button,
          text: userSelections[button.callback_data]
            ? `✅ ${button.text}`
            : button.text,
        }))
      ),
    };
    const currentMarkupJSON = JSON.stringify(initialMarkup);
    const updatedMarkupJSON = JSON.stringify(updatedMarkup);

    if (
      currentMarkupJSON !== updatedMarkupJSON &&
      (data === "room1" ||
        data === "room2" ||
        data === "room3" ||
        data === "romantic" ||
        data === "family" ||
        data === "business")
    ) {
      try {
        await bot.editMessageText("Оберіть категорію.", {
          chat_id: chatId,
          message_id: msg.message_id,
          reply_markup: JSON.stringify(updatedMarkup),
        });

        console.log(chatId, userSelections, updatedMarkupJSON);
        console.log(`My user selection \n ${userSelections}`);
        await updateUserSelections(chatId, userSelections, updatedMarkupJSON);
      } catch (error) {
        console.error("Error editing message:", error);
      }
    } else {
      console.log(
        "Message content and reply markup are exactly the same. No modifications needed."
      );
    }
  });
};

module.exports = {
  filterModule,
};
