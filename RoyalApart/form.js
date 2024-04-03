const axios = require("axios");
const bot = require("./bot");
const roomMap = new Map();
const userStates = {};
const formButtons = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Змінити дані", callback_data: "change form" }],
      [
        {
          text: "Додати коментар або побажання 📝",
          callback_data: "coment form",
        },
      ],
      [{ text: "Надіслати запит менеджеру", callback_data: "user data" }],
      [{ text: "🔙 Меню ●", callback_data: "back_to_menu" }],
    ],
  }),
};

const cooldowns = new Map();

const sendUserData = async (chatId) => {
  const currentTime = Date.now();
  if (cooldowns.has(chatId)) {
    const lastSentTime = cooldowns.get(chatId);
    const timeDifference = currentTime - lastSentTime;
    const cooldownDuration = 60 * 1000; // 1 minute in milliseconds

    if (timeDifference < cooldownDuration) {
      const remainingTime = cooldownDuration - timeDifference;
      const remainingSeconds = Math.ceil(remainingTime / 1000);
      bot.sendMessage(
        chatId,
        `Будь ласка, Зачекайте ${remainingSeconds} секунд, перед ПОВТОРНИМ надсиланням.`
      );
      return; // Exit the function if still in cooldown
    }
  }

  // If not in cooldown or cooldown has expired, proceed with sending data
  console.log("!!!!!USER DATA IS SEND!!!!!");
  console.log(chatId);
  let data = {
    chatId: chatId,
  };
  await axios.post("http://localhost:3000/email/sendEmail", data);
  bot.sendMessage(
    chatId,
    "Ваші дані надіслані менеджеру, дякуємо за бронювання, очікуйте"
  );

  resetUserState(chatId);
  
  // Update cooldown timestamp
  cooldowns.set(chatId, currentTime);
};


const resetUserState = (chatId) => {
  delete userStates[chatId];
};

const askForName = async (chatId) => {
  bot.sendMessage(chatId, `\nНапишіть Ваше ім'я: \t...✍️`);
  const message = await waitForUserInput(chatId);
  console.log(message.text);
  console.log(message);
  console.log("!!!!!@##@#!@!#@!#@!");
  try {
    const response = await axios.post("http://localhost:3000/users", {
      chatId: chatId,
      name: message.text,
    });

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
  return message.text;
};

const askForPhone = async (chatId) => {
  bot.sendMessage(
    chatId,
    `Тепер напишіть Ваш номер телефону у форматі "0123456789" \t...\t✍️`
  );
  const message = await waitForUserInput(chatId);
  try {
    const response = await axios.post("http://localhost:3000/users", {
      chatId: chatId,
      phone: parseInt(message.text),
    });

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
  return message.text;
};

const userResolvers = new Map();
const userListeners = new Map();

const waitForUserInput = (chatId) => {
  return new Promise((resolve) => {
    userResolvers.set(chatId, resolve);

    const messageListener = (message) => {
      if (message.text.startsWith("/")) {
        return;
      }
      const resolver = userResolvers.get(message.chat.id);
      if (resolver) {
        resolver(message);
        userResolvers.delete(message.chat.id);

        bot.removeListener("message", messageListener);
      }
    };

    userListeners.set(chatId, messageListener);
    bot.on("message", messageListener);
  });
};

const form = async (receivedChatId) => {
  const userName = await askForName(receivedChatId);

  const userData = {
    name: userName,
    phone: "",
    coment: "",
  };

  roomMap.set(receivedChatId, userData);

  const userPhone = await askForPhone(receivedChatId);

  const existingUserData = roomMap.get(receivedChatId);
  existingUserData.phone = userPhone;
  roomMap.set(receivedChatId, existingUserData);

  const response = await axios.get(
    `http://localhost:3000/users/${receivedChatId}`
  );
  let Userinf = response.data;

  const roomMessage =
    Userinf.currentroom.price > 10000
      ? `Ви обрали квартиру ${Userinf.currentroom.name} - Договірна ціна`
      : `Ви обрали квартиру ${Userinf.currentroom.name} за ціною: ${Userinf.currentroom.price}`;

  bot.sendMessage(
    receivedChatId,
    `${roomMessage}\n\n\n\tВаші дані: \nім'я: ${userName}\nномер телефону: ${userPhone}`,
    formButtons
  );
};

const askForComment = async (chatId) => {
  bot.sendMessage(chatId, `Будь ласка, залиште ваш коментар: \t...\t✍️`);
  const message = await waitForUserInput(chatId);
  try {
    const response = await axios.post("http://localhost:3000/users", {
      chatId: chatId,
      coment: message.text,
    });

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
  const response = await axios.get(
    `http://localhost:3000/users/${chatId}`
  );
  let Userinf = response.data;

  const roomMessage =
    Userinf.currentroom.price > 10000
      ? `Ви обрали квартиру ${Userinf.currentroom.name} - Договірна ціна`
      : `Ви обрали квартиру ${Userinf.currentroom.name} за ціною: ${Userinf.currentroom.price}`;

  bot.sendMessage(
    chatId ,
    `${roomMessage}\n\n\n\tВаші дані: \nім'я: ${Userinf.name}\nномер телефону: ${Userinf.phone} \nКоментар:  ${Userinf.coment}`,
    formButtons
  );
  return message.text;
};

bot.on("callback_query", async (query) => {
  const callbackData = query.data;

  if (callbackData === "user data") {
    console.log(
      "Sended data !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    sendUserData(query.message.chat.id);
  }

  if (callbackData === "change form") {
    await resetUserState(query.message.chat.id);
    await form(query.message.chat.id);
  }
  if (callbackData === "coment form") {
    askForComment(query.message.chat.id);
  }
});
module.exports = form;
