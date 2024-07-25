const socket = io.connect()

socket.on('mensajes',(mensajes)=>{
    render(mensajes)
})

function render(mensajes){
    const html = mensajes.map((mensaje)=>{return `
        <div>
            <b>${mensaje.autor}:</b>
            <i>${mensaje.texto}</i>
        </div>`
    }).join(' ')

    document.getElementById('mensajes').innerHTML = html
}

document.querySelector('form').addEventListener('submit',addMensaje)

function addMensaje(e){
    e.preventDefault()

    const mensaje = {
        autor: document.getElementById('autor').value,
        texto: document.getElementById('texto').value,
    }

    socket.emit('nuevo-mensaje', mensaje)
}
