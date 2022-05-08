var btn1=document.getElementById("crear")

function crear(){
    window.location.href="Registro.html"
}

btn1.addEventListener("click",crear)

var btn2=document.getElementById("volver")

function volver(){
    window.location.href="http://localhost:"+3000
}

btn2.addEventListener("click",volver)