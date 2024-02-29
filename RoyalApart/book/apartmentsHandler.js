const bot = require("../bot");

const roomOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "<<<", callback_data: "prev room2" },
        { text: ">>>", callback_data: "next room2" },
      ],
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

async function apartmentsHandler(chatId, rooms) {

  sendRoomDetails(chatId,rooms[0]);
  console.log(rooms);
}

module.exports = apartmentsHandler;
