const ShareDB = require('sharedb')
const WebSocketJSONStream = require('websocket-json-stream')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')

/* Setup */
// Static Server
const app = express()
app.use(express.static('/'))

const server = http.createServer(app);

// Socket IO Server
const io = socketio(server)
const anchors = {}
const names = {}
io.on('connection', client => {

    // TODO: Listen for cursor update
    // TODO: Update names as people join and leave

	client.on('disconnect', () => {

	})
})

// Start Server
const port = 80
server.listen(port)
console.log(`listening on port ${port}`)

// Share DB
const share = new ShareDB()
