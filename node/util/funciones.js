module.exports={
    obtener_correo:function(correo_usu){
        let object= [{"nombre": "Juan","cedula":"1234567"}]
    if(correo_usu==object[0].correo_usu){
        const res="Su correo es: "+object[0].correo_usu
        return res
    }else{
        const res="Tu correo no es: "+object[0].correo_usu
        return res 
    }
    }
}