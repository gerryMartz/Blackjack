(function () {

    'use strict'

    let deck;
    const tipos = ["C", "D", "H", "S"];
    const especiales = ["A", "J", "Q", "K"];

    let puntosJugador = 0;
    let puntosComputadora = 0;

    let nombreCap;

    
    // Referencias HTML
    const btnStart = document.querySelector("#btnStart");
    const btnNewGame = document.querySelector("#btnNewGame");
    const btnRequestCard = document.querySelector("#btnRequestCard");
    const btnFinishGame = document.querySelector("#btnFinishGame");

    const puntosHTML = document.querySelectorAll("small");

    const contenedorCartasJugador = document.querySelector("#jugador-cartas");
    const contenedorCartasComputadora = document.querySelector("#computadora-cartas");

    // FUNCIONES

    // Esta función inicializa el juego
    function inicializarJuego() {
        deck = crearDeck();
    }

    // Esta función crea un deck aleatorio
    function crearDeck() {

        deck = [];

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

        return _.shuffle(deck);

    }

    // Esta función permite seleccionar una carta del deck aleatorio
    function obtenerCarta() {

        if (deck.length === 0) {
            throw new Error("No hay más cartas en el deck");
        }
        return deck.pop();

    }

    // Esta función permite obtener el valor númerico de la carta
    function obtenerPuntosCarta(carta) {
        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ? ((valor === "A") ? 11 : 10) : parseInt(valor);
    }

    function acumularPuntos() {
        
    }

    // Turno de la computadora
    function jugarTurnoComputadora(puntosAdversario) {

        do {
            const cartaSeleccionadaComputadora = obtenerCarta();

            puntosComputadora += obtenerPuntosCarta(cartaSeleccionadaComputadora);
            puntosHTML.item(1).replaceChildren(puntosComputadora);

            const imgCartaComputadora = document.createElement("img");
            imgCartaComputadora.setAttribute("src", `assets/cartas/${cartaSeleccionadaComputadora}.png`);
            imgCartaComputadora.className = "carta";

            contenedorCartasComputadora.appendChild(imgCartaComputadora);

            if (puntosAdversario > 21) break;

        } while ((puntosComputadora < puntosAdversario) && (puntosAdversario <= 21));

        setTimeout(() => {
            if ((puntosJugador <= 21) && (puntosComputadora > 21)) {
                alert(`Has ganado ${nombreCap}!!`);
            } else if ((puntosJugador > 21) || ((puntosJugador < 21) && (puntosComputadora > puntosJugador))) {
                alert(`Perdiste, ${nombreCap} :(`);
            } else if ((puntosJugador === puntosComputadora)) {
                alert("Empate!!");
            }
        }, 300);

    }

    // EVENTOS
    btnStart.addEventListener("click", () => {

        btnStart.setAttribute("disabled", "");
        btnRequestCard.removeAttribute("disabled");

        let nombre = prompt("Ingresa tu nombre: ").trim();

        while ((nombre === "") || (!isNaN(nombre))) {
            nombre = prompt("Por favor, ingresa tu nombre:").trim();
        }

        nombreCap = nombre.charAt(0).toUpperCase() + nombre.substring(1, nombre.length);
        alert(`Bienvenid@ ${nombreCap}!!`);

        inicializarJuego();

    });

    btnRequestCard.addEventListener("click", () => {

        btnFinishGame.removeAttribute("disabled");
        const cartaAleatoria = obtenerCarta();

        puntosJugador += obtenerPuntosCarta(cartaAleatoria);
        puntosHTML.item(0).replaceChildren(puntosJugador);

        const imgCarta = document.createElement("img");
        imgCarta.setAttribute("src", `assets/cartas/${cartaAleatoria}.png`);
        imgCarta.className = "carta";

        contenedorCartasJugador.appendChild(imgCarta);

        if (puntosJugador > 21) {

            btnRequestCard.setAttribute("disabled", "");
            btnFinishGame.setAttribute("disabled", "");

            btnNewGame.removeAttribute("disabled");

            jugarTurnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {

            btnRequestCard.setAttribute("disabled", "");
            btnFinishGame.setAttribute("disabled", "");

            btnNewGame.removeAttribute("disabled");

            jugarTurnoComputadora(puntosJugador);

        }

    });

    btnFinishGame.addEventListener("click", () => {

        btnNewGame.removeAttribute("disabled");

        btnFinishGame.setAttribute("disabled", "");
        btnRequestCard.setAttribute("disabled", "");

        jugarTurnoComputadora(puntosJugador);

    });

    btnNewGame.addEventListener("click", () => {

        inicializarJuego();

        //deck = [];
        //crearDeck();

        puntosHTML.item(0).innerText = 0;
        puntosHTML.item(1).innerText = 0;

        puntosJugador = 0;
        puntosComputadora = 0;

        btnNewGame.setAttribute("disabled", "");
        btnRequestCard.removeAttribute("disabled");

        contenedorCartasJugador.replaceChildren();
        contenedorCartasComputadora.replaceChildren();

    });

})();
