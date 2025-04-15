const contenedorMensaje = document.getElementById("contenedor-mensaje");
const mensaje = document.getElementById("mensaje");
const btnContinuar = document.getElementById("btn-continuar");
const btnReservaciones = document.getElementById("btn-reservaciones");
const direccion = document.getElementById("ir-a");
const botonesReservar = document.querySelectorAll(".btn-reservar");

const habitacionesOcultar = document.querySelectorAll(".contenedor-oculto");
const btnVerMas = document.getElementById("btn-vermas");

function aparecerMensaje() {
    contenedorMensaje.style.display = "flex";
    if (!objetoVacio()) {
        console.log("Hola");
        agregarReserva();
    }
}

function desaparecerMensaje() {
    contenedorMensaje.style.display = "none";
}

function aparecerHabitaciones() {
    for(let contenedor of habitacionesOcultar){
        contenedor.style.display = "block";
        btnVerMas.style.display = "none";
    }
}

function comprobarActual() {
    if (objetoVacio()) {
        //Si es verdad, no hay usuario actual
        mensaje.textContent = "Debes iniciar sesion para guardar reservaciones";
        btnReservaciones.textContent = "Iniciar sesion";
        direccion.href = "html/sesion.html";
        iconoSesion.href = "html/sesion.html";
        for(let boton of botonesReservar){
            boton.onclick = function() {
                aparecerMensaje();
            };
        }
        iconoReservas.style.display = "none";
    }else{
        //Si hay usuario actual
        mensaje.textContent = "Elemento guardado";
        btnReservaciones.textContent = "Ir a reservaciones";
        direccion.href = "html/reservas.html";
        iconoSesion.href = "html/cuenta.html";
        for(let boton of botonesReservar){
            boton.onclick = function() {
                aparecerMensaje();
                //Y otra funcion que agregue las reservaciones
            };
        }
        iconoReservas.style.display = "flex";
    }
}

btnContinuar.addEventListener("click", desaparecerMensaje);
btnVerMas.addEventListener("click", aparecerHabitaciones);
document.addEventListener("DOMContentLoaded", comprobarActual);