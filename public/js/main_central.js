var autorLocal = 'Farmacia'

function misMensajes(arg){
    console.log("arg")
    console.log(arg)
    const misM = arg.filter(x=>x.autor != 'Farmacia')
    return arg
}

function getDestinatario(){
    return document.getElementById('destinatario').value
}