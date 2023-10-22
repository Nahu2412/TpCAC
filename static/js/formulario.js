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

const validacion = (event) =>{
    event.preventDefault();
    let nombre = document.querySelector("#nombre");
    let correo = document.querySelector("#correo");
    let ciudad = document.querySelector("#Ciudad");
    let provincia = document.querySelector("#Provincia");

    if(nombre.value==""){
        crear_advertencia("name-form","Por favor ingresa un nombre",nombre,true);
        return false;
    }
    if(correo.value==""){
        crear_advertencia("correo-form","Por favor ingresa un correo valido",correo,true);
        return false;
    }
    if(ciudad.value==""){
        crear_advertencia("Ciudad-form","Ingresa una ciudad",ciudad,true);
        return false;
    }
    if(provincia.value==""){
        crear_advertencia("Provincia-form","Ingresa una provincia",provincia,true);
        return false;
    }
    console.log("Formulario completo");
    
}


formulario.addEventListener('submit',validacion);