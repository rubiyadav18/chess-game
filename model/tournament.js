const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema(
    {
        name: { type: String },
        id: { type: String },
        games: { type : String },
        prize : { type: String },
        time: { type: String }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('tournament', tournamentSchema)