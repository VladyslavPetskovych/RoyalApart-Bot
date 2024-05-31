const bot = require("../bot");
const axios = require("axios");
const moment = require("moment");
const { filterModule } = require("../apartments/filterRooms");
const checkFilter = require("./checkFilter");
const { showApartments } = require("../apartments/apartments");
const {
  handleDateSelection,
  getCheckInDate,
  getCheckOutDate,
  UserDatas,
} = require("./bookdates");
const start = require("../genaral");

const qOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Заїзд", callback_data: "Check in" },
        { text: "Виїзд", callback_data: "Check out" },
      ],
      [{ text: "Показати вільні апартаменти", callback_data: "send dates" }],
      [{ text: " 🔙 Далі ●", callback_data: "back_to_menu" }],
    ],
  }),
};

let userState = {};

function sendBookingInstructions(
  chatId,
  checkInText = "❌",
  checkOutText = "❌"
) {
  console.log("---------sendBookingInstructions--------------");
  console.log(checkOutText);
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
    let context = "b";
    await axios.post(`http://localhost:3000/users/updateContext/${chatId}`, {
      context,
    });
    return sendBookingInstructions(chatId);
  }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  const msgId = msg.message.id;
  await bot.answerCallbackQuery({ callback_query_id: msg.id, cache_time: 1 });

  if (data === "send dates") {
    console.log("send dates");

    let chkin = UserDatas[chatId].checkInDate;
    let chkout = UserDatas[chatId].checkOutDate;
    console.log("---------send dates--------------");
    console.log(chkout);
    if (!chkin || !chkout) {
      await bot.sendMessage(
        chatId,
        "❌ПОМИЛКА! ОБЕРІТЬ ПРАВИЛЬНІ ДАТИ ПРОЖИВАННЯ!⚠️"
      );
      return sendBookingInstructions(chatId);
    }

    let chkinString = chkin.replace("✅ ", "");
    let chkoutString = chkout.replace("✅ ", "");
    console.log("---------✅--------------");
    console.log(chkoutString);

    let chkinDate = moment(chkinString, "DD.MM.YYYY").toDate();
    let chkoutDate = moment(chkoutString, "DD.MM.YYYY").toDate();
    console.log("---------moment--------------");
    console.log(chkoutDate);

    if (chkinDate < chkoutDate) {
      const apiUrl = "http://localhost:3000/freeRooms";
      let chkinDate2 = moment(chkinString, "DD.MM.YYYY").format("DD/MM/YYYY");
      let chkoutDate2 = moment(chkoutString, "DD.MM.YYYY").format("DD/MM/YYYY");
      const postData = {
        dfrom: chkinDate2,
        dto: chkoutDate2,
      };

      axios
        .post(apiUrl, postData)
        .then((response) => {
          const availableRoomsCount = response.data.data.length;
          let rooms = response.data.data;
          bot.sendMessage(
            chatId,
            `Усі квартири. Доступно ${availableRoomsCount} кімнат.`
          );
          console.log("Available rooms:", rooms);
          checkFilter(chatId, msgId, rooms);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
      const data = { chatId: chatId, chkin: chkinString, chkout: chkoutString };
      await axios.post("http://localhost:3000/users", data);
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
    let chkin = UserDatas[chatId].checkInDate;
    let chkout = UserDatas[chatId].checkOutDate;
    console.log("---------back button--------------");
    console.log(chkout);
    sendBookingInstructions(chatId, chkin, chkout);
  } else if (data === "back_to_menu") {
    start(chatId);
  }
});
