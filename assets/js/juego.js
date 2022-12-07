let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias HTML
const btnRequestCard = document.querySelector("#btnRequestCard");
const puntosHTML = document.querySelectorAll("small");
const contenedorCartasJugador = document.querySelector("#jugador-cartas");
const contenedorCartasComputadora = document.querySelector("#computadora-cartas");


// Esta función crea un deck aleatorio
function crearDeck() {
    for (let index = 2; index <= 10; index++) {
        for (let tipo of tipos) {
            deck.push(index + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);

    return deck;
}

crearDeck();

// Esta función permite seleccionar una carta del deck aleatorio
function obtenerCarta() {
    if (deck.length === 0) {
        throw new Error("No hay más cartas en el deck");
    }

    const cartaSeleccionada = deck.pop();

    return cartaSeleccionada;
}

// Esta función permite obtener el valor númerico de la carta
function obtenerPuntosCarta(carta) {
    const valor = carta.substring(0, carta.length - 1);
    const puntosCarta = (isNaN(valor)) ? ((valor === "A") ? 11 : 10) : parseInt(valor);

    return puntosCarta;
}

// Turno de la computadora
function jugarTurnoComputadora(puntosAdversario) {

    do {
        const cartaSeleccionadaComputadora = obtenerCarta();

        puntosComputadora += obtenerPuntosCarta(cartaSeleccionadaComputadora);
        puntosHTML.item(1).replaceChildren(puntosComputadora);
    
        const imgCartaComputadora = document.createElement("img");
        imgCartaComputadora.src = `assets/cartas/${cartaSeleccionadaComputadora}.png`;
        imgCartaComputadora.className = "carta";
    
        contenedorCartasComputadora.appendChild(imgCartaComputadora);

        if (puntosAdversario > 21) break;

    } while ((puntosComputadora < puntosAdversario) && (puntosAdversario <= 21));

}

function comprobarGanador(puntosJugadorA, puntosJugadorB) {

    if (puntosJugadorA === 21 && puntosJugadorB > 21) {
        console.log("Has ganado!!");
        console.log("Perdió la computadora!")
    } else if (puntosJugadorA > 21) {
        console.warn("Perdiste. Gana la computadora")
    } else if ((puntosJugadorA === 21) && (puntosJugadorB === 21)) console.log("Empate!!!");

}

// EVENTOS
btnRequestCard.addEventListener("click", () => {

    const cartaAleatoria = obtenerCarta();

    puntosJugador += obtenerPuntosCarta(cartaAleatoria);
    puntosHTML.item(0).replaceChildren(puntosJugador);

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${cartaAleatoria}.png`;
    imgCarta.className = "carta";

    contenedorCartasJugador.appendChild(imgCarta);

    if (puntosJugador > 21) {
        btnRequestCard.setAttribute("disabled", "");
        jugarTurnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        btnRequestCard.setAttribute("disabled", "");
        jugarTurnoComputadora(puntosJugador);
    }

    comprobarGanador(puntosJugador, puntosComputadora);

});
