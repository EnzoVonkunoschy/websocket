let vector = ["1","2","3","1","2","3"]


    console.log(eliminarRepetidos(vector))

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
