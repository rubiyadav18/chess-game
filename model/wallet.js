const mongoose = require("mongoose");
const walletSchema = new mongoose.Schema(
    {
        id:{type:String},
        balance:{type:String},
        recharge:{type:String},
        payment:{type:String},
        result:{type:String}  //success/failed
    },
    {
    timestamps: true, 
    }
)
module.exports = mongoose.model("wallet", walletSchema);