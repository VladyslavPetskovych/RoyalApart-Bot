const axios = require("axios");
const moment = require('moment');

async function getPrices(chatId) {
  try {
   
    const userResponse = await axios.get(
      `http://localhost:3000/users/${chatId}`
    );
    const userData = userResponse.data;
    const context = userData.context;
    console.log("---------------------------------------------------");
    console.log("----------------------------------------------");
    console.log("-------------------------------------------------");
    console.log("-------------------------------------------------------");
    console.log("-----------------------------------------------------");
    console.log("---------------------------------------------------");
    console.log(userData);
    console.log("-------------------------------------------------------");
    console.log("-----------------------------------------------------");
    console.log("---------------------------------------------------");
    const checkinDate = moment(userData.chkin, 'DD.MM.YYYY');
    const checkoutDate = moment(userData.chkout, 'DD.MM.YYYY');
    
    const duration = moment.duration(checkoutDate.diff(checkinDate));
    const n = duration.asDays();
    console.log('Кількість днів')
    console.log(n)
    console.log(n)
    console.log(n)
    console.log(n)
    const pricesResponse = await axios.get(
      "http://localhost:3000/getprices/getPrices",
      {
        params: {
          n: n,
          formattedDate: checkinDate.format('DD/MM/YYYY'),
        },
      }
    );
    const pricesData = pricesResponse.data;
    console.log("-------------------------------------------------------");
    console.log("-----------------------------------------------------");
    console.log("---------------------------------------------------");
    console.log(pricesData);

    return { context, pricesData };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

module.exports = {
  getPrices: getPrices,
};
