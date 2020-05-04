const express = require("express")
const socket = require("socket.io")

// app/sever setup
const app = express()
const server = app.listen(80, err => {
    if(err){console.log("Could not connect to server"); return}
    console.log("Server listening...")
})

// static files
app.use(express.static('public'))

// socket setup
const io = socket(server)

// listen to "connection" method (from client), determine specific client-server socket
// socket.io callback does not take err arg?
io.on('connection', (socket) => {
        console.log('made socket connection', socket.id)
        
        // listen for "chat-msg" methods transmitted via this socket
        socket.on('chat-msg', (data) => {
            io.sockets.emit('chat-msg', data) // emit data to all sockets
        })

        // listen for "typing"
        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', data) // broadcast typing
        })
})
