const ShareDB = require('sharedb')
ShareDB.types.register(require('ot-text').type)
const WebSocket = require('ws')
const WebSocketJSONStream = require('websocket-json-stream')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')

/* Setup */
// Static Server
const app = express()
app.use((res, req, next) => {
    const sharedoc = shareconn.get('docs', res.query.doc || 'default')
    if (!sharedoc.data) sharedoc.create("HELLO\n\nTEST", 'text');

    next()
})
app.use('/', express.static('./'))

const server = http.createServer(app);

// Socket IO Server
const io = socketio(server)
const anchors = {}
const names = {}
io.on('connection', client => {

    const id = client.id
    names[id] = String.fromCharCode(Math.floor('A'.charCodeAt(0) + Math.random() * 26))
    anchors[id] = [0, 0]

    // send client its id and anchor and names obj
    client.emit('initialize', { anchors, names })
    
    client.on('anchor-update', msg => {
        // set anchors[id]
        anchors[id] = msg
        io.emit('anchor-update', { id, anchor: anchors[id] })
    })

    io.emit('id-join', { id, name: names[id], anchor: anchors[id] })

    // Remove id info and update clients
    // TODO: This doesn't seem to always get called
    // Mashing resfresh on a page seems to leave lingering
    // connections
    client.on('disconnect', () => {
        console.log('left', id)
        delete names[id]
        delete anchors[id]
        io.emit('id-left', { id })
    })
})

// Start Server
const port = 80
server.listen(port)
console.log(`listening on port ${port}`)

// Share DB
const share = new ShareDB()
const shareconn = share.connect()

const shareserver = http.createServer()
const sharewss = new WebSocket.Server({ server: shareserver })
sharewss.on('connection', client => {
    share.listen(new WebSocketJSONStream(client))
})
shareserver.listen(8080)

console.log(`ShareDB listening on port 8080`)