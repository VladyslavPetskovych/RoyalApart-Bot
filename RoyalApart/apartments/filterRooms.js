const bot = require("../bot");

const roomOptions2 = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "1-кімнатні", callback_data: "room1" },
          { text: "2-кімнатні", callback_data: "room2" },
          { text: "3-кімнатні", callback_data: "room3" },
        ],
        [{ text: "💖для романтичного відпочинку", callback_data: "romantic" }],
        [{ text: "👪для сімейного відпочинку", callback_data: "family" }],
        [{ text: "💼для бізнес подорожей", callback_data: "busines" }],
      ],
    }),
  };

const filterModule = async (chatId, msgId) => {


      
      const userData = {};
      
      const toggleCheck = (chatId, data) => {
        if (!userData[chatId]) {
          userData[chatId] = {};
        }
      
        userData[chatId][data] = !userData[chatId][data];
        return userData[chatId][data];
      };

  const msg = await bot.sendMessage(chatId, "Оберіть категорію .", {
    reply_markup: roomOptions2.reply_markup,
  });

  // Save the message ID for future reference
  const msgIdOfReply = msg.message_id;

  bot.on("callback_query", async (callbackQuery) => {
    const data = callbackQuery.data;

    try {
      const parsedMarkup = JSON.parse(roomOptions2.reply_markup);

      // Check if the data string exists in the parsed markup
      const isValidData = parsedMarkup.inline_keyboard
        .flatMap((row) => row.map((button) => button.callback_data))
        .includes(data);

      if (isValidData) {
        const isChecked = toggleCheck(chatId, data);

        // Update the button text with or without ✅
        const updatedMarkup = parsedMarkup.inline_keyboard.map((row) =>
          row.map((button) => ({
            ...button,
            text:
              userData[chatId] && userData[chatId][button.callback_data]
                ? `${button.text}✅`
                : button.text,
          }))
        );

        console.log(updatedMarkup);

        // Edit the message with the updated markup
        await bot.editMessageText("Оберіть категорію .", {
          chat_id: chatId,
          message_id: msgIdOfReply,
          reply_markup: JSON.stringify({ inline_keyboard: updatedMarkup }),
        });
      }
    } catch (error) {
      console.error("Error parsing markup:", error);
    }
  });
};

module.exports = {
  filterModule,
  roomOptions2,
};

// if (roomsToCheck.includes(data)) {
//     const parsedMarkup = JSON.parse(roomOptions2.reply_markup);

//     for (const row of parsedMarkup.inline_keyboard) {
//       for (const button of row) {
//         if (button.callback_data === data) {
//           const isChecked = userData[chatId] && userData[chatId][data];
//           button.text = isChecked
//             ? button.text.replace("✅", "")
//             : button.text + "✅";

//           if (!userData[chatId]) {
//             userData[chatId] = {};
//           }

//           // Toggle the value in userData
//           userData[chatId][data] = !isChecked;

//           // Remove the check emoji from other buttons in the same group
//           for (const otherData of roomsToCheck) {
//             if (otherData !== data) {
//               userData[chatId][otherData] = false;
//             }
//           }
//         }
//       }
//     }

//     // Use bot.editMessageText to edit the message text only if it has changed
//     await bot.editMessageText("Оберіть категорію .", {
//       chat_id: chatId,
//       message_id: msgIdOfreply - 1,
//       reply_markup: JSON.stringify(parsedMarkup),
//     });
//   }
