// Variables globales
let fechaSeleccionada = null;
let restauranteSeleccionado = null;

// Generar MUCHOS corazones de diferentes tamaños
function generarCorazones() {
    const container = document.getElementById('heartsContainer');
    
    // Limpiar corazones antiguos
    container.innerHTML = '';
    
    const numeroCorazones = 80; // MÁS corazones
    const corazones = ['❤️', '💕', '💖', '💗'];
    const tamaños = ['size-small', 'size-medium', 'size-large'];
    
    for (let i = 0; i < numeroCorazones; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Tamaño aleatorio
        const tamaño = tamaños[Math.floor(Math.random() * tamaños.length)];
        heart.classList.add(tamaño);
        
        // Corazón aleatorio
        heart.innerHTML = corazones[Math.floor(Math.random() * corazones.length)];
        
        // Posición inicial: toda el ancho de la pantalla
        const posX = Math.random() * 100;
        heart.style.left = posX + '%';
        heart.style.bottom = '-100px';
        
        // Duración aleatoria (20-50 segundos)
        const duration = Math.random() * 30 + 20;
        heart.style.animationDuration = duration + 's';
        
        // Retraso aleatorio
        heart.style.animationDelay = Math.random() * 10 + 's';
        
        // Desplazamiento horizontal aleatorio
        const translateX = (Math.random() - 0.5) * 300;
        heart.style.setProperty('--tx', translateX + 'px');
        
        container.appendChild(heart);
    }
}

// Mostrar página
function mostrarPagina(numeroPagina) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById('page' + numeroPagina).style.display = 'flex';
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
    
    const botones = document.querySelectorAll('.restaurant-card');
    botones.forEach(btn => btn.classList.remove('selected'));
    
    event.target.closest('.restaurant-card').classList.add('selected');
    
    document.getElementById('restauranteSeleccionado').textContent = nombre;
    
    setTimeout(() => {
        irPagina4();
    }, 600);
}

// Explosión de corazones
function crearExplosionCorazones() {
    const corazones = ['❤️', '💕', '💖', '💗'];
    
    for (let i = 0; i < 60; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = corazones[Math.floor(Math.random() * corazones.length)];
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        
        document.body.appendChild(heart);
        
        let angle = (Math.PI * 2 * i) / 60;
        let velocity = 8 + Math.random() * 8;
        let x = 0;
        let y = 0;
        
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            y += 0.8;
            
            heart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            heart.style.opacity = 1 - (Math.abs(y) / 300);
            
            if (Math.abs(y) < 300) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        animate();
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    generarCorazones();
});
