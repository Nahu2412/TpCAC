const formulario = document.querySelector('#contact-register');

const crear_advertencia=(divId,texto,input_id)=>{
    let p = document.createElement('p');
    let id_c = "#"+divId;
    let container = document.querySelector(id_c+"-container");
    p.className ="advInsert";
    p.innerHTML = texto;
    container.innerHTML="";
    container.insertAdjacentElement('beforeend',p);
    input_id.className = "error";
}

const validacion = (event) =>{
    event.preventDefault();
    let nombre = document.querySelector("#nombre");
    let correo = document.querySelector("#correo");
    let mensaje = document.querySelector("#mensaje");
    if(nombre.value==""){
        crear_advertencia("name-form","Por favor ingresa un nombre",nombre);
        return false;
    }
    if(correo.value==""){
        crear_advertencia("correo-form","Por favor ingresa un correo valido",correo);
        return false;
    }
    if(mensaje.value==""){
        crear_advertencia("mensaje-form","No te olvides de dejar tu mensaje",mensaje)
        return false;
    }
    console.log(nombre.value);
    
}


formulario.addEventListener('submit',validacion);