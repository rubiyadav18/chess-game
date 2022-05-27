const mongoose = require('mongoose')

const gameHistorySchema = new mongoose.Schema(
    {
        id: {type: String},
        date: {type: String},
        players: {
            player1: {name1:{type: String}, result1:{type: String}},
            player2: {name2:{type: String}, result2:{type: String}},
            player3: {name3:{type: String}, result3:{type: String}},
            player4: {name4:{type: String}, result4:{type: String}},
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('gamehistory', gameHistorySchema)

