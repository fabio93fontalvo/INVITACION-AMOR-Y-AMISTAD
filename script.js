// Variables globales
let fechaSeleccionada = null;
let restauranteSeleccionado = null;

// Generar corazones flotantes
function generarCorazones() {
    const container = document.getElementById('heartsContainer');
    const numeroCorazones = 20;
    
    for (let i = 0; i < numeroCorazones; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
    }
}

// Navegar entre páginas
function mostrarPagina(numeroPagina) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById('page' + numeroPagina).style.display = 'block';
}

function irPagina2() {
    crearExplosionCorazones();
    mostrarPagina(2);
}

function irPagina3() {
    crearExplosionCorazones();
    mostrarPagina(3);
}

function irPagina4() {
    crearExplosionCorazones();
    mostrarPagina(4);
}

function irPagina5() {
    crearExplosionCorazones();
    mostrarPagina(5);
}

// Validar fecha
function validarFecha() {
    const input = document.getElementById('fechaCena');
    const fecha = new Date(input.value);
    const fechaMinima = new Date('2026-09-20');
    const errorMsg = document.getElementById('fechaError');
    const btnContinuar = document.getElementById('btnContinuarFecha');
    
    if (fecha >= fechaMinima) {
        fechaSeleccionada = input.value;
        errorMsg.style.display = 'none';
        btnContinuar.disabled = false;
    } else {
        errorMsg.style.display = 'block';
        btnContinuar.disabled = true;
        fechaSeleccionada = null;
    }
}

// Seleccionar restaurante
function seleccionarRestaurante(nombre) {
    restauranteSeleccionado = nombre;
    
    // Quitar selección anterior
    const botones = document.querySelectorAll('.restaurant-btn');
    botones.forEach(btn => btn.classList.remove('selected'));
    
    // Marcar el seleccionado
    event.target.classList.add('selected');
    
    // Mostrar en página 4
    document.getElementById('restauranteSeleccionado').textContent = nombre;
    
    // Ir a página 4 después de un pequeño delay
    setTimeout(() => {
        irPagina4();
    }, 500);
}

// Crear explosión de corazones
function crearExplosionCorazones() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        
        document.body.appendChild(heart);
        
        let angle = (Math.PI * 2 * i) / 30;
        let velocity = 5 + Math.random() * 5;
        let x = 0;
        let y = 0;
        
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            y += 0.5;
            
            heart.style.transform = `translate(${x}px, ${y}px)`;
            heart.style.opacity = 1 - (Math.abs(y) / 200);
            
            if (Math.abs(y) < 200) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        animate();
    }
}

// Enviar resumen (opcional: podrías enviar por email)
function enviarResumen() {
    const fecha = new Date(fechaSeleccionada).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const mensaje = `RESUMEN DE TU CITA:\n\nFecha: ${fecha}\nRestaurante: ${restauranteSeleccionado}\n\n¡Nos vemos pronto! ❤️`;
    
    alert(mensaje);
}

// Inicializar
document.addEventListener('DOMContentLoaded', generarCorazones);
