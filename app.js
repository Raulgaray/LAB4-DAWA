const { log, Console } = require('console')
const express = require ('express')
const app = express()

app.use(express.static(__dirname+'/'));

const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    // Procedimiento 1:
   console.log('un usuario se ha conectado')
})
io.on('connection', (socket) => {
    // Procedimiento 2:
   socket.on('disconnect',() => {
        console.log('Un usuario se ha desconectado')
   })
   
})

io.on('connection', (socket) => {
    // Procedimiento 3:
   socket.on('chat', (msg) => {
        console.log('Mensaje: ' + msg)
    })
})

io.on('connection', (socket) => {
    // Procedimiento 4:
   socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
})

app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/chat_view.html`)
})

server.listen(5000,() => {
    console.log('Servidor corriendo en http://localhost:3000')
})