const bot = require("./bot");

let currentMonth = new Date().getMonth() + 1;
let checkInDate;
let checkOutDate;

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

  const maxDays = getMonth(month);
  console.log(maxDays);
  for (let day = 1; day <= maxDays; day++) {
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

function updateMessage(chatId, messageId, modee) {
  const monthName = new Date(
    new Date().getFullYear(),
    currentMonth - 1,
    1
  ).toLocaleString("uk-UA", { month: "long" });

  let check = modee === "Check in" ? 'заїзду' : 'виїзду';
  const inlineKeyboard = generateDaysLayout(currentMonth);

  bot.editMessageText(`виберіть дату ${check} на ${monthName} :`, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: { inline_keyboard: inlineKeyboard },
  });
}


let qOptionsDates = {
  reply_markup: JSON.stringify({
    inline_keyboard: generateDaysLayout(currentMonth),
  }),
};

function handleDaySelection(chatId, selectedDay, mode) {
  const selectedDate = new Date();
  selectedDate.setMonth(currentMonth - 1); // Month is 0-indexed
  selectedDate.setDate(selectedDay);
  console.log(mode);

  if (mode === "Check in") {
    checkInDate = "☑️ " + selectedDate.toLocaleDateString("uk-UA");
  } else if (mode === "Check out") {
    checkOutDate = "☑️ " + selectedDate.toLocaleDateString("uk-UA");
  }

  const displayedDateString = `${padZero(selectedDate.getDate())}.${padZero(currentMonth)}.${selectedDate.getFullYear()}`;
  
  console.log(selectedDate);
  bot.sendMessage(
    chatId,
    `Ви обрали дату: ${displayedDateString}. Mode: ${mode}`
  );
}

// Helper function to pad single-digit numbers with a leading zero
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
  const monthName = new Date(
    new Date().getFullYear(),
    currentMonth - 1,
    1
  ).toLocaleString("uk-UA", { month: "long" });
  let check='заїзду';
  if(mode =="Check in"){
    check = 'заїзду'
  }else {
    check = 'виїзду'
  }
  bot.sendMessage(
    chatId,
    `виберіть дату ${check} на ${monthName} :`,
    qOptionsDates
  );
  modee = mode;
}

let modee = "";
bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  const messageId = msg.message.message_id;

  console.log(chatId, " callback_query");

  if (data === "next" || data === "prev") {
    if (data === "next" && currentMonth < 12) {

      currentMonth++;
      console.log(currentMonth)
    } else if (data === "prev" && currentMonth > 1) {
      currentMonth--;
    }

    const monthName = new Date(
      new Date().getFullYear(),
      currentMonth - 1,
      1
    ).toLocaleString("uk-UA", { month: "long" });

    // Call the common function to update both text and inline keyboard
    updateMessage(chatId, messageId, monthName, modee);
  } else if (data > 0 && data < 32) {
    const selectedDay = parseInt(data);
    handleDaySelection(chatId, selectedDay, modee);
  }
});

module.exports = {
  handleDateSelection,
  getCheckInDate,
  getCheckOutDate
};