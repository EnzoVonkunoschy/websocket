

const socket = io.connect()

socket.on('mensajes',(mensajes)=>{
    //console.log('Mensajes recibidos.')
    render(misMensajes(mensajes))
})

function render(mensajes){
    if(autorLocal != 'Farmacia'){

        let html = ""
        for(let i=0 ; i<mensajes.length ; i++){
            if(mensajes[i].autor == 'Farmacia'){
                html +=  `<div style="background-color: lightgreen"><span>${mensajes[i].texto}</span></div>`
            }else{
                html += `<div style="text-align: right;"><span>${mensajes[i].texto}</span></div>`
            }

        }

        document.getElementById('mensajes').innerHTML = html
    }else{
        procesarMensajes(mensajes)
    }
}

document.querySelector('form').addEventListener('submit',addMensaje)

function addMensaje(e){
    e.preventDefault()

    const mensaje = {
        //autor: document.getElementById('autor').value,
        autor: autorLocal,
        //autor: "Enzo",
        texto: document.getElementById('texto').value,
        destinatario: getDestinatario(),
        token: document.getElementById('token').value
    }
    //11-17 borrar campo texto cliente
    document.getElementById('texto').value = "";
    socket.emit('nuevo-mensaje', mensaje)
}
