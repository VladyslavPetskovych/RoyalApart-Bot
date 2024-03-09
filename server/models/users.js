const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    checkedRooms: {
      type: Object,
    },
    markup: {
      type: String,
    },
    lastMessage: { type: String },
    insexr: {
      type: Number,
    },
    chkin:{type: String},
    chkout:{type: String},
    roomsid: [],
  },
  { timestamps: true }
);

const urModel = mongoose.model("users", userSchema);
module.exports = urModel;
