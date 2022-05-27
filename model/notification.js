const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
    {
        id: { type: String },
        description: { type: String }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('notification', notificationSchema)