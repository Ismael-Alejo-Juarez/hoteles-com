const mensajePago = document.getElementById("contenedor-mensaje");
const procederPago = document.getElementById("btn-pagar");
const cancelarPago = document.getElementById("btn-aceptar");

//Si esta vacio - No hay reservas
const mensajeVacio = document.getElementById("mensaje-reserva-vacio");
const tarjetasVacio = document.getElementById("espacio-vacio");

//Contenedor, en este se ponen todos los demas elementos
const cajaReservas = document.querySelector(".registro-reservas");
const espacioTarjetas = document.getElementById("espacio-tarjetas");

function listarReserva() {
    if (usuarioActual.reservaciones.length != 0) {
        //Vaciar todo antes de meter objetos
        cajaReservas.innerHTML = '';
        //Existen reservas
        usuarioActual.reservaciones.forEach(reserva => {
            const reservaCompleta = crearElementosReservas(reserva);
            cajaReservas.appendChild(reservaCompleta);
        });
    }else{
        const mensajeVacioNuevo = document.createElement("div");
        mensajeVacioNuevo.id = "mensaje-reserva-vacio";
        const spanMensaje = document.createElement("span");
        spanMensaje.textContent = "Aun no has agregado nada a tus reservas";
        spanMensaje.className = "fuente-general fuente-grande";
        const enlaceIndex = document.createElement("a");
        const botonIndex = document.createElement("button");
        botonIndex.textContent = "Agregar habitaciones";
        botonIndex.className = "fuente-general fuente-grande";
        enlaceIndex.href = "../index.html";
        enlaceIndex.appendChild(botonIndex);
        mensajeVacioNuevo.appendChild(spanMensaje);
        mensajeVacioNuevo.appendChild(enlaceIndex);
        cajaReservas.appendChild(mensajeVacioNuevo);
        mensajeVacioNuevo.style.display = "flex";
        mensajeVacioNuevo.style.flexDirection = "column";
    }
}

function crearElementosReservas(objReserva) {
    const divReserva = document.createElement("div");
    divReserva.id = objReserva.id;
    divReserva.className = "reserva";
    const divImgReserva = document.createElement("div");
    divImgReserva.className = "img-reserva";
    const divTxtReserva = document.createElement("div");
    divTxtReserva.className = "txt-reserva";
    
    //dentro de txt-reserva
    const tituloHbt = document.createElement("span");
    tituloHbt.textContent = objReserva.nombre;
    const categoriaHbt = document.createElement("span");
    categoriaHbt.textContent = objReserva.categoria;
    const ubicacionHbt = document.createElement("span");
    ubicacionHbt.textContent = objReserva.ubicacion;
    const capacidadHbt = document.createElement("span");
    capacidadHbt.textContent = objReserva.capacidad;
    //Este lleva un boton dentro
    const precioHbt = document.createElement("span");
    const precioSpan = document.createElement("span");
    precioSpan.textContent = objReserva.precio;
    const eliminarHbt = document.createElement("button");
    eliminarHbt.textContent = "Eliminar";
    eliminarHbt.onclick = function() {
        eliminarReserva(objReserva.id);
    }

    tituloHbt.className = "titulo-reserva fuente-general fuente-grande";
    categoriaHbt.className = "detalle-reserva fuente-general fuente-media";
    ubicacionHbt.className = "detalle-reserva fuente-general fuente-media";
    capacidadHbt.className = "detalle-reserva fuente-general fuente-media";
    precioHbt.className = "precio-reserva fuente-general fuente-grande";

    precioHbt.appendChild(eliminarHbt);
    precioHbt.appendChild(precioSpan);

    divTxtReserva.appendChild(tituloHbt);
    divTxtReserva.appendChild(categoriaHbt);
    divTxtReserva.appendChild(ubicacionHbt);
    divTxtReserva.appendChild(capacidadHbt);
    divTxtReserva.appendChild(precioHbt);
    divReserva.appendChild(divImgReserva);
    divReserva.appendChild(divTxtReserva);
    return divReserva;
}

function eliminarReserva(idReserva) {
    const divEliminar = document.getElementById(idReserva);
    divEliminar.remove();
    quitarReserva(idReserva);
}

function aparecerMensaje() {
    enlistaTarjetas();
    mensajePago.style.display = "flex";
}

function desaparecerMensaje() {
    mensajePago.style.display = "none";
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
        listarReserva();
    }
}

function enlistaTarjetas() {
    if (usuarioActual.tarjetas.length != 0) {
        //Hay tarjetas
        espacioTarjetas.innerHTML = '';
        usuarioActual.tarjetas.forEach(tarjeta => {
            const botonPagar = document.createElement("button");
            botonPagar.className = "boton-pagar fuente-general fuente-media";
            botonPagar.textContent = tarjeta.numero;
            botonPagar.type = "button";
            botonPagar.onclick = function(){
                pagarTodo();
            }
            espacioTarjetas.appendChild(botonPagar);
        });
    }else{
        espacioTarjetas.innerHTML = '';
        const spanMensaje = document.createElement("span");
        spanMensaje.textContent = "No tienes ninguna tarjeta registrada";
        spanMensaje.id = "espacio-vacio";
        spanMensaje.className = "fuente-general fuente-grande";
        espacioTarjetas.appendChild(spanMensaje);
    }
}

procederPago.addEventListener("click", aparecerMensaje);
cancelarPago.addEventListener("click", desaparecerMensaje);
document.addEventListener("DOMContentLoaded", comprobarActual);