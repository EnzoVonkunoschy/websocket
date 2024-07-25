const express = require('express')

const app = express()
const http = require('http').Server(app)

//npm install express socket.io http
const io = require('socket.io')(http)

app.use(express.static('public'))

const mensajes = [{autor: 'Juan', texto: 'Hola que tal...'}]

io.on('connection',(socket)=>{
    console.log("Un cliente se ha conectado")

    socket.emit('mensajes', mensajes)

    socket.on('nuevo-mensaje', (mensaje)=>{
        
        mensajes.push(mensaje)
        
        io.sockets.emit('mensajes',mensajes)
    })
})


app.get('/',(req, res)=>{
    res.send("Hola desde app!!!")
})

const PORT = 3000

http.listen(PORT,()=>{console.log(`Escuchando en puerto${PORT}`)})
.on('error',(error)=>{console.log(`Error en servidor. PORT = ${PORT}`)})