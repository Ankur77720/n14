const mongoose = require('mongoose')

var chatSchema = mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    msg: String,
    time: Number,
})

module.exports = mongoose.model('chat', chatSchema)