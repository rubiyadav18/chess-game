const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
    {
        id: { type: String },
        pic: { type: String },
        userName: { type: String},
        password: { type: String},
        name: { type: String },
        skillLevel: { type: String },
        description : { type: String },
        country: { type: String }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('profile', profileSchema)