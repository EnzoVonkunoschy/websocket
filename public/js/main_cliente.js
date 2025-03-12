var autorLocal = ''
window.onload = function(){
    autorLocal = localStorage.getItem('str_autorLocal')
    if(!autorLocal){
        const randomNumber = Math.random() * 10**17;
        autorLocal = randomNumber.toString();
        localStorage.setItem('str_autorLocal',autorLocal)
    }
}

function misMensajes(arg){
    //console.log("arg")
    //console.log(arg)
    const misM = arg.filter(x=>(x.autor == 'Farmacia'  && x.destinatario == autorLocal) || x.autor == autorLocal)
    return misM
}

function getDestinatario(){
    return 'Farmacia'
}