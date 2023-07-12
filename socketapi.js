const io = require("socket.io")();
const users = require('./routes/users')
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
        console.log(currentUser)
    })

    socket.on('newmsg', msg => {
        console.log(msg)
    })
});
// end of socket.io logic

module.exports = socketapi;