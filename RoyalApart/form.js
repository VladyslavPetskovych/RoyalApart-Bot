const axios = require("axios");
const bot = require("./bot");
const roomMap = new Map();
const userStates = {};
const formButtons = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Змінити дані", callback_data: "change form" }],
      [{ text: "Надіслати запит менеджеру", callback_data: "user data" }],
      [{ text: "🔙 Назад ●", callback_data: "back_to_menu" }],
    ],
  }),
};

const sendUserData = async (chatId) => {
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
  // Reset user state after sending data
  resetUserState(chatId);
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
      const resolver = userResolvers.get(message.chat.id);
      if (resolver) {
        resolver(message);
        userResolvers.delete(message.chat.id);

        // Remove the event listener
        bot.removeListener("message", messageListener);
      }
    };

    userListeners.set(chatId, messageListener);
    bot.on("message", messageListener);
  });
};

const form = async (receivedChatId) => {
  const userName = await askForName(receivedChatId);

  // Save user data to your backend or use roomMap to store data
  const userData = {
    name: userName,
    phone: "",
    // Add other user properties as needed
  };
  roomMap.set(receivedChatId, userData);

  const userPhone = await askForPhone(receivedChatId);

  // Save user data to your backend or update roomMap
  const existingUserData = roomMap.get(receivedChatId);
  existingUserData.phone = userPhone;
  roomMap.set(receivedChatId, existingUserData);

  // Additional processing or sending messages

  // Check if currentRoom is defined before accessing its properties
  const roomMessage =
    existingUserData.currentRoom &&
    `Ви обрали квартиру ${existingUserData.currentRoom.name} за ціною: ${existingUserData.currentRoom.price}`;

  // Send final message
  bot.sendMessage(
    receivedChatId,
    `${roomMessage}\n\tВаші дані: \nім'я: ${userName}\nномер телефону: ${userPhone}`,
    formButtons
  );

  // Listen for callback_query events
};

bot.on("callback_query", async (query) => {
  const callbackData = query.data;

  if (callbackData === "user data") {
    // Send user data
    console.log(
      "Sended data !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    sendUserData(query.message.chat.id);
  }

  if (callbackData === "change form") {
    resetUserState(query.message.chat.id);
  }
});
module.exports = form;
