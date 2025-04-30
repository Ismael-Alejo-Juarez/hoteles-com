//Regex
const regexTarjeta = /^\d{16}$/;
const regexVencimiento = /^(0[1-9]|[12][0-2])\/(\d){2}$/;
const regexCodigo = /^\d{3}$/;
const regexNumero = /^\d{10}$/;
const regexVacio = /\s+/g;
//Obtener los inputs de cada dato
const numeroTarjeta = document.getElementById("numbercard-txt");
const vencimientoTarjeta = document.getElementById("vencimiento-txt");
const cvvTarjeta = document.getElementById("cvv-txt");
const telefonoUsuario = document.getElementById("telefono-txt");
//Mensajes de error de cada input
const errorNumero = document.getElementById("text-error-card");
const errorVencimiento = document.getElementById("text-error-vencimiento");
const errorCvv = document.getElementById("text-error-cvv");
const errorTelefono = document.getElementById("text-error-tel");
//Comenzar a validar
const botonValidar = document.getElementById("tr-aceptar-btn");

function validarDatos() {
    let numeroT = numeroTarjeta.value.replace(regexVacio, '').trim();
    let vencimientoT = vencimientoTarjeta.value.trim();
    let cvvT = cvvTarjeta.value.trim();
    let telefonoT = telefonoUsuario.value.replace(regexVacio, '').trim();
    let buscarT = buscarTarjeta(numeroT);
    let contadorBuenas = 0;
    if (regexTarjeta.test(numeroT)) {
        //Es valido, tengo que verificar si no se ha usado
        if (buscarT === null) {
            //No existe
            contadorBuenas++;
            errorNumero.style.display = "none";
        } else {
            errorNumero.textContent = "Esta tarjeta ya fue registrada.";
            errorNumero.style.display = "block";
        }
    } else {
        if (numeroT.includes("-")) {
            errorNumero.textContent = "El formato es incorrecto.";
        } else if (numeroT.length != 16) {
            errorNumero.textContent = "El número consta de 16 dígitos.";
        }
        errorNumero.style.display = "block";
    }

    if (regexVencimiento.test(vencimientoT)) {
        contadorBuenas++;
        errorVencimiento.style.display = "none";
    } else {
        errorVencimiento.textContent = "Fecha no válida.";
        errorVencimiento.style.display = "block";
    }

    if (regexCodigo.test(cvvT)) {
        contadorBuenas++;
        errorCvv.style.display = "none";
    } else {
        errorCvv.textContent = "Código no válido.";
        errorCvv.style.display = "block";
    }

    if (regexNumero.test(telefonoT)) {
        contadorBuenas++;
        errorTelefono.style.display = "none";
    } else {
        if (telefonoT.includes("-")) {
            errorTelefono.textContent = "El formato es incorrecto.";
        } else if (telefonoT.length != 10) {
            errorTelefono.textContent = "El número de teléfono consta de 10 dígitos.";
        }
        errorTelefono.style.display = "block";
    }

    if (contadorBuenas === 4) {
        //Se agrega, paso todas las pruebas
        agregarTarjeta(numeroT, vencimientoT, cvvT, telefonoT);
        window.location.href = "../html/reservas.html";
    }
}

botonValidar.addEventListener("click", validarDatos);
