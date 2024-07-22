const express = require("express");
const router = express.Router();
const Sale = require("../models/sales");
router.use(express.json());

router.post("/", async (req, res) => {
  const { roomId, discount, tillDate } = req.body;
  let sale = {
    roomId: Number(roomId), // Ensure roomId is a number
    discount: Number(discount), // Ensure discount is a number
    tillDate: new Date(tillDate),
  };
  try {
    await Sale.create(sale);
    return res.status(200).send("Sale added");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Error adding sale");
  }
});

router.get("/all", async (req, res) => {
  try {
    const allSales = await Sale.find({});
    return res.status(200).json(allSales);
  } catch (error) {
    console.error(error);
    return res.status(400).send("Error fetching sales");
  }
});

router.get("/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  try {
    const roomOnSale = await Sale.findOne({ roomId: roomId });
    return res.status(200).json({
      roomOnSale,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("Error fetching sale");
  }
});

router.delete("/delete-expired", async (req, res) => {
  const now = new Date();
  try {
    const result = await Sale.deleteMany({ tillDate: { $lt: now } });
    return res.status(200).send(`Deleted ${result.deletedCount} expired sales`);
  } catch (error) {
    console.error("Error deleting expired sales:", error);
    return res.status(400).send("Error deleting expired sales");
  }
});

router.delete("/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  try {
    await Sale.findOneAndDelete({ roomId: roomId });
    return res.status(200).send("Sale deleted");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Error deleting sale");
  }
});



module.exports = router;
