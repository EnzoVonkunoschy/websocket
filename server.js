const express = require('express')

const app = express()
const http = require('http').Server(app)
const multer = require('multer')

const path = require('path')
console.log(__dirname)
console.log(path.join(__dirname,'public'))

//npm install express socket.io http
const io = require('socket.io')(http)

// Ruta --------------------------------------
var estaUrl = path.join(__dirname);
var _url = "";
console.log(estaUrl)

let produccion = false
if(estaUrl[0] == "C" && estaUrl[1] == ":"){
    produccion = false;
}else{
    produccion = true;
}

if(produccion){
    _url = "https://"+process.env.RAILWAY_PUBLIC_DOMAIN+"/";
}else{
    _url = "http://localhost:8080/";
}
console.log(produccion)

app.use(express.static('public'))
// Motor de plantillas ------------------------
app.set('view engine', 'ejs');




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
    //res.send("Hola desde app!!!")
    res.render('index.ejs',{url: _url})
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
    console.log(JSON.stringify(storage))
    const upload = multer({storage})
// producto ------------------------------------


app.post('/captura',upload.single('file'),(req, res)=>{
    console.log("Llegó una captura: "+JSON.stringify(req.file))
    res.send('Respuesta desde captura')
    //const mensaje = {autor: req.body.autor, destinatario: 'Farmacia', texto: 'Captura', imagen: req.file.filename}
    //const mensaje = {autor: req.body.autor, destinatario: 'Farmacia', texto: '<button>Ok</button>', imagen: req.file.filename}
    //const mensaje = {autor: req.body.autor, destinatario: 'Farmacia', texto: "<a href='http://localhost:8080/images/1729675790868-73974847658526990-captura.png' target='new'>Captura</a>"}
    const mensaje = {autor: req.body.autor, destinatario: 'Farmacia', texto: "<a href='"+_url+"images/"+req.file.filename+"' target='new'>Captura</a>"}
    
    
    mensajes.push(mensaje)
    
    io.sockets.emit('mensajes',mensajes)
})

app.get('/central',(req,res)=>{
    res.sendFile('central.html',{ root: __dirname + '/public' })
})

const PORT = process.env.PORT || 8080

http.listen(PORT,()=>{console.log(`Escuchando en puerto${PORT}`)})
.on('error',(error)=>{console.log(`Error en servidor. PORT = ${PORT}`)})