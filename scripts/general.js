//Se va a ocupar en cada html
const iconoSesion = document.getElementById("icono-sesion");
const iconoReservas = document.getElementById("carrito-res");
//Creacion y manejo de usuarios.
const listaUsuarios = [];
//Manejo del usuario actual.
let usuarioActual = {};

function agregarUsuario(agUsuario, agCorreo, agPass) {
    const usuario = {
        "usuario": agUsuario,
        "correo": agCorreo,
        "pass": agPass,
        "telefono": "",
        "tarjetas": [],
        "reservaciones": []
    };
    listaUsuarios.push(usuario);
    localStorage.setItem("Usuarios", JSON.stringify(listaUsuarios));
}

function agregarActual(aaUsuario) {
    usuarioActual = aaUsuario;
    localStorage.setItem("Actual", JSON.stringify(usuarioActual));
}

function agregarReserva() {
    //En un caso real se sustituye por sus nombres, claro
    // recibimos los valores de cada habitacion, sea por span
    let nombreHbt = "(nombre de habitacion)";
    let categoriaHbt = "(categoria)";
    let capacidadHbt = "(capacidad)";
    let precioHbt = "(precio)";
    const reserva = {
        "id": Date.now(),
        "nombre": nombreHbt,
        "categoria": categoriaHbt,
        "ubicacion": "Mexico",
        "capacidad": capacidadHbt,
        "precio": precioHbt
    };
    usuarioActual.reservaciones.push(reserva);
    listaUsuarios.forEach(usuario => {
        if (usuario.usuario === usuarioActual.usuario) {
            usuario.reservaciones.push(reserva);
        }
    });
    actualizarLocal(usuarioActual, listaUsuarios);
}

function agregarTarjeta(atNumero, atVencimiento, atCvv, atTelefono) {
    const tarjeta = {
        "id": Date.now(),
        "numero": atNumero,
        "vencimiento": atVencimiento,
        "cvv": atCvv
    };
    usuarioActual.tarjetas.push(tarjeta);
    usuarioActual.telefono = atTelefono;
    listaUsuarios.forEach(usuario => {
        if (usuario.usuario === usuarioActual.usuario) {
            usuario.tarjetas.push(tarjeta);
            usuario.telefono = atTelefono;
        }
    });
    actualizarLocal(usuarioActual, listaUsuarios);
}

function quitarReserva(idReserva) {
    usuarioActual.reservaciones.forEach(reserva => {
        if (reserva.id === idReserva) {
            usuarioActual.reservaciones.pop(reserva);
        }
    });
    listaUsuarios.forEach(usuario => {
        //Busco por nombre siempre, no se puede repetir
        if (usuarioActual.usuario === usuario.usuario) {
            usuario.reservaciones = usuarioActual.reservaciones;
        }
    });
    actualizarLocal(usuarioActual, listaUsuarios);
}

function pagarTodo() {
    usuarioActual.reservaciones = [];
    listaUsuarios.forEach(usuario => {
        if (usuarioActual.usuario === usuario.usuario) {
            usuario.reservaciones = usuarioActual.reservaciones;
        }
    });
    cajaReservas.innerHTML = '';
    listarReserva();
    actualizarLocal(usuarioActual, listaUsuarios);
}

function quitarTarjeta(idTarjeta) {
    usuarioActual.tarjetas.forEach(tarjeta => {
        if (tarjeta.id === idTarjeta) {
            usuarioActual.tarjetas.pop(tarjeta);
        }
    });
    listaUsuarios.forEach(usuario => {
        if (usuarioActual.usuario === usuario.usuario) {
            usuario.tarjetas = usuarioActual.tarjetas;
        }
    });
    actualizarLocal(usuarioActual, listaUsuarios);
}

function editarUsuario(nuevoUsuario, nuevoCorreo, nuevoPass, nuevoTel) {
    let antiguoUsuario = usuarioActual.usuario;
    usuarioActual.usuario = nuevoUsuario;
    usuarioActual.correo = nuevoCorreo;
    usuarioActual.pass = nuevoPass;
    usuarioActual.telefono = nuevoTel;
    listaUsuarios.forEach(usuario => {
        if (usuario.usuario === antiguoUsuario) {
            usuario.usuario = nuevoUsuario;
            usuario.correo = nuevoCorreo;
            usuario.pass = nuevoPass;
            usuario.telefono = nuevoTel;
        }
    });
    actualizarLocal(usuarioActual, listaUsuarios);
}

function quitarActual() {
    usuarioActual = {};
    actualizarLocal(usuarioActual, listaUsuarios);
}

function buscarUsuario(bsUsuario) {
    let usuarioEncontrado = null;
    if (!listaVacia()) {
        //Hay algo en la lista
        listaUsuarios.forEach(usuario => {
            if (bsUsuario === usuario.usuario) {
                usuarioEncontrado = usuario;
            }
        });
    }
    return usuarioEncontrado; //Si regresa null, no lo encontro
}

function buscarCorreo(bsCorreo) {
    let correoEncontrado = null;
    if (!listaVacia()) {
        //Hay algo en la lista
        listaUsuarios.forEach(usuario => {
            if (bsCorreo === usuario.correo) {
                correoEncontrado = usuario;
            }
        });
    }
    return correoEncontrado;
}

function buscarTarjeta(btTarjeta) {
    let tarjetaEncontrada = null;
    const listaTarjetas = usuarioActual.tarjetas;
    listaTarjetas.forEach(tarjeta => {
        if (tarjeta.numero === btTarjeta) {
            tarjetaEncontrada = tarjeta;
        }
    });
    return tarjetaEncontrada;
}

function listaVacia() {
    if (listaUsuarios.length === 0) {
        return true; //esta vacia
    }else{
        return false; // hay algo
    }
}

function objetoVacio() {
    if (Object.keys(usuarioActual).length === 0) {
        return true; // No hay usuario actual
    }else{
        return false; // Hay alguien en usuario actual
    }
}

function actualizarLocal(actual, lista) {
    localStorage.setItem("Usuarios", JSON.stringify(lista));
    localStorage.setItem("Actual", JSON.stringify(actual));
}

function cargarDatos() {
    const listaLocal = JSON.parse(localStorage.getItem("Usuarios")) || [
        //Datos cargados al cargar la pagina
        {
            "usuario": "IsmaelAlejo",
            "correo": "ismael@gmail.com",
            "pass": "ismael",
            "telefono": "",
            "tarjetas": [],
            "reservaciones": []
        },
        {
            "usuario": "Luis Carlos",
            "correo": "luiscarlos@gmail.com",
            "pass": "luiscarlos",
            "telefono": "",
            "tarjetas": [],
            "reservaciones": []
        }
    ];
    usuarioActual = JSON.parse(localStorage.getItem("Actual")) || {};
    listaLocal.forEach(usuarioLocal => {
        listaUsuarios.push(usuarioLocal);
    });
}

//localStorage.clear();
document.addEventListener("DOMContentLoaded", cargarDatos);
