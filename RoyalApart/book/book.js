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

function log(message) {
  console.log(new Date().toISOString(), message);
}

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
  log(
    `Sending booking instructions to chatId: ${chatId}, checkInText: ${checkInText}, checkOutText: ${checkOutText}`
  );
  bot.sendMessage(
    chatId,
    `Як забронювати?\n1. Оберіть дати\n2. Вкажіть апартеманти \n3. Заповніть форму \nМенеджер зв'яжеться з Вами і розкаже подальші кроки\n\n Вкажіть дати бронювання: \n${checkInText} - дата заїзду. \n${checkOutText} - дата виїзду.`,
    qOptions
  );
}

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  log(`Received message: ${text} from chatId: ${chatId}`);
  if (text === "/book") {
    let context = "b";
    log(`Setting context to 'b' for chatId: ${chatId}`);
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
  log(`Callback query data: ${data} for chatId: ${chatId}`);
  await bot.answerCallbackQuery({ callback_query_id: msg.id, cache_time: 1 });

  if (data === "send dates") {
    log(`Processing 'send dates' for chatId: ${chatId}`);
    let chkin = UserDatas[chatId].checkInDate;
    let chkout = UserDatas[chatId].checkOutDate;
    if (!chkin || !chkout) {
      log(`Error: Missing check-in or check-out date for chatId: ${chatId}`);
      await bot.sendMessage(
        chatId,
        "❌ПОМИЛКА! ОБЕРІТЬ ПРАВИЛЬНІ ДАТИ ПРОЖИВАННЯ!⚠️"
      );
      return sendBookingInstructions(chatId);
    }

    let chkinString = chkin.replace("✅ ", "");
    let chkoutString = chkout.replace("✅ ", "");
    let chkinDate = moment(chkinString, "DD.MM.YYYY").toDate();
    let chkoutDate = moment(chkoutString, "DD.MM.YYYY").toDate();

    log(`Check-in date: ${chkinString}, Check-out date: ${chkoutString}`);

    if (chkinDate < chkoutDate) {
      const apiUrl = "http://localhost:3000/freeRooms";
      let chkinDate2 = moment(chkinString, "DD.MM.YYYY").format("DD/MM/YYYY");
      let chkoutDate2 = moment(chkoutString, "DD.MM.YYYY").format("DD/MM/YYYY");
      const postData = {
        dfrom: chkinDate2,
        dto: chkoutDate2,
      };

      log(
        `Fetching available rooms for dates: ${chkinDate2} to ${chkoutDate2}`
      );
      axios
        .post(apiUrl, postData)
        .then((response) => {
          const availableRoomsCount = response.data.data.length;
          let rooms = response.data.data;
          bot.sendMessage(
            chatId,
            `Усі квартири. Доступно ${availableRoomsCount} кімнат.`
          );
          log(`Available rooms: ${JSON.stringify(rooms)}`);
          checkFilter(chatId, msgId, rooms);
        })
        .catch((error) => {
          log(`Error fetching available rooms: ${error.message}`);
        });
      const data = { chatId: chatId, chkin: chkinString, chkout: chkoutString };
      await axios.post("http://localhost:3000/users", data);
    } else {
      log(`Error: Check-in date is after check-out date for chatId: ${chatId}`);
      await bot.sendMessage(
        chatId,
        "❌ПОМИЛКА! ОБЕРІТЬ ПРАВИЛЬНІ ДАТИ ПРОЖИВАННЯ!⚠️"
      );
      await sendBookingInstructions(chatId);
    }
  }
  if (data === "Check in" || data === "Check out") {
    log(`Handling date selection for chatId: ${chatId} with mode: ${data}`);
    userState[chatId] = data;
    handleDateSelection(chatId, userState[chatId]);
    if (data === "Check out") {
      const checkOutDate = getCheckOutDate(chatId); // Assuming getCheckOutDate is a function that retrieves the check-out date
      log(`Check-out date for chatId ${chatId}: ${checkOutDate}`);
    }
  } else if (data === "back") {
    let chkin = UserDatas[chatId].checkInDate;
    let chkout = UserDatas[chatId].checkOutDate;
    log(`Returning to booking instructions for chatId: ${chatId}`);
    sendBookingInstructions(chatId, chkin, chkout);
  } else if (data === "back_to_menu") {
    log(`Returning to main menu for chatId: ${chatId}`);
    start(chatId);
  }
});
