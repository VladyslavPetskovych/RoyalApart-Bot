const axios = require("axios");
const bot = require("../bot");
const { filterModule, roomOptions2 } = require("../apartments/filterRooms");
const { showApartments } = require("../apartments/apartments");

const userRoomsMap = new Map();

async function checkFilter(chatId, msgId, rooms) {
  try {
    await filterModule(chatId, msgId);

    // Store user-specific rooms in the map
    userRoomsMap.set(chatId, rooms);

    console.log(
      "AllRooms!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    console.log(rooms);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
}

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  if (data === "shw") {
    // Retrieve user-specific rooms from the map
    const userRooms = userRoomsMap.get(chatId) || [];

    const response = await axios.get(`http://localhost:3000/users/${chatId}`);

    // Extract relevant data from the response
    const userData = response.data;
    const { checkedRooms } = userData;

    const filteredRooms = userRooms.filter((room) => {
      let shouldInclude = Object.keys(checkedRooms).some(
        (category) => checkedRooms[category] && room.category === category
      );
      return (
        shouldInclude &&
        ((checkedRooms["room1"] && room.numrooms === 1) ||
          (checkedRooms["room2"] && room.numrooms === 2) ||
          (checkedRooms["room3"] && room.numrooms === 3))
      );
    });

    const checkedRoomsData = {
      chatId: chatId,
      roomsid: filteredRooms.map((room) => room.wubid),
      insexr: 0,
    };
    await axios.post(`http://localhost:3000/users`, checkedRoomsData);
    console.log(Object.keys(checkedRooms));
    console.log("CheckFilter");
    console.log("#$#$#$#$#$#$#$#$#$#$#$");
    console.log(chatId);
    // console.log(
    //   filteredRooms.map((room) => {
    //     return { name: room.name };
    //   })
    // );
    showApartments(chatId, filteredRooms);
  }
});

module.exports = checkFilter;
