const bot = require("./bot");
const { handleDateSelection, getCheckInDate, getCheckOutDate } = require("./bookdates");
const start = require('./genaral')
const qOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Заїзд", callback_data: "Check in" },
        { text: "Виїзд", callback_data: "Check out" },
      ],[{ text: "Надіслати запит", callback_data: "send dates"}],
      [{ text: " 🔙 Назад ●", callback_data: "back_to_menu" }],
    ],
  }),
};

let userState = {};

function sendBookingInstructions(
  chatId,
  checkInText = "❌",
  checkOutText = "❌"
) {
  bot.sendMessage(
    chatId,
    `Вкажіть дати бронювання: \n${checkInText} - дата заїзду. \n${checkOutText}- дата виїзду.`,
    qOptions
  );
}

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text === "/book") {
    return sendBookingInstructions(chatId);
  }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  await bot.answerCallbackQuery({callback_query_id: msg.id, cache_time: 10});

  if (data === "Check in" || data === "Check out") {
    userState[chatId] = data;
    handleDateSelection(chatId, userState[chatId]);
  } else if (data === "back") {
    let chkin = getCheckInDate();
    let chkout = getCheckOutDate(); 
    sendBookingInstructions(chatId, chkin, chkout);
  } else if (data === "back_to_menu") {
   start(chatId);
  }
});
