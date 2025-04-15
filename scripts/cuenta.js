const regexCorreo = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{1,}$/;
const regexUsuario = /^\w{5,}$/;
const regexNumero = /^\d{10}$/;
const regexVacio = /\s+/g;

const espacioTarjetas = document.getElementById("espacio-tarjetas");
const verTarjetas = document.getElementById("ver-tarjetas");
const btnVolver = document.getElementById("btn-volver");
const mensajeTarjeta = document.getElementById("tarjeta-vacio");

//Recibir todos los datos y ponerlos en cada input
const recibirUsuario = document.getElementById("in-usuario");
const recibirCorreo = document.getElementById("in-correo");
const recibirPass = document.getElementById("in-pass");
const recibirTel = document.getElementById("in-telefono");

//Aqui se van a enlistar las tarjetas
const listaTarjetas = document.getElementById("lista-tarjetas");

//Me guardo esto para cuando tenga tarjetas
function enlistarTarjetas() {
    if (usuarioActual.tarjetas.length != 0) {
        //Hay tarjetas
        mensajeTarjeta.style.display = "none";
        listaTarjetas.innerHTML = '';
        usuarioActual.tarjetas.forEach(tarjeta => {
            const tarjetaFinal = crearElementosTarjetas(tarjeta);
            listaTarjetas.appendChild(tarjetaFinal);
        });
    } else {
        listaTarjetas.innerHTML = '';
        const spanMensaje = document.createElement("span");
        spanMensaje.textContent = "No hay tarjetas registradas";
        spanMensaje.id = "tarjeta-vacio";
        spanMensaje.className = "tarjeta fuente-general fuente-grande";
        listaTarjetas.appendChild(spanMensaje);
    }
}

function crearElementosTarjetas(objTarjeta) {
    const pTarjeta = document.createElement("p");
    pTarjeta.id = objTarjeta.id;
    pTarjeta.className = "tarjeta";
    const spanInfoTarjeta = document.createElement("span");
    spanInfoTarjeta.className = "fuente-general fuente-grande";
    const numeroSpan = document.createElement("span");
    numeroSpan.textContent = objTarjeta.numero;
    const buttonEliminarTarjeta = document.createElement("button");
    buttonEliminarTarjeta.textContent = "Eliminar";
    buttonEliminarTarjeta.onclick = function () {
        eliminarTarjeta(objTarjeta.id);
    }
    buttonEliminarTarjeta.className = "btn-eliminar fuente-general fuente-media";
    spanInfoTarjeta.appendChild(numeroSpan);
    spanInfoTarjeta.appendChild(buttonEliminarTarjeta);
    pTarjeta.appendChild(spanInfoTarjeta);
    return pTarjeta;
}

function eliminarTarjeta(idTarjeta) {
    const unaTarjeta = document.getElementById(idTarjeta);
    unaTarjeta.remove();
    quitarTarjeta(idTarjeta);
    if (usuarioActual.tarjetas.length === 0) {
        listaTarjetas.innerHTML = '';
        const spanMensaje = document.createElement("span");
        spanMensaje.textContent = "No hay tarjetas registradas";
        spanMensaje.id = "tarjeta-vacio";
        spanMensaje.className = "tarjeta fuente-general fuente-grande";
        listaTarjetas.appendChild(spanMensaje);
    }
}

function guardarCambios() {
    let nuevoUsuario = recibirUsuario.value.replace(regexVacio, '').trim();
    let nuevoCorreo = recibirCorreo.value.trim();
    let nuevoPass = recibirPass.value;
    let nuevoTel = recibirTel.value.replace(regexVacio, '').trim();
    let contadorPasa = 0;
    if (regexUsuario.test(nuevoUsuario)) {
        //El usuario es valido, sigue saber si ya existe
        if (buscarUsuario(nuevoUsuario) === null) {
            //Es null, no encontro a un usuario con el nombre
            contadorPasa++;
            recibirUsuario.style.border = "1px solid #CCC";
        } else {
            if (nuevoUsuario === buscarUsuario(nuevoUsuario).usuario) {
                contadorPasa++;
                recibirUsuario.style.border = "1px solid #CCC";
            } else {
                recibirUsuario.style.border = "1px solid red";
            }
        }
    } else {
        recibirUsuario.style.border = "1px solid red";
    }
    //Validar correo
    if (regexCorreo.test(nuevoCorreo)) {
        //El correo es valido, sigue saber si existe
        if (buscarCorreo(nuevoCorreo) === null) {
            //Es null, no encontro a un usuario con el usuario
            contadorPasa++;
            recibirCorreo.style.border = "1px solid #ccc";
        } else {
            if (nuevoCorreo === buscarCorreo(nuevoCorreo).correo) {
                contadorPasa++;
                recibirCorreo.style.border = "1px solid #ccc";
            } else {
                recibirCorreo.style.border = "1px solid red";
            }
        }
    } else {
        recibirCorreo.style.border = "1px solid red";
    }
    //Validar password y su confirmacion
    if (nuevoPass.length > 5) {
        //La pass es suficiente largo
        contadorPasa++;
        recibirPass.style.border = "1px solid #ccc";
    } else {
        recibirPass.style.border = "1px solid red";
    }

    if (regexNumero.test(nuevoTel)) {
        contadorPasa++;
        recibirTel.style.border = "1px solid #ccc";
    } else {
        recibirTel.style.border = "1px solid red";
    }

    if (contadorPasa === 4) {
        //Se manda a agregar, paso todas las pruebas
        editarUsuario(nuevoUsuario, nuevoCorreo, nuevoPass, nuevoTel);
    }
}

function salirCuenta() {
    quitarActual();
    window.location.href = "../index.html";
}

function verTodasTarjetas() {
    enlistarTarjetas();
    espacioTarjetas.style.display = "flex";
}

function dejarDeVer() {
    espacioTarjetas.style.display = "none";
}

function comprobarActual() {
    if (objetoVacio()) {
        //Si es verdad, no hay usuario actual
        iconoSesion.href = "sesion.html";
        iconoReservas.style.display = "none";
    } else {
        //Si hay usuario actual
        iconoSesion.href = "cuenta.html";
        iconoReservas.style.display = "flex";
        cargarDatosUsuario();
    }
}

function cargarDatosUsuario() {
    recibirUsuario.value = usuarioActual.usuario;
    recibirCorreo.value = usuarioActual.correo;
    recibirPass.value = usuarioActual.pass;
    recibirTel.value = usuarioActual.telefono;
}

verTarjetas.addEventListener("click", verTodasTarjetas);
btnVolver.addEventListener("click", dejarDeVer);
document.addEventListener("DOMContentLoaded", comprobarActual);