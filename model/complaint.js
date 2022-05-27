const mongoose = require('mongoose')

const transactionHistorySchema = new mongoose.Schema(
    {
        id: {type: String},
        tranId:{type:String},
        date: {type: String},
        amount: {type: String},
        payment: {type: String},
        result: {type: String},
        complaint:{type:String}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Complaint", transactionHistorySchema)