const regexVacio = /\s+/g;
//Inputs que se ocupan para validar
const usarUsuario = document.getElementById("usuario-txt");
const usarPass = document.getElementById("password-txt");
//Mensaje de error
const errorInicio = document.getElementById("text-error");
//Ingresar
const botonIngresar = document.getElementById("aceptar-btn");

function validarInicio() {
    let lgUsuario = usarUsuario.value.replace(regexVacio, '').trim();
    let lgPass = usarPass.value;
    let lgEncontrado = buscarUsuario(lgUsuario);
    if (lgEncontrado != null) {
        if (lgEncontrado.pass === lgPass) {
            agregarActual(lgEncontrado);
            errorInicio.style.display = "none";
            window.location.href = "../index.html";
        } else {
            errorInicio.textContent = "Uno de los datos es incorrectos."
            errorInicio.style.display = "block";
        }
    } else {
        errorInicio.textContent = "Uno de los datos es incorrectos."
        errorInicio.style.display = "block";
    }
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

botonIngresar.addEventListener("click", validarInicio);
document.addEventListener("DOMContentLoaded", comprobarActual);