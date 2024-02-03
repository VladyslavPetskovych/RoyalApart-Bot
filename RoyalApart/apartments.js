const bot = require("./bot");
const axios = require("axios");

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/apartments") {
    const apiUrl = "https://194.99.21.21/aparts";

    try {
      const response = await axios.get(apiUrl);
      const fetchedData = response.data;

      console.log(fetchedData);

      let imageUrl;
      for (const room of fetchedData.data) {
        imageUrl = room.imgurl[0];
      }
      console.log(imageUrl);

      const allnames = fetchedData.data.map((room) => room.name).join(", ");

      await bot.sendMessage(chatId, `Усі квартири в наявності: `);
      await bot.sendPhoto(chatId, imageUrl, {
        caption: `Ось зображення квартири. ${allnames}`,
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }
});
