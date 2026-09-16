// ==========================================
// VARIABLES
// ==========================================

let fechaSeleccionada = null;
let restauranteSeleccionado = null;


// ==========================================
// GENERAR CORAZONES
// ==========================================

function generarCorazones() {

    const container = document.getElementById('heartsContainer');

    if (!container) return;

    container.innerHTML = '';

    const numeroCorazones = 55;

    const corazones = [
        '❤️',
        '💕',
        '💖',
        '💗',
        '💓'
    ];

    const tamanos = [
        'size-small',
        'size-medium',
        'size-large'
    ];

    for (let i = 0; i < numeroCorazones; i++) {

        const heart = document.createElement('div');

        heart.classList.add(
            'heart',
            tamanos[Math.floor(Math.random() * tamanos.length)]
        );

        heart.textContent =
            corazones[Math.floor(Math.random() * corazones.length)];

        // Posición horizontal
        heart.style.left =
            Math.random() * 100 + '%';

        // Duración entre 18 y 35 segundos
        const duration =
            Math.random() * 17 + 18;

        heart.style.animationDuration =
            duration + 's';

        // Retraso
        heart.style.animationDelay =
            -(Math.random() * 25) + 's';

        // Movimiento horizontal
        const tx1 =
            (Math.random() - 0.5) * 220;

        const tx2 =
            (Math.random() - 0.5) * 300;

        heart.style.setProperty(
            '--tx1',
            tx1 + 'px'
        );

        heart.style.setProperty(
            '--tx2',
            tx2 + 'px'
        );

        container.appendChild(heart);
    }
}


// ==========================================
// MOSTRAR PÁGINA
// ==========================================

function mostrarPagina(numeroPagina) {

    const pages =
        document.querySelectorAll('.page');

    pages.forEach(page => {

        page.style.display = 'none';

    });

    const pagina =
        document.getElementById(
            'page' + numeroPagina
        );

    if (pagina) {

        pagina.style.display = 'flex';

        // Reiniciar animación
        pagina.style.animation = 'none';

        void pagina.offsetWidth;

        pagina.style.animation =
            'pageIn 0.6s ease';
    }
}


// ==========================================
// NAVEGACIÓN
// ==========================================

function irPagina2() {

    crearExplosionCorazones();

    setTimeout(() => {
        mostrarPagina(2);
    }, 150);
}


function irPagina3() {

    if (!fechaSeleccionada) {

        const input =
            document.getElementById('fechaCena');

        if (input) {
            input.reportValidity();
        }

        return;
    }

    crearExplosionCorazones();

    setTimeout(() => {
        mostrarPagina(3);
    }, 150);
}


function irPagina4() {

    crearExplosionCorazones();

    setTimeout(() => {
        mostrarPagina(4);
    }, 150);
}


function irPagina5() {

    crearExplosionCorazones();

    setTimeout(() => {
        mostrarPagina(5);
    }, 150);
}


// ==========================================
// VALIDAR FECHA
// ==========================================

function validarFecha() {

    const input =
        document.getElementById('fechaCena');

    const errorMsg =
        document.getElementById('fechaError');

    const btnContinuar =
        document.getElementById('btnContinuarFecha');

    if (!input.value) {

        fechaSeleccionada = null;

        errorMsg.style.display = 'none';

        btnContinuar.disabled = true;

        return;
    }

    const fecha =
        new Date(input.value + 'T00:00:00');

    const fechaMinima =
        new Date('2026-09-20T00:00:00');

    if (fecha >= fechaMinima) {

        fechaSeleccionada =
            input.value;

        errorMsg.style.display =
            'none';

        btnContinuar.disabled =
            false;

    } else {

        fechaSeleccionada = null;

        errorMsg.style.display =
            'block';

        btnContinuar.disabled =
            true;
    }
}


// ==========================================
// SELECCIONAR RESTAURANTE
// ==========================================

function seleccionarRestaurante(
    nombre,
    boton
) {

    restauranteSeleccionado =
        nombre;

    const botones =
        document.querySelectorAll(
            '.restaurant-card'
        );

    botones.forEach(btn => {

        btn.classList.remove(
            'selected'
        );

    });

    boton.classList.add(
        'selected'
    );

    const nombreRestaurante =
        document.getElementById(
            'restauranteSeleccionado'
        );

    if (nombreRestaurante) {

        nombreRestaurante.textContent =
            nombre;

    }

    crearExplosionCorazones();

    setTimeout(() => {

        mostrarPagina(4);

    }, 700);
}


// ==========================================
// EXPLOSIÓN DE CORAZONES
// ==========================================

function crearExplosionCorazones() {

    const corazones = [
        '❤️',
        '💕',
        '💖',
        '💗',
        '💓'
    ];

    const cantidad = 35;

    for (let i = 0; i < cantidad; i++) {

        const heart =
            document.createElement('div');

        heart.className =
            'explosion-heart';

        heart.textContent =
            corazones[
                Math.floor(
                    Math.random() *
                    corazones.length
                )
            ];

        heart.style.fontSize =
            (18 + Math.random() * 25) +
            'px';

        document.body.appendChild(
            heart
        );

        const angle =
            (Math.PI * 2 * i) /
            cantidad;

        const distance =
            120 +
            Math.random() * 260;

        const targetX =
            Math.cos(angle) *
            distance;

        const targetY =
            Math.sin(angle) *
            distance;

        const rotation =
            Math.random() * 720 - 360;

        const duration =
            700 +
            Math.random() * 500;

        const animation =
            heart.animate(
                [
                    {
                        transform:
                            'translate(-50%, -50%) scale(0.4) rotate(0deg)',
                        opacity: 1
                    },
                    {
                        transform:
                            `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(1.2) rotate(${rotation}deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration: duration,
                    easing:
                        'cubic-bezier(0.15, 0.8, 0.3, 1)',
                    fill: 'forwards'
                }
            );

        animation.onfinish = () => {

            heart.remove();

        };
    }
}


// ==========================================
// INICIALIZAR
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        generarCorazones();

        mostrarPagina(1);

    }
);
