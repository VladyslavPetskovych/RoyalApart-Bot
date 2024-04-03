const express = require("express");
const nodemailer = require("nodemailer");
const axios = require("axios");

const router = express.Router();
router.use(express.json());

router.post("/sendEmail", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "apartsr@gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "apartsr@gmail.com",
        pass: "izjm kjyk lztd jbom",
      },
    });

    let chatId = req.body.chatId;
    console.log(chatId);
    let response = await axios.get(`http://localhost:3000/users/${chatId}`);
    let userData = response.data;
    console.log(chatId);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!dfsdfdsfdsfdsfdsfdsds!!!!");
    console.log(userData);
    let textS =
      `<h1>Дані бронювання ІМЯ: ${userData.name} НОМЕР ТЕЛЕФОНУ: ${userData.phone} </h1> <br>КОМЕНТАР: ${userData.coment}<br>` +
      `<b>Обрана квартира ${userData.currentroom.name}\t <br> Ціна за якою бронювали ${userData.currentroom.price}  \n</b> <br>` +
      `<b>Дати заїзду ${userData.chkin}  Дата виїзду ${userData.chkout} </b>`;

    const mailOptions = {
      from: "botfroyal@gmail.com",
      to: ["royal.apartments@ukr.net"],
      subject: "Нове бронювання",
      html: textS,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: ", info);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
