

const socket = io.connect()

socket.on('mensajes',(mensajes)=>{
    console.log('Mensajes recibidos.')
    render(misMensajes(mensajes))
})

function render(mensajes){
    if(autorLocal != 'Farmacia'){
        const html = mensajes.map((mensaje)=>{return `
            <div>
                <b>${mensaje.autor}:</b>
                <i>${mensaje.texto}</i>
                <!--span>${mensaje.destinatario}</span-->
            </div>`
        }).join(' ')

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
    }
    //11-17 borrar campo texto cliente
    document.getElementById('texto').value = "";
    socket.emit('nuevo-mensaje', mensaje)
}
