const formulario = document.querySelector('#contact-register');

const crear_advertencia=(divId,texto,input_id,is_dual)=>{
    let p = document.createElement('p');
    let id_c = "#"+divId;
    let container = document.querySelector(id_c+"-container");
    p.className ="advInsert";
    p.innerHTML = texto;
    container.innerHTML="";
    container.insertAdjacentElement('beforeend',p);
    if(is_dual){
        input_id.className = "error-dual";
    }else{
        input_id.className = "error";
    }
    
}
const eliminar_advertencia=(divId,input_id,is_dual)=>{
    let id_c = "#"+divId;
    let container = document.querySelector(id_c+"-container");
    container.innerHTML = "";
    if(is_dual){
        input_id.className = "input-s-style";
    }else{
        input_id.className = "inputstyle";
    }
}

const validacion = (event) =>{
    event.preventDefault();
    let error = false;
    let nombre = document.querySelector("#nombre");
    let correo = document.querySelector("#correo");
    let ciudad = document.querySelector("#Ciudad");
    let provincia = document.querySelector("#Provincia");

    if(nombre.value==""){
        crear_advertencia("name-form","Por favor ingresa un nombre",nombre,true);
        error=true;
    }else{
        eliminar_advertencia("name-form",nombre,true);
    }
    if(correo.value==""){
        crear_advertencia("correo-form","Por favor ingresa un correo valido",correo,true);
        error=true;
    }else{
        eliminar_advertencia("correo-form",correo,true);
    }
    if(ciudad.value==""){
        crear_advertencia("Ciudad-form","Ingresa una ciudad",ciudad,true);
        error=true;
    }else{
        eliminar_advertencia("Ciudad-form",ciudad,true);
    }
    if(provincia.value==""){
        crear_advertencia("Provincia-form","Ingresa una provincia",provincia,true);
        error=true;
    }else{
        eliminar_advertencia("Provincia-form",provincia,true);
    }
    if(error){
        alert("Completa todos los campos obligatorios");
        return false
    }
    alert("Gracias por completar el formulario, en la brevedad nos pondremos en contacto.");
}


formulario.addEventListener('submit',validacion);