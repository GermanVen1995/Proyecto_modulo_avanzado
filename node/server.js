require("./util/database")()
const conn = connection()

const express = require("express")
const bcrypt  = require("bcrypt")
const jwt     = require("jsonwebtoken")
const path    = require("path")
const parser  = require("body-parser")
const app     = express()
const port    = 3000
let nivel_acceso = ""

//motor de renderizado
app.set("views",path.join(__dirname,"/views"))  //establecer motor de vistas
app.engine("ejs", require("ejs").__express)  //establecer motor de renderizado
app.set("view engine", "ejs")  //establecer condiciones de los archivos
app.use(express.static(__dirname+"/views"))  //para usar css o bootstrap, static= carpeta publica
app.use(parser.urlencoded({extended:true}))

app.get("/", function(req,res){
  res.render("principal")
})

app.listen(port, () => {
  conn.connect(function(err){
    if(err)throw err 
    console.log("servidor corriendo en http://localhost:"+port)
  })
})

//ruta raiz del servidor y parametros
app.get("/agregarUser/:usuario/:psw",function(req,res){
    let {usuario,psw}=req.params
    res.send({usuario,psw})
})

//ruta para validar parametros
app.get("/ValidarUser/:correo_usu/:psw",function(req,res){
    let {correo_usu,psw} = req.params
    let user=[
        "german@gmail.com",
        "123"
    ]
    if(user[0]==correo_usu && user[1]==psw){
        res.send("Hola bienvenido")
    }else{
        res.send("Datos incorrectos")
    }
})

app.get("/acceder", function(req,res){
  res.render("login")
})

app.post("/informatica/usuarios", function(req,res){
  const nom=req.body.nom
  const nom_usu=req.body.nom_usu
  const apell_usu=req.body.apell_usu
  const correo_usu=req.body.correo_usu
  const niv_acc=req.body.niv_acc
  const psw=req.body.psw

  bcrypt.hash(psw, 10, function(err,hash){
      if(err){
          throw err
      }else{
      var sql=`INSERT INTO usuarios(nom,nom_usu,apell_usu,correo_usu,niv_acc,psw) VALUES ("${nom}","${nom_usu}","${apell_usu}","${correo_usu}","${niv_acc}","${hash}");`
  conn.query(sql,function(err,data,fields){
      if(err) throw err
      res.redirect("/acceder")
              })
          }
  })
})

app.get("/views", function(req,res){
  if (nivel_acceso=="admin") {
    res.render("admin")
  } else if (nivel_acceso=="usuario") {
    res.render("index1")
  } else {
    res.send("primero inicia sesion")
  }
})

app.post("/informatica/cursos", function(req,res){
  const cod_cur=req.body.cod_cur
  const comp_cur=req.body.comp_cur
  const nom_cur=req.body.nom_cur
  const mod_cur=req.body.mod_cur
  const dur_cur=req.body.dur_cur
  const mone_cur=req.body.mone_cur
  const pre_cur=req.body.pre_cur

  var sql=`INSERT INTO cursos(cod_cur,comp_cur,nom_cur,mod_cur,dur_cur,mone_cur,pre_cur) VALUES ("${cod_cur}","${comp_cur}","${nom_cur}","${mod_cur}","${dur_cur}","${mone_cur}","${pre_cur}");`
  conn.query(sql,function(err,data,fields){
      if(err) throw err
      res.redirect("/views")
  })
})

app.post("/informatica/productos", function(req,res){
  const cod_pro=req.body.cod_pro
  const comp_pro=req.body.comp_pro
  const nom_pro=req.body.nom_pro
  const model_pro=req.body.model_pro
  const can_pro=req.body.can_pro
  const mone_pro=req.body.mone_pro
  const pre_pro=req.body.pre_pro

  var sql=`INSERT INTO productos(cod_pro,comp_pro,nom_pro,model_pro,can_pro,mone_pro,pre_pro) VALUES ("${cod_pro}","${comp_pro}","${nom_pro}","${model_pro}","${can_pro}","${mone_pro}","${pre_pro}");`
  conn.query(sql,function(err,data,fields){
      if(err) throw err
      res.redirect("/views")
  })
})

app.get("/views", function(req,res){
  res.render("admin")
})

app.post("/validar", async function(req, res){
  const { correo_usu,psw } = req.body
  const sql = `SELECT * FROM usuarios WHERE correo_usu = "${correo_usu}";`
  
  let isAuth = false

  await conn.query(sql, function(err, data){
    if(err) throw err
    console.log(data)
    new Promise(function(resolve, reject){
      bcrypt.compare(psw, data[0].psw, function(err, res){
        if(err) throw err
        if(res){
          isAuth = true
          resolve(isAuth)
        }
        reject(isAuth)
      })
    })
    .then(function(result){
      nivel_acceso = data[0].niv_acc
      isAuth == result ? res.redirect("/views") : console.log("contraseña es incorrecta")
    })
    .catch(function(err){
      res.send("Contraseña incorrecta")
    })
  })
})