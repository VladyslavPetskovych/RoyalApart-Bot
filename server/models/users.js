const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    checkedRooms: {
      type: Object,
      required: true,
    },
    markup: {
      type: String,
    }
  },
  { timestamps: true }
);

const urModel = mongoose.model("users", userSchema);
module.exports = urModel;
