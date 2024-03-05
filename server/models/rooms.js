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
    wubid: { type: Number },
    imgurl: [],
    globalId: {
      type: Number,
    },
    floor: {
      type: Number,
    },
    beds: {
      type: Number,
    },
    surface:{
      type: Number,
    },
    guests: {
      type: Number,
    },
    currentbookings: [],
  },
  { timestamps: true }
);

const rmModel = mongoose.model("aparts", roomSchema);
module.exports = rmModel;
