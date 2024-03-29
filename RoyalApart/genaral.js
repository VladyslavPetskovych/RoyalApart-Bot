const bot = require("./bot");
const axios = require("axios");

const startButton = async (chatId) =>{
  const checkedRoomsData = {
    chatId: chatId,
  };
  await axios.post(`http://localhost:3000/users`, checkedRoomsData);

  return bot.sendMessage(
    chatId,
    "Привіт, це бот для швидкого пошуку і бронювання квартир у Львові. 🏡" +
      " Великий вибір житла за доступними цінами \n\n" +
      " 🚪 Усі апартаменти - /apartments \n\n 🔑 Забронювати - /book" +
      " \n\n  Правила бронювання - /info . \n\n"+ 
      "Є запитання?\n"+
      "[Чат з менеджером](https://t.me/Royalreservation) ✍️👩‍💼",
    { parse_mode: "Markdown", disable_web_page_preview: true }
  );
}

const start =  () => {

  bot.setMyCommands([
    { command: "/start", description: "Запустити бота" },
    // { command: "/info", description: "Як це працює?" },
    // { command: "/book", description: "Забронювати квартиру" },
    // { command: "/apartments", description: "Асортимент квартир" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      startButton(chatId);
    }


  });
};


module.exports = startButton;


start();
