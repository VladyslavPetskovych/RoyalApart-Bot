const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    numrooms: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgurl: [],
    currentbookings: [],
  },
  { timestamps: true }
);

const rmModel = 'dfdfd' //mongoose.model("aparts", roomSchema);
module.exports = rmModel;
