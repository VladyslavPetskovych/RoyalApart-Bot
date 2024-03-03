const axios = require("axios");
const bot = require("../bot");
const { filterModule, roomOptions2 } = require("../apartments/filterRooms");
const { showApartments } = require("../apartments/apartments");

let filteredRooms;
let allRooms = [];
async function checkFilter(chatId, msgId, rooms) {
  try {
    // Wait for filterModule to complete before proceeding
    await filterModule(chatId, msgId);
    allRooms = rooms;
    // Make a GET request to fetch user data
   
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
}

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  if (data === "shw") {
    const response = await axios.get(`http://localhost:3000/users/${chatId}`);

    
    // Extract relevant data from the response
    const userData = response.data;
    console.log("------------------------")
console.log(userData)

    const { checkedRooms } = userData;
    console.log(checkedRooms)
    filteredRooms = allRooms.filter(room =>
      Object.keys(checkedRooms).some(category => checkedRooms[category] && room.category === category)
    );
    

    console.log(Object.keys(checkedRooms));
    console.log("CheckFilter");
    showApartments(chatId, filteredRooms);
  }
});

module.exports = checkFilter;
