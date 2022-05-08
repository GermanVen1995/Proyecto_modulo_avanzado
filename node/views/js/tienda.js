var btn=document.getElementById("regresar")

function regresar(){
    window.location.href="http://localhost:"+3000
}

btn.addEventListener("click",regresar)