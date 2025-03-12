const Modelo = require('./modelo.js')
const fs = require('fs');

function delFile(arg){
    fs.unlink("public/images/" + arg ,(err)=>{
        console.log(err.message)
    })
}

//delFile()




var mensajes_test = [
    {
      autor: '30449928377180256',
      texto: 'Soy el cliente 1',
      destinatario: 'Farmacia'
    },
    {
      autor: '95733093979833680',
      texto: 'Soy el cliente 2',
      destinatario: 'Farmacia'
    },
    {
      autor: 'Farmacia',
      texto: 'Hola Cliente 1',
      destinatario: '30449928377180256'
    },
    {
      autor: 'Farmacia',
      texto: 'Hola Cliente 2',
      destinatario: '95733093979833680'
    },
    {
      autor: '19188584228316730',
      destinatario: 'Farmacia',
      texto: "<a href='http://localhost:8080/images/1735951943389-30449928377180256-captura.png' target='new'>Captura</a>",
      imagen: '1735951943389-30449928377180256-captura.png'
    },
    {
      autor: '19188584228316730',
      destinatario: 'Farmacia',
      texto: "<a href='http://localhost:8080/images/1735951962398-95733093979833680-captura.png' target='new'>Captura</a>",
      imagen: '1735388722877-19188584228316730-captura.png'
    },
    {
      autor: 'Farmacia',
      texto: '¿Estás allí?',
      destinatario: '30449928377180256'
    },
    {
      autor: 'Farmacia',
      texto: '¿Estás allí?',
      destinatario: '95733093979833680'
    }
  ]

const folderPath = './public/images';
exports.folderPath = folderPath;

function delMensajes(cliente, mensajes){
    console.log("delMensajes()---------------------")

    //Leo los archivos de la carpeta que contiene las imágenes
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return console.error('Error al leer la carpeta:', err);
        }else{
             
            //Identifico el archivo asociado con el cliente
            for(let i=0 ; i<files.length ; i++){
                
                let cl = files[i].split("-")[1]
{}
                if(cl == cliente){  // si el archivo pertence al cliente ...
                    
                    fs.unlink(folderPath + "\\" + files[i], (err)=>{
                        if(err){
                            console.log(err.message)
                        }
                    })
                }
            }
        }

        });

    let mensajesFiltrados = mensajes.filter(x=>x.autor == cliente || x.destinatario == cliente)

    return mensajesFiltrados;
}
console.log(mensajes_test)
console.log("---separador--------------------")
console.log(delMensajes('48183099612589150',mensajes_test))

//const folderPath = './public/images';

function leerCarpeta(){
    fs.readdir(folderPath, (err, files) => {
    if (err) {
        return console.error('Error al leer la carpeta:', err);
    }
    console.log('Archivos en la carpeta:', files);
    });
}

//leerCarpeta()


let vector = ["1","2","3","1","2","3"]

//console.log(eliminarRepetidos(vector))

function eliminarRepetidos(vector){
    let flag = false
    do{
        let pf = vector.length - 1
        let pi = pf - 1
        flag = false
        do{
            if(vector[pf] == vector[pi]){
                vector.splice(vector[pf],1)
                pf = pi
                flag = true
            }
            pi = pi - 1
    
        }while(0 <= pi)
    }while(flag)
    return vector
}
