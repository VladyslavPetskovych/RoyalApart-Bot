const mongoose = require("mongoose");

const advertSchema = mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    imgurl: { type: String },
  },
  { timestamps: true }
);

const advertModel = mongoose.model("adverts", advertSchema);
module.exports = advertModel;
