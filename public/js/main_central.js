

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

function procesarMensajes(data){
    console.log("data")
    console.log(data)

    /* contruyo una tabla con data */
    let str = ''
    for(let i=0 ; i<data.length ; i++){
        str = str + `<tr><td>${data[i].autor}</td><td>${data[i].texto}</td><td>${data[i].destinatario}</td></tr>`
    }

    str =  `<table border> ${str} </table>`
    //document.getElementById('mensajes2').innerHTML = str

    /* hago una lista con todos los clientes */
    let clientes = []
    for(var i=0 ; i<data.length ; i++){
        data[i].autor=='Farmacia'?clientes.push(data[i].destinatario):clientes.push(data[i].autor)
    }
    console.table("clientes") 
    console.table(clientes) 

    let clientes_ = eliminarRepetidos(clientes)
    //let clientes_ = clientes
    console.table(clientes_)

    /* Construyo la tabla ordenada por clientes */
    str = ''
    for(let j=0 ; j<clientes_.length ; j++){
        
        /* contruyo una tabla con data */
        let str2 = ''
        for(let i=0 ; i<data.length ; i++){
            if(data[i].autor == clientes_[j] || data[i].destinatario == clientes_[j]){
                str2 = str2 + `<tr><td>${data[i].autor}</td><td>${data[i].texto}</td><td>${data[i].destinatario}</td></tr>`
            }
        }
        //str2 += "<tr><td><input type='text' id='miId'></td></tr>"
        str2 += `<tr><td><input type='text' id='txt${clientes_[j]}'><button id='${clientes_[j]}' carga='hola' onclick='enviar2(this)'>Enviar</button></td></tr>`
        
          str = str + `<table border> ${str2} </table><hr>`
    }
      
    document.getElementById('mensajes3').innerHTML = str  
}

function enviar2(arg){
    let cli = (arg.getAttribute('id'));

    document.getElementById('autor').value='Farmacia'
    document.getElementById('texto').value=  document.getElementById('txt'+cli).value//document.getElementById('otroTexto')
    document.getElementById('destinatario').value= cli
    document.getElementById('enviarx').click()

}

function eliminarRepetidos(vector){
    return Array.from(new Set(vector))

}