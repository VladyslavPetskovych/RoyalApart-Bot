const bot = require("./bot");

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text === "/apartments") {
    const apiUrl = "http://localhost:3000/aparts";
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
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
  }
});
