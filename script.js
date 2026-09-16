/* =========================================
   VARIABLES
========================================= */

let fechaSeleccionada = "";
let restauranteSeleccionado = "";


/* =========================================
   CORAZONES DEL FONDO
========================================= */

function crearCorazonesFondo() {

    const contenedor =
        document.getElementById("corazonesFondo");

    const corazones = [
        "💕",
        "💗",
        "💖",
        "💓",
        "💞",
        "❤️"
    ];

    for (let i = 0; i < 35; i++) {

        const corazon =
            document.createElement("div");

        corazon.className =
            "corazon-flotante";

        corazon.textContent =
            corazones[
                Math.floor(
                    Math.random() * corazones.length
                )
            ];

        corazon.style.left =
            Math.random() * 100 + "%";

        corazon.style.fontSize =
            (18 + Math.random() * 25) + "px";

        corazon.style.animationDuration =
            (12 + Math.random() * 20) + "s";

        corazon.style.animationDelay =
            (-Math.random() * 25) + "s";

        contenedor.appendChild(corazon);
    }
}


/* =========================================
   CAMBIAR DE PÁGINA
========================================= */

function mostrarPagina(numero) {

    const paginas =
        document.querySelectorAll(".pagina");

    paginas.forEach(function(pagina) {

        pagina.classList.remove("activa");

    });


    const paginaNueva =
        document.getElementById(
            "pagina" + numero
        );


    paginaNueva.classList.add("activa");
}


/* =========================================
   DECISIÓN DE LA PRIMERA PÁGINA
========================================= */

function tomarDecision(pagina) {

    crearExplosionCorazones();

    setTimeout(function() {

        mostrarPagina(pagina);

    }, 650);
}


/* =========================================
   CONFIRMAR FECHA
========================================= */

function confirmarFecha() {

    const campoFecha =
        document.getElementById("fecha");

    const mensaje =
        document.getElementById("mensajeFecha");

    const fecha =
        campoFecha.value;


    if (!fecha) {

        mensaje.textContent =
            "Primero debes escoger una fecha 💕";

        crearExplosionCorazones();

        return;
    }


    const fechaMinima =
        "2026-09-20";


    if (fecha < fechaMinima) {

        mensaje.textContent =
            "La fecha debe ser desde el 20 de septiembre de 2026 💕";

        return;
    }


    fechaSeleccionada = fecha;

    mensaje.textContent = "";


    crearExplosionCorazones();


    setTimeout(function() {

        mostrarPagina(3);

    }, 650);
}


/* =========================================
   ESCOGER RESTAURANTE
========================================= */

function escogerRestaurante(nombre) {

    restauranteSeleccionado =
        nombre;


    crearExplosionCorazones();


    setTimeout(function() {

        mostrarResultado();

    }, 650);
}


/* =========================================
   MOSTRAR RESULTADO FINAL
========================================= */

function mostrarResultado() {

    const restaurante =
        document.getElementById(
            "restauranteFinal"
        );


    const fecha =
        document.getElementById(
            "fechaFinal"
        );


    restaurante.textContent =
        restauranteSeleccionado;


    fecha.textContent =
        formatearFecha(
            fechaSeleccionada
        );


    mostrarPagina(4);
}


/* =========================================
   FORMATEAR FECHA
========================================= */

function formatearFecha(fecha) {

    const partes =
        fecha.split("-");


    const anio =
        parseInt(partes[0]);


    const mes =
        parseInt(partes[1]) - 1;


    const dia =
        parseInt(partes[2]);


    const fechaObjeto =
        new Date(
            anio,
            mes,
            dia
        );


    return fechaObjeto.toLocaleDateString(
        "es-CO",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


/* =========================================
   EXPLOSIÓN DE CORAZONES
========================================= */

function crearExplosionCorazones() {

    const cantidad = 35;

    const corazones = [
        "💕",
        "💗",
        "💖",
        "💓",
        "💞",
        "❤️"
    ];


    const centroX =
        window.innerWidth / 2;


    const centroY =
        window.innerHeight / 2;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const corazon =
            document.createElement("div");


        corazon.className =
            "corazon-explosion";


        corazon.textContent =
            corazones[
                Math.floor(
                    Math.random() *
                    corazones.length
                )
            ];


        corazon.style.left =
            centroX + "px";


        corazon.style.top =
            centroY + "px";


        const angulo =
            Math.random() *
            Math.PI *
            2;


        const distancia =
            100 +
            Math.random() * 250;


        const x =
            Math.cos(angulo) *
            distancia;


        const y =
            Math.sin(angulo) *
            distancia;


        corazon.style.setProperty(
            "--x",
            x + "px"
        );


        corazon.style.setProperty(
            "--y",
            y + "px"
        );


        corazon.style.fontSize =
            (18 + Math.random() * 22)
            + "px";


        document.body.appendChild(
            corazon
        );


        setTimeout(function() {

            corazon.remove();

        }, 1200);
    }
}


/* =========================================
   INICIAR
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        crearCorazonesFondo();

    }
);
