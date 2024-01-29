const bot = require("./bot");

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text === "/apartments") {
    const apiUrl = "http://localhost:3000/aparts";
    const response = await fetch(apiUrl);
    const fetchedData = await response.json(); // Assuming JSON response
  
    console.log(fetchedData.text);
    return bot.sendMessage(
      chatId,
      "Усі квартири в наявності: " + fetchedData.text
    ); 
  }

});
