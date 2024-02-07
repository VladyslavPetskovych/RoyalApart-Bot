const bot = require("./bot");

let userPhone;
let userName;
let chatId;
let isNameInput = true;

const formButtons = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Змінити дані", callback_data: "change form" }],
      [{ text: "Надіслати запит менеджеру", callback_data: "user data" }],
      [{ text: "🔙 Назад ●", callback_data: "back_to_menu" }],
    ],
  }),
};

const form = (receivedChatId) => {
  chatId = receivedChatId;

  bot.sendMessage(chatId, `Напишіть Ваше ім'я:`);

  bot.on("message", handleFormResponse);
  bot.on("callback_query", (query) => {
    const data = query.data;
    if (data === "change form") {
      form(chatId);
    }
  });
};

const handleFormResponse = (message) => {
  const userInput = message.text;

  if (userInput.startsWith("/")) {
    isNameInput = true;
    return bot.removeListener("message", handleFormResponse);
  }

  if (isNameInput) {
    userName = userInput;
    isNameInput = false;

    bot.sendMessage(
      chatId,
      `Ім'я прийнято. Тепер напишіть Ваш номер телефону:`
    );
  } else {
    if (isNaN(userInput) || userInput.length < 6 || userInput.length > 15) {
      bot.sendMessage(
        chatId,
        "Будь ласка, напишіть дійсний номер телефону. \n(Значення від 6 до 15 цифр)"
      );
    } else {
      userPhone = userInput;
      isNameInput = true;
      console.log("User Name:", userName);
      console.log("User Phone:", userPhone);

      bot.sendMessage(
        chatId,
        `\tВаші дані: \nім'я: ${userName}\nномер телефону: ${userPhone}`,
        formButtons
      );
    

      bot.removeListener("message", handleFormResponse);
    }
  }
};

const changeForm = (chatId) => {

};

module.exports = form;
