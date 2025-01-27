const fs = require('fs');
//const { folderPath } = require('./test'); ojo!

function borrarArchivos(autor){
    console.log("delMensajes()---------------------")

    //Leo los archivos de la carpeta que contiene las imágenes
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return console.error('Error al leer la carpeta:', err);
        }else{
             
            //recorro la colección de archivos
            for(let i=0 ; i<files.length ; i++){
                // identifico el autor del archivo
                let cl = files[i].split("-")[1]

                if(cl == autor){  // si el archivo pertence al autor ...
                    
                    fs.unlink(folderPath + "\\" + files[i], (err)=>{
                        if(err){
                            console.log(err.message)
                        }
                    })
                }
            }
        }

        });
}


const path = require('path');

function deleteFilesInFolder(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(`Error reading folder: ${err}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            fs.unlink(filePath, err => {
                if (err) {
                    console.error(`Error deleting file: ${err}`);
                } else {
                    console.log(`Deleted file: ${filePath}`);
                }
            });
        });
    });
}

// Usage
const folderPath = path.join(__dirname, 'public/images');
deleteFilesInFolder(folderPath);


module.exports = {borrarArchivos, deleteFilesInFolder}