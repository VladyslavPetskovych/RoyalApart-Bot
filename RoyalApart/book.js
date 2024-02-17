const bot = require("./bot");
const moment = require("moment");
const {
  handleDateSelection,
  getCheckInDate,
  getCheckOutDate,
} = require("./bookdates");
const start = require("./genaral");
const showApartments = require("./apartments/apartments");
const qOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Заїзд", callback_data: "Check in" },
        { text: "Виїзд", callback_data: "Check out" },
      ],
      [{ text: "Показати вільні апартаменти", callback_data: "send dates" }],
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
    `Як забронювати?\n1. Оберіть дати\n2. Вкажіть апартеманти \n3. Заповніть форму \nМенеджер зв'яжеться з Вами і розкаже подальші кроки\n\n Вкажіть дати бронювання: \n${checkInText} - дата заїзду. \n${checkOutText} - дата виїзду.`,
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
  await bot.answerCallbackQuery({ callback_query_id: msg.id, cache_time: 1 });

  if (data === "send dates") {
    console.log("send dates");
    let chkin = getCheckInDate();
    let chkout = getCheckOutDate();
    console.log(chkin + "!!!!!!");
    let chkinString = chkin.replace("✅ ", "");
    let chkoutString = chkout.replace("✅ ", "");
    let chkinDate = moment(chkinString, "DD.MM.YYYY").toDate();
    let chkoutDate = moment(chkoutString, "DD.MM.YYYY").toDate();

    if (chkinDate < chkoutDate) {
      await showApartments(chatId);
    } else {
      await bot.sendMessage(
        chatId,
        "❌ПОМИЛКА! ОБЕРІТЬ ПРАВИЛЬНІ ДАТИ ПРОЖИВАННЯ!⚠️"
      );
      await sendBookingInstructions(chatId);
    }
  }
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
