const bot = require("../bot");
const axios = require("axios");
const form = require("../form");
const { filterModule, roomOptions2 } = require("./filterRooms");
const checkFilter = require("../book/checkFilter");
const { getPrices } = require("./getPrices");
let roomData = [];

//let currentRoom;

let fetchedRoom;
const roomOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "<<< Попередня ", callback_data: "prev room" },
        { text: "Наступна >>>", callback_data: "next room" },
      ],
      [{ text: "Заповнити форму", callback_data: "send form" }],
      [{ text: "🔙 Меню ●", callback_data: "back_to_menu" }],
    ],
  }),
};

const sendRoomDetails = async (chatId, room, updatedRoomOptions = null) => {
  const imageUrl = room.imgurl[0];
  const roomName = room.name;
  const roomDescription = room.description;
  const roomSurface = room.surface;
  const roomBeds = room.beds;
  const roomGuests = room.guests;
  const roomFloor = room.floor;
  const numroom = room.numrooms;
  const wubidroom = room.wubid;
  let roomPriceoriginal = room.price;

  const roomPrices = await getPrices(chatId);
  const context = roomPrices.context; // Get the context from the roomPrices object
  const prices = roomPrices.pricesData[room.globalId];
  let roomPrice;

  if (context !== "a") {
    if (prices && prices[0] > 10000) {
      roomPrice = "договірна. Лише довготривала оренда";
    } else if (prices) {
      roomPrice = prices.join(" грн, ") + " грн";
    } else {
      roomPrice = "Ціна недоступна";
    }
  } else {
    if (roomPriceoriginal > 10000) {
      roomPrice = "Ціна договірна. Лише довготривала оренда";
    } else {
      roomPrice = roomPriceoriginal;
    }
  }

  console.log("Prices:", roomPrice);
  console.log("Context:", context); // Log the context

  try {
    const replyMarkup = updatedRoomOptions
      ? updatedRoomOptions.reply_markup
      : roomOptions.reply_markup;

    const sentMessage = await bot.sendPhoto(
      chatId,
      `../server/imgs/${imageUrl}`,
      {
        caption: ` Адреса: ${roomName}\n\nКількість кімнат:  ${numroom}\n\nПлоща ${roomSurface}m²\nКількість ліжок: ${roomBeds}\nКількість гостей: ${roomGuests}\nПоверх: ${roomFloor}\n💸 Ціна: ${roomPrice}\n\n${roomDescription} \n\n\n [Детальніше на сайті](https://www.royalapart.online/room/${wubidroom}) `,
        reply_markup: replyMarkup,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }
    );

    const apiUrl = `http://localhost:3000/users/updateLastMessage/${chatId}`;
    const userData = {
      chatId: `${chatId}`,
      message: `${sentMessage.message_id}`,
    };
    axios
      .post(apiUrl, userData)
      .then((response) => {
        //console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });

    return sentMessage;
  } catch (error) {
    console.error("Error sending room details:", error.message);
    return null;
  }
};

const fetchRoomData = async () => {
  const apiUrl = "http://localhost:3000/aparts";
  try {
    const response = await axios.get(apiUrl);
    roomData = response.data.data;
    //currentRoom = roomData[0];
    //console.log(currentRoom.wubid);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const showApartments = async (chatId, rooms = []) => {
  await fetchRoomData();
  // Remove the local declaration of roomData here
  const response = await axios.get(`http://localhost:3000/users/${chatId}`);

  // Extract relevant data from the response
  const userData = response.data;
  console.log("------------------------");
  console.log(userData);
  console.log("------------------------");

  if (roomData.length > 0 && userData.roomsid.length > 0) {
    //currentRoom = roomData.find(
    //  (room) => room.wubid === userData.roomsid[userData.insexr]
    //); // Assuming you want to start with the first room
    const sentMessage = await sendRoomDetails(
      chatId,
      roomData.find((room) => room.wubid === userData.roomsid[userData.insexr])
    );
    msgId = sentMessage.message_id;
  } else {
    bot.sendMessage(chatId, "На разі немає даних квартир!");
    console.error(
      "No room data available!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    // Handle the case where there is no room data
  }
};

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  msgId = msg.message_id + 1;
  if (text === "/apartments" || text === "Show Apartments") {
    await fetchRoomData();
    let context = "a";

    await axios.post(`http://localhost:3000/users/updateContext/${chatId}`, {
      context,
    });

    //console.log("/apartments clicked" + currentRoom);
    const apiUrlUpdate = `http://localhost:3000/users`;
    const userDataId = {
      chatId: chatId,
      insexr: 0,
      roomsid: roomData.map((room) => room.wubid),
    };
    await axios.post(apiUrlUpdate, userDataId);
    //await filterModule(chatId, msg.message_id + 1);
    await showApartments(chatId);
  }
});

const lastPickedRoomsMap = new Map();

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  const messageId = callbackQuery.message.message_id;

  if (data === "prev room" || data === "next room") {
    const response = await axios.get(
      `http://localhost:3000/users/${chatId}?_=${Date.now()}`
    );
    const userData = response.data;
    let userRoomIndex =
      (userData.insexr +
        (data === "prev room" ? -1 : 1) +
        userData.roomsid.length) %
      userData.roomsid.length;
    console.log(
      `Current id ${userRoomIndex}. Довжина масиву ${userData.roomsid.length}, індекс ${userData.insexr}`
    );
    // currentRoom = roomData.find(
    //   (room) => room.wubid === userData.roomsid[userRoomIndex]
    // );
    const updatedRoom = roomData.find(
      (room) => room.wubid === userData.roomsid[userRoomIndex]
    );

    console.log(`Updated room !!!!!!!!!!!!!!!!!!\n ${updatedRoom}`);
    const apiUrlUpdate = `http://localhost:3000/users`;
    const userDataId = {
      chatId: userData.chatId,
      insexr: userRoomIndex,
    };
    await axios.post(apiUrlUpdate, userDataId);
    if (updatedRoom) {
      const sentMessage = await sendRoomDetails(chatId, updatedRoom);
      msgId = sentMessage.message_id;

      console.log("room is already sent", msgId);
      let lastmsg;

      axios
        .get(`http://localhost:3000/users/getLastMessageId/${chatId}`)
        .then((response) => {
          lastmsg = response.data.lastMessageId;
          console.log("lastMEssageID:", response.data.lastMessageId);

          bot.deleteMessage(chatId, parseInt(lastmsg));
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    }
    await bot.answerCallbackQuery({ callback_query_id: callbackQuery.id });
  }

  if (data === "send form") {
    const response = await axios.get(`http://localhost:3000/users/${chatId}`);
    const userData = response.data;

    const currentRoomId = userData.roomsid[userData.insexr];
    console.log(`Response##############`);
    console.log(response);
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    console.log(`Data##############`);
    console.log(userData);
    const currentRoom = roomData.find((room) => room.wubid === currentRoomId);

    try {
      const response = await axios.post("http://localhost:3000/users", {
        chatId: chatId,
        currentroom: currentRoom,
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
    await bot.deleteMessage(chatId, userData.lastMessage);
    await bot.sendPhoto(chatId, `../server/imgs/${currentRoom.imgurl[0]}`, {
      caption: `Ви обрали квартиру за адресою: ${currentRoom.name}\n`,
    });

    await form(chatId);
  }
});

module.exports = { showApartments, sendRoomDetails };
