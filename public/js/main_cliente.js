var autorLocal = ''
window.onload = function(){
    
    const randomNumber = Math.random() * 10**17;
          autorLocal = randomNumber.toString();
    console.log(autorLocal); // Esto será un string
    document.getElementById('miId').innerText = autorLocal
}

function misMensajes(arg){
    console.log("arg")
    console.log(arg)
    const misM = arg.filter(x=>(x.autor == 'Farmacia'  && x.destinatario == autorLocal) || x.autor == autorLocal)
    return misM
}

function getDestinatario(){
    return 'Farmacia'
}