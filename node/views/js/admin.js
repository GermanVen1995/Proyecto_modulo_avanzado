var btn1=document.getElementById("cerrar")

function cerrar(){
    window.location.href="http://localhost:"+3000
}

btn1.addEventListener("click",cerrar)

var btn2=document.getElementById("incluir_producto")

function incluir_producto(){
    window.location.href="incluir_producto.html"
}

btn2.addEventListener("click",incluir_producto)

var btn3=document.getElementById("incluir_curso")

function incluir_curso(){
    window.location.href="incluir_curso.html"
}

btn3.addEventListener("click",incluir_curso)