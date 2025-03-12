

var autorLocal = 'Farmacia'

function misMensajes(arg){
    //console.log("arg")
    //console.log(arg)
    const misM = arg.filter(x=>x.autor != 'Farmacia')
    return arg
}

function getDestinatario(){
    return document.getElementById('destinatario').value
}

function procesarMensajes(data){
    //console.log("data")
    //console.log(data)

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
                if(data[i].autor == 'Farmacia'){
                    str2 +=  `<div style="background-color: lightgreen"><span>${data[i].texto}</span></div>`
                }else{
                    str2 += `<div style="text-align: right;"><span>${data[i].texto}</span></div>`
                }
            }
        }
        
        str2 += `
        <br>
            <p style='display: flex; justify-content: center;'>
                <input type='text' id='txt${clientes_[j]}' style= 'width: 95%;border-radius: 10px; font-size: 1.5em; margin: 0 auto'>
            </p>
        <br>
        <p  style="display: flex; justify-content: space-between;">
        <button id='eliminarChat_${clientes_[j]}' onclick='eliminarChat(this)' style='width: 45%;background-color: red; color: white;' >Eliminar Chat</button>
        <button id='${clientes_[j]}'              onclick='enviar2(this)'      style='width: 45%;'>Enviar</button>
        </p>`
        
          //str = str + `<div style='border: 1px;'>${str2}</div> `
          str = str + `<div style="border: 1px solid darkgrey; border-radius: 10px;">${str2}</div><br>
 `
    }
      
    document.getElementById('mensajes3').innerHTML = str  
}

function eliminarChat(arg){

    if (confirm("¿Estás seguro de que deseas continuar?")) {
        let autor = arg.getAttribute('id').split('_')[1]
        //console.log(autor);
    
        document.getElementById('autor').value='Farmacia'
        document.getElementById('texto').value=  '__borrar__'
        document.getElementById('destinatario').value= autor
        document.getElementById('token').value = token
        document.getElementById('enviarx').click()
    } else {

    }
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