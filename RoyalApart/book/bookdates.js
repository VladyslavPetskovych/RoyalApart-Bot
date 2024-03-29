const bot = require("../bot");

let currentMonth = new Date().getMonth() + 1;
let checkInDate;
let checkOutDate;
function initializeUserData(chatId) {
  return {
    checkInDate: "❌",
    checkOutDate: "❌",
    currentMonth: new Date().getMonth() +1,
    mode: "",
    chatId: chatId,
  };
}
const UserDatas = {
  checkInDate: null,
  checkOutDate: null,
  currentMonth: new Date().getMonth() + 1,
  mode: "",
};

function getMonth(month) {
  if (typeof month !== "number" || month < 1 || month > 12) {
    throw new Error("Invalid month. Please provide a number between 1 and 12.");
  }
  if (month === 6) {
    return 30;
  }
  const lastDayOfMonth = new Date(new Date().getFullYear(), month, 0).getDate();
  return lastDayOfMonth;
}

function generateDaysLayout(month) {
  let buttonRow = [];
  let keyboard = [];

  let day = 1;

  const maxDays = getMonth(month);
  console.log(maxDays);

  const d = new Date();
  console.log(month);
  if (d.getMonth() + 1 === month) {
    day = d.getDate();
  }
  for (day; day <= maxDays; day++) {
    buttonRow.push({ text: day.toString(), callback_data: day.toString() });
    if (day % 7 === 0) {
      keyboard.push([...buttonRow]);
      buttonRow = [];
    }
  }
  if (buttonRow.length > 0) {
    keyboard.push([...buttonRow]);
  }
  keyboard.push(
    [
      { text: "<<", callback_data: "prev" },
      { text: ">>", callback_data: "next" },
    ],
    [{ text: "Назад", callback_data: "back" }]
  );
  return keyboard;
}

function updateMessage(chatId, messageId, monthName) {
  const inlineKeyboard = generateDaysLayout(UserDatas[chatId].currentMonth, new Date().getDate());

  bot.editMessageText(`виберіть дату ${UserDatas[chatId].mode === "Check in" ? "заїзду" : "виїзду"} на ${monthName}:`, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: { inline_keyboard: inlineKeyboard },
  });
}

function handleDaySelection(chatId, selectedDay) {
  const selectedDate = new Date();
  selectedDate.setMonth(UserDatas[chatId].currentMonth - 1);
  selectedDate.setDate(selectedDay);

  if (UserDatas[chatId].mode === "Check in") {
    UserDatas[chatId].checkInDate = "✅ " + selectedDate.toLocaleDateString("uk-UA");
  } else if (UserDatas[chatId].mode === "Check out") {
    UserDatas[chatId].checkOutDate = "✅ " + selectedDate.toLocaleDateString("uk-UA");
  }

  const displayedDateString = `${padZero(selectedDate.getDate())}.${padZero(
    UserDatas[chatId].currentMonth
  )}.${selectedDate.getFullYear()}`;

  console.log(selectedDate);
  bot.sendMessage(
    chatId,
    `Ви обрали дату: ${displayedDateString}. Mode: ${UserDatas[chatId].mode}`
  );
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function getCheckInDate() {
  return checkInDate;
}

function getCheckOutDate() {
  return checkOutDate;
}

function handleDateSelection(chatId, mode) {
  console.log("handleDateSelection");
  if (!UserDatas[chatId]) {
    UserDatas[chatId] = initializeUserData(chatId);
  }
  const monthName = new Date(
    new Date().getFullYear(),
    UserDatas[chatId].currentMonth - 1,
    1
  ).toLocaleString("uk-UA", { month: "long" });

  let check = mode == "Check in" ? "заїзду" : "виїзду";
  bot.sendMessage(
    chatId,
    `виберіть дату ${check} на ${monthName} :`,
    qOptionsDates(UserDatas[chatId].currentMonth, new Date().getDate())
  );
  UserDatas[chatId].mode = mode;
}

function qOptionsDates(month, currentDay) {
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: generateDaysLayout(month, currentDay),
    }),
  };
}

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  const messageId = msg.message.message_id;

  // Initialize user data if not already done
  if (!UserDatas[chatId]) {
    UserDatas[chatId] = initializeUserData(chatId);
  }

  if (data === "next" || data === "prev") {
    if (data === "next" && UserDatas[chatId].currentMonth < 12) {
      UserDatas[chatId].currentMonth++;
    } else if (data === "prev" && UserDatas[chatId].currentMonth > 1) {
      UserDatas[chatId].currentMonth--;
    }

    const monthName = new Date(
      new Date().getFullYear(),
      UserDatas[chatId].currentMonth - 1,
      1
    ).toLocaleString("uk-UA", { month: "long" });

    updateMessage(chatId, messageId, monthName);
  } else if (data > 0 && data < 32) {
    const selectedDay = parseInt(data);
    handleDaySelection(chatId, selectedDay);
  }
});

module.exports = {
  handleDateSelection,
  getCheckInDate,
  getCheckOutDate,
  UserDatas,
};