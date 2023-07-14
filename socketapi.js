const io = require("socket.io")();
const users = require('./routes/users')
const chat = require('./routes/chat')
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on('newUserConnected', async msg => {
        var currentUser = await users.findOne({
            username: msg.user
        })
        currentUser.currentSocket = socket.id
        await currentUser.save()
    })

    socket.on('newmsg', async msg => {

        var fromUser = await users.findOne({
            username: msg.fromUser
        })
        msg.fromUserPic = fromUser.pic
        var toUser = await users.findOne({
            username: msg.toUser
        })

        var newChat = await chat.create({
            msg: msg.data,
            fromUser: fromUser._id,
            toUser: toUser._id,
            time: Date.now()
        })
        if (toUser.currentSocket) {
            socket.to(toUser.currentSocket).emit('newmsg', msg)
        }
        else {
            console.log('to user offline')
        }
        console.log(newChat)
        // console.log(msg)
    })
});
// end of socket.io logic

module.exports = socketapi;