const express = require('express')
const app = require('express')()
const path = require('path')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
        allowEIO4: true
    },
    transport: ['websocket']
});

io.on('connection', socket => {
    socket.on('message', ({ name, message }) => {
        io.emit('message', { name, message })
    })
})

app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')))

http.listen(4000, function () {
    console.log('listening on port 4000')
})