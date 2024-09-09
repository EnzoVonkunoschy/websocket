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
    console.log(data)
    document.getElementById('mensajes2').innerHTML = "<pre>"+JSON.stringify(data)+"</pre>"
    let str = ''
    let clientes = []
    for(var i=0 ; i<data.length ; i++){
        str += `<p>${data[i].texto}</p>`
        data[i].autor=='Farmacia'?clientes.push(data[i].destinatario):clientes.push(data[i].autor)
    }

    console.table(clientes) // id de clientes no repetidos

    document.getElementById('mensajes2').innerHTML = str


    let flag = false
    do{
        pf = clientes.length - 1
        pi = pf - 1
        flag = false
        do{
            if(clientes[pi] == clientes[pf]){
                clientes.splice(pf,1)
                pf = pi
                flag = true
            }
            pi = pi - 1
        }while(0 <= pi)
    }while(flag)

    str = ''
    for(var j=0 ; j<clientes.length ; j++){
        str += "<hr>"
        str += clientes[j]+"<br>"
        for(var i=0 ; i<data.length ; i++){
            if(data[i].autor == clientes[j] || data[i].destinatario == clientes[j]){
                str += `<p>${data[i].texto}</p>`
            }
        }        
    }
    


    document.getElementById('mensajes3').innerHTML = str

        
}

function eliminarRepetidos(vector){
    let flag = false
    do{
        let pf = vector.length - 1
        let pi = pf - 1
        flag = false
        do{
            if(vector[pf] == vector[pi]){
                vector.splice(pf,1)
                pf = pi
                flag = true
            }
            pi = pi - 1
    
        }while(0 <= pi)
    }while(flag)
    return vector
}