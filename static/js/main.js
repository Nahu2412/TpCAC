let activado = false;

function activador(){
    if(!activado){
        activado=true;
    }else{
        activado=false;
    }
}

function accion_menu(){
    activador();
    cambio_icono();
}

function cambio_icono(){
    let abrir = document.getElementById("abrir");
    let cerrar = document.getElementById("cerrar");
    let barra = document.getElementById("nav-place");
    if(activado){
        abrir.style.display="none";
        cerrar.style.display="block"
        barra.style.display="flex"
    }else{
        abrir.style.display="block";
        cerrar.style.display="none";
        barra.style.display="none"
    }
    
}