const mongoose = require("mongoose");

const salesSchema = mongoose.Schema({
  roomId: { type: Number, required: true },
  tillDate: { type: Date, required: true },
  discount: { type: Number, required: true },
});

const salesModel = mongoose.model("sales", salesSchema);
module.exports = salesModel;
