// Selección de elementos del DOM
const tablero = document.querySelector('.game-board');
const tiempoP = document.getElementById('timer');
const movimientosP = document.getElementById('moves');
const botonReinicio = document.querySelector('.reset');

// Variables del juego
let cartas = [];
let cartasVolteadas = [];
let parejasFormadas = 0;
let movimientos = 0;
let tiempo = 0;
let intervalo;

// Función para iniciar el juego
function iniciarJuego(){
    const figuras = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷'];
    const cartasFiguras = [...figuras, ...figuras].sort(() => Math.random() - 0.5);

    // Crear cartas y agregarlas al tablero
    cartasFiguras.forEach(figura => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.figura = figura;
        carta.addEventListener('click', voltearCarta);
        tablero.appendChild(carta);
        cartas.push(carta);
    });
    
    mostrarCartas();

    // Iniciar el temporizador después de un retraso
    setTimeout(() => {
        iniciarTiempo();
    }, 3000);
}

// Función para voltear una carta
function voltearCarta(){
    if(cartasVolteadas.length === 2 || this.classList.contains('volteada')) return;
    this.classList.add('volteada');
    this.textContent = this.dataset.figura;
    cartasVolteadas.push(this);

    if(cartasVolteadas.length === 2) revisarCoincidencia();
}

// Función para verificar si las cartas coinciden
function revisarCoincidencia(){
    movimientos++;
    movimientosP.textContent = `Movimientos: ${movimientos}`;
    const [carta1, carta2] = cartasVolteadas;

    if(carta1.dataset.figura === carta2.dataset.figura){
        carta1.classList.add('coincidencia');
        carta2.classList.add('coincidencia');
        parejasFormadas++;
        cartasVolteadas = [];

        if(parejasFormadas == 12) finJuego();
    } else {
        setTimeout(() => {
            carta1.classList.remove('volteada');
            carta2.classList.remove('volteada');
            carta1.textContent = '';
            carta2.textContent = '';
            cartasVolteadas = [];
        }, 1000);
    }
}

// Función para mostrar las cartas temporalmente
function mostrarCartas() {
    cartas.forEach(carta => {
        carta.classList.add('volteada');
        carta.textContent = carta.dataset.figura;
    });

    setTimeout(() => {
        cartas.forEach(carta => {
            carta.classList.remove('volteada');
            carta.textContent = '';
        });
    }, 3000);
}

// Función para iniciar el temporizador
function iniciarTiempo(){
    tiempo = 0;
    intervalo = setInterval(() => {
        tiempo++;
        tiempoP.textContent = `Tiempo: ${tiempo} segundos`;
    }, 1000);
}

// Función para finalizar el juego
function finJuego(){
    clearInterval(intervalo);
    alert(`¡Felicidades! Completaste el juego en ${tiempo} segundos y ${movimientos} movimientos.`);
}

// Iniciar juego
iniciarJuego();

// Función para reiniciar el juego
botonReinicio.addEventListener('click', () => {
    location.reload();
});
