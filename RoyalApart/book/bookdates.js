const bot = require("../bot");

function log(message) {
  console.log(new Date().toISOString(), message);
}

function initializeUserData(chatId) {
  log(`Initializing user data for chatId: ${chatId}`);
  return {
    checkInDate: "❌",
    checkOutDate: "❌",
    currentMonth: new Date().getMonth() + 1,
    mode: "",
    chatId: chatId,
  };
}

const UserDatas = new Map(); // Changed to a Map to store data per chatId

function getMonth(month) {
  if (typeof month !== "number" || month < 1 || month > 12) {
    throw new Error("Invalid month. Please provide a number between 1 and 12.");
  }
  const lastDayOfMonth = new Date(new Date().getFullYear(), month, 0).getDate();
  return lastDayOfMonth;
}

function generateDaysLayout(month) {
  log(`Generating days layout for month: ${month}`);
  let buttonRow = [];
  let keyboard = [];
  let day = 1;
  const maxDays = getMonth(month);

  const d = new Date();
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
    [{ text: "Далі", callback_data: "back" }]
  );

  return keyboard;
}

function updateMessage(chatId, messageId, monthName) {
  log(
    `Updating message for chatId: ${chatId}, month: ${
      UserDatas.get(chatId).currentMonth
    }`
  );
  const inlineKeyboard = generateDaysLayout(UserDatas.get(chatId).currentMonth);

  bot.editMessageText(
    `виберіть дату ${
      UserDatas.get(chatId).mode === "Check in" ? "заїзду" : "виїзду"
    } на ${monthName}:`,
    {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: { inline_keyboard: inlineKeyboard },
    }
  );
}

function handleDaySelection(chatId, selectedDay) {
  log(`Handling day selection for chatId: ${chatId}, day: ${selectedDay}`);
  const selectedDate = new Date();
  selectedDate.setMonth(UserDatas.get(chatId).currentMonth - 1);
  selectedDate.setDate(selectedDay);

  if (UserDatas.get(chatId).mode === "Check in") {
    UserDatas.get(chatId).checkInDate =
      "✅ " + selectedDate.toLocaleDateString("uk-UA");
  } else if (UserDatas.get(chatId).mode === "Check out") {
    UserDatas.get(chatId).checkOutDate =
      "✅ " + selectedDate.toLocaleDateString("uk-UA");
  }

  const displayedDateString = `${padZero(selectedDate.getDate())}.${padZero(
    UserDatas.get(chatId).currentMonth
  )}.${selectedDate.getFullYear()}`;

  bot.sendMessage(chatId, `Ви обрали дату: ${displayedDateString}.`);
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function handleDateSelection(chatId, mode) {
  log(`Handling date selection for chatId: ${chatId}, mode: ${mode}`);
  if (!UserDatas.has(chatId)) {
    UserDatas.set(chatId, initializeUserData(chatId));
  }

  UserDatas.get(chatId).mode = mode;

  const monthName = new Date(
    new Date().getFullYear(),
    UserDatas.get(chatId).currentMonth - 1,
    1
  ).toLocaleString("uk-UA", { month: "long" });

  let check = mode === "Check in" ? "заїзду" : "виїзду";
  bot.sendMessage(
    chatId,
    `виберіть дату ${check} на ${monthName} :`,
    qOptionsDates(UserDatas.get(chatId).currentMonth, new Date().getDate())
  );
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
  if (!UserDatas.has(chatId)) {
    UserDatas.set(chatId, initializeUserData(chatId));
  }
  console.log(UserDatas.get(chatId));
  if (data === "next" || data === "prev") {
    if (data === "next") {
      UserDatas.get(chatId).currentMonth =
        (UserDatas.get(chatId).currentMonth % 12) + 1;
    } else if (data === "prev") {
      UserDatas.get(chatId).currentMonth =
        ((UserDatas.get(chatId).currentMonth + 10) % 12) + 1;
    }

    log(`Current month after change: ${UserDatas.get(chatId).currentMonth}`);

    const monthName = new Date(
      new Date().getFullYear(),
      UserDatas.get(chatId).currentMonth - 1,
      1
    ).toLocaleString("uk-UA", { month: "long" });
    console.log(UserDatas.get(chatId));
    updateMessage(chatId, messageId, monthName);
  } else if (parseInt(data) > 0 && parseInt(data) < 32) {
    console.log(UserDatas.get(chatId));
    const selectedDay = parseInt(data);
    handleDaySelection(chatId, selectedDay);
  }
});

function getCheckInDate(chatId) {
  return UserDatas.get(chatId)?.checkInDate || "❌";
}

function getCheckOutDate(chatId) {
  return UserDatas.get(chatId)?.checkOutDate || "❌";
}

module.exports = {
  handleDateSelection,
  getCheckInDate,
  getCheckOutDate,
  UserDatas,
};
