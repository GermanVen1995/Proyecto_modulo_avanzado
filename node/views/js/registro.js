var btn=document.getElementById("reg")

function registro(){

    alert("Registrado exitosamente...!!")

}

btn.addEventListener("click",registro)

var btn1=document.getElementById("volver")

function volver(){
    window.location.href="http://localhost:"+3000
}

btn1.addEventListener("click",volver)