const StaticServer = require('static-server')
const ShareDB = require('sharedb')
const WebSocketJSONStream = require('websocket-json-stream')
const socketio = require('socket.io')

// Static Server
const server = new StaticServer({ rootPath: '.', port: 80 })
server.start(() => console.log(`listening on port ${server.port}`))

// Socket IO Server
// TODO: How to merge static-server and io server?
const ioserver = require('http').createServer();
const io = socketio(ioserver)
io.on('connection', client => {

	client.on('disconnect', () => {

	})
})

ioserver.listen(8080)

// Share DB
const share = new ShareDB()
