const mongoose = require("mongoose");
const subscriptionRefundSchema = new mongoose.Schema(
  {
    userId: { type: String },
    id: { type: String },
    plan: { type: Array },
    reason: { type: String },
    accept:{type:Boolean,default:false},
    status:{type:String}  //success/failed
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("subscriptionRefund", subscriptionRefundSchema);
