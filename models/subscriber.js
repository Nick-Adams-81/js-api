const mongoose = require("mongoose")
// subscriber schema
const subscriberSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    subscribedToChanel: {
        type: String,
        required: true
    },

    subscribedDate: {
        type: Date,
        required: true,
        default: Date.now

    }
})

module.exports = mongoose.model("subscriber", subscriberSchema)
