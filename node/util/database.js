module.exports=function(){
    this.connection=function(){
       const mysql=require("mysql")
       var conexion=mysql.createConnection({
           host:"localhost",
           user:"root",
           password:"",
           database:"informatica"
       })
       return conexion     
    }
}