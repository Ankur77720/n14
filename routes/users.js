const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

var userschema = mongoose.Schema({
  username: String,
  pic: String,
  friends: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  } ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  currentSocket: String,
})

userschema.plugin(plm)

module.exports = mongoose.model('user', userschema)