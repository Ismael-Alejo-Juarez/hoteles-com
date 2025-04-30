// Comprobar correo
const regexCorreo = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{1,}$/;
const regexUsuario = /^\w{5,}$/;
const regexVacio = /\s+/g;
//Input de cada espacio requerido
const crearUsuario = document.getElementById("new-usuario-txt");
const pedirCorreo = document.getElementById("email-txt");
const crearPass = document.getElementById("create-password-txt");
const confirmPass = document.getElementById("confirm-password-txt");
//Salidas de error de cada espacio
const errorUsuario = document.getElementById("text-error-new-user");
const errorCorreo = document.getElementById("text-error-email");
const errorPass = document.getElementById("text-error-pass");
const errorConfirm = document.getElementById("text-error-confirm-pass");
//Comenzar a validar
const cuentaCreada = document.getElementById("cuenta-creada");
const btnValidar = document.getElementById("rg-aceptar-btn");

function llamarAgregar(rgUsuario, rgCorreo, rgPass) {
    agregarUsuario(rgUsuario, rgCorreo, rgPass);
    crearUsuario.value = "";
    pedirCorreo.value = "";
    crearPass.value = "";
    confirmPass.value = "";
    cuentaCreada.style.color = "green";
    cuentaCreada.style.display = "block";
}

function validarDatos() {
    let rgUsuario = crearUsuario.value.replace(regexVacio, '').trim();
    let rgCorreo = pedirCorreo.value.trim();
    let rgPass = crearPass.value;
    let contadorPasa = 0;
    // Validar usuario
    if (regexUsuario.test(rgUsuario)) {
        //El usuario es valido, sigue saber si ya existe
        if (buscarUsuario(rgUsuario) === null) {
            //Es null, no encontro a un usuario con el nombre
            contadorPasa++;
            errorUsuario.style.display = "none";
        } else {
            errorUsuario.textContent = "El usuario ya está en uso.";
            errorUsuario.style.display = "block";
        }
    } else {
        // ¿Por qué no es válido?
        if(rgUsuario.length < 5){
            errorUsuario.textContent = "El usuario debe tener más de 5 caracteres.";
        }else{
            errorUsuario.textContent = "El usuario no es válido.";
        }
        errorUsuario.style.display = "block";
    }
    //Validar correo
    if (regexCorreo.test(rgCorreo)) {
        //El correo es valido, sigue saber si existe
        if (buscarCorreo(rgCorreo) === null) {
            //Es null, no encontro a un usuario con el usuario
            contadorPasa++;
            errorCorreo.style.display = "none";
        } else {
            errorCorreo.textContent = "El correo ya está en uso.";
            errorCorreo.style.display = "block";
        }
    } else {
        errorCorreo.textContent = "El correo no es válido.";
        errorCorreo.style.display = "block";
    }
    //Validar password y su confirmacion
    if (rgPass.length > 5) {
        //La pass es suficiente largo
        if (rgPass === confirmPass.value) {
            //La pass es igual en ambos campos
            contadorPasa++;
            errorConfirm.style.display = "none";
        }else{
            errorConfirm.textContent = "Las contraseñas no coinciden.";
            errorConfirm.style.display = "block";
        }
        errorPass.style.display = "none";
    }else{
        errorPass.textContent = "La contraseña debe ser tener más de 5 caracteres.";
        errorPass.style.display = "block";
    }

    if (contadorPasa === 3) {
        //Se manda a agregar, paso todas las pruebas
        llamarAgregar(rgUsuario, rgCorreo, rgPass);
    }
}

//Este aqui, no lo ocupo en otro lado


function desactivarMensajeCreado() {
    cuentaCreada.style.display = "none";
}

function comprobarActual() {
    if (objetoVacio()) {
        //Si es verdad, no hay usuario actual
        iconoSesion.href = "sesion.html";
        iconoReservas.style.display = "none";
    }else{
        //Si hay usuario actual
        iconoSesion.href = "cuenta.html";
        iconoReservas.style.display = "flex";
    }
}

crearUsuario.addEventListener("input", desactivarMensajeCreado);
pedirCorreo.addEventListener("input", desactivarMensajeCreado);
crearPass.addEventListener("input", desactivarMensajeCreado);
confirmPass.addEventListener("input", desactivarMensajeCreado);

btnValidar.addEventListener("click", validarDatos);
document.addEventListener("DOMContentLoaded", comprobarActual);
