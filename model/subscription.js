const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema(
  {
    id: { type: String },
    img: { type: String },
    name: { type: String },
    description: { type: String },
    price: {type:String},
    noOfTourna: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("subscription", subscriptionSchema);
