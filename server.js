const express = require('express')

const app = express()
const http = require('http').Server(app)
const multer = require('multer')

const path = require('path')
console.log(__dirname)
console.log(path.join(__dirname,'public','rata'))

//npm install express socket.io http
const io = require('socket.io')(http)

app.use(express.static('public'))

const mensajes = [{autor: 'Juan', texto: 'Hola que tal...'}]

io.on('connection',(socket)=>{
    console.log("Un cliente se ha conectado")

    socket.emit('mensajes', mensajes)

    socket.on('nuevo-mensaje', (mensaje)=>{
        console.log("Se ha recibido un nuevo mensaje de "+mensaje.autor)
        mensajes.push(mensaje)
        console.log(mensajes)
        io.sockets.emit('mensajes',mensajes)
    })
})


app.get('/',(req, res)=>{
    res.send("Hola desde app!!!")
})



// multer --------------------------------------
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, 'public/images')
        },
        filename: function(req, file, cb){
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
    const upload = multer({storage})
// producto ------------------------------------


app.post('/captura',upload.single('file'),(req, res)=>{

    res.send('Respuesta desde captura')
    //const mensaje = {autor: req.body.autor, destinatario: 'Farmacia', texto: 'Captura', imagen: req.file.filename}
    //const mensaje = {autor: req.body.autor, destinatario: 'Farmacia', texto: '<button>Ok</button>', imagen: req.file.filename}
    //const mensaje = {autor: req.body.autor, destinatario: 'Farmacia', texto: "<a href='http://localhost:8080/images/1729675790868-73974847658526990-captura.png' target='new'>Captura</a>"}
    const mensaje = {autor: req.body.autor, destinatario: 'Farmacia', texto: "<a href='http://localhost:8080/images/"+req.file.filename+"' target='new'>Captura</a>"}
    
    mensajes.push(mensaje)
    
    io.sockets.emit('mensajes',mensajes)
})

app.get('/central',(req,res)=>{
    res.sendFile('central.html',{ root: __dirname + '/public' })
})

const PORT = process.env.PORT || 8080

http.listen(PORT,()=>{console.log(`Escuchando en puerto${PORT}`)})
.on('error',(error)=>{console.log(`Error en servidor. PORT = ${PORT}`)})