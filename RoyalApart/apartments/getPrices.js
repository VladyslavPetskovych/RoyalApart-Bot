// const axios = require("axios");

// // Function to make Axios request to the specified route
// async function getPrices(chatId, n, formattedDate) {
//   try {
//     // Make axios request to get user data using chatId
//     const userResponse = await axios.get(
//       `http://localhost:3000/users/${chatId}`
//     );
//     const userData = userResponse.data;
//     console.log("---------------------------------------------------");
//     console.log("----------------------------------------------");
//     console.log("-------------------------------------------------");
//     console.log("-------------------------------------------------------");
//     console.log("-----------------------------------------------------");
//     console.log("---------------------------------------------------");
//     console.log(userData);
//     console.log("-------------------------------------------------------");
//     console.log("-----------------------------------------------------");
//     console.log("---------------------------------------------------");

//     // Make axios request to get prices
//     const pricesResponse = await axios.get(
//       "http://localhost:3000/getprices/getPrices",
//       {
//         params: {
//           n: n,
//           formattedDate: formattedDate,
//         },
//       }
//     );
//     const pricesData = pricesResponse.data;

//     const currentRoomGlobalId = userData.currentroom.globalId;

//     const roomsWithPrices = {};
//     for (const roomGlobalId in pricesData) {
 
//     }
//     console.log("roomsWithPrices")
//     console.log(roomsWithPrices)
//     return roomsWithPrices;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

// module.exports = {
//   getPrices: getPrices,
// };


