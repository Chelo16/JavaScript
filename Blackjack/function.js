//La baraja con los puntos de cada carta
const baraja ={
    picas: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    treboles: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    diamantes: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    corazones: [1,2,3,4,5,6,7,8,9,10,11,12,13]
};

let juego = true;
//El numero de jugadores
let numJugadores = 1;
//Cuantos jugadores quedan por jugar
let jugadoresRest = 0;
//El mazo que lleva que cartas han salido (0) y cuales no (1)
const mazo = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
]
//Las distintas puntuaciones
const jugador1 = {
    puntuacion: 21
};
const jugador2 = {
    puntuacion: 21
}
const jugador3 = {
    puntuacion: 21
}
const jugador4 = {
    puntuacion: 21
}
const jugador5 = {
    puntuacion: 21
}
const crupier = {
    puntuacion: 21
};

//Le ponemos evento a los botones Iniciar y Num Jugadores
function init(){
    let iniciar = document.getElementById('iniciar');
    iniciar.addEventListener('click',empezar,true);

    let nJugadores = document.getElementById('nJugadores');
    nJugadores.addEventListener('change',cambiarJugadores,true);
};

//La opcion de elegir el numero de jugadores
function cambiarJugadores(event){
    let nJugadores = document.getElementById('nJugadores');
    numJugadores = parseInt(nJugadores.options[nJugadores.selectedIndex].text);
}

//Funcion del boton plantar
function plantar(event){
    seleccionar2(event);
}
//Funcion del boton pedirCarta
function pedirCarta(event){
    seleccionar(event);
}
//Borra la mesa por si la anterior partida tenia mas jugadores
function borrarMesas(){
    for(let i=2;i<=6;i++){
        let container = document.getElementsByClassName("container"+i);
        container[0].innerHTML = '';
    }
}

//La funcion empezar
function empezar(event){
    //Borra las mesas
    borrarMesas();
    //Pone cuantos jugadores hay
    jugadoresRest = numJugadores;
    //Vuelve a poner le mazo completo
    for(let i=0;i<4;i++){
        for(let x=0;x<13;x++){
            mazo[i][x] = 1;
        }
    }
    //Crea las mesas de los jugadores y añade evento a los dos botones
    for(let i=2;i<numJugadores+2;i++){
        let container = document.getElementsByClassName("container"+i);
        container[0].innerHTML = '<section id="jugador'+(i-1)+'"></section> <div class="mesa"></div>'+
        '<button id="pedir'+(i-1)+'">Pedir Carta</button>'+
        '<button id="plantar'+(i-1)+'">Plantarse</button>';
        //Boton de Pedir
        let pedir = document.getElementById('pedir'+(i-1));
        pedir.addEventListener('click',pedirCarta,true);
        //Boton de plantarse
        let plantarse = document.getElementById('plantar'+(i-1));
        plantarse.addEventListener('click',plantar,true);

    }

    //Limpias la mesa del crupier
    let mesas = document.getElementsByClassName('mesa');
    mesas[0].innerHTML= '';
    
    //Reseteas las puntuaciones a 0
    puntuacionesA0();
    //Sacas 2 cartas para cada jugador
    for(let i=1;i<numJugadores+1;i++){
        let jugador = jugadorSeleccionado(i);
        sacarCartaJugador(jugador,i);
        sacarCartaJugador(jugador,i);
    }
    //Pones el resultado vacio
    document.getElementById('resultado').innerHTML = '';
    juego = true;
    //Y por ultimo le sacas una carta al crupier
    sacarCartaCrupier();
}

//Pone todas las puntuaciones a 0
function puntuacionesA0(){
    jugador1.puntuacion = 0;
    jugador2.puntuacion = 0;
    jugador3.puntuacion = 0;
    jugador4.puntuacion = 0;
    jugador5.puntuacion = 0;
    crupier.puntuacion = 0;
}
//Selecciona que jugador es el que pide carta y le da una carta
function seleccionar(evento){
    let marcador = evento.currentTarget;
    let numero = parseInt(marcador.id.substr(-1));
    let jugador = jugadorSeleccionado(numero);
    sacarCartaJugador(jugador,numero);
}

//Selecciona que jugador se planta y acaba su turno
function seleccionar2(evento){
    let marcador = evento.currentTarget;
    let padre = parseInt(marcador.id.substr(-1));
    terminarJugador(padre);
}

//Escoge el jugador que ha pedido carta
function jugadorSeleccionado(num){
    switch(num){
        case 1:
            return jugador1;
        case 2:
            return jugador2;
        case 3:
            return jugador3;
        case 4:
            return jugador4;
        case 5:
            return jugador5;
    }
}
//Se le da una carta aleatoria al jugador
function sacarCartaJugador(player,nMesa){
    //Un booleano para ver si la carta ya habia salido
    let cartaSacada = true;
    let carta = 0;
    let puntuacion = '';
    while(cartaSacada){
        //Escoge una carta aleatoria
        let palo = Math.floor(Math.random()*4);
        let numero = Math.floor(Math.random()*13);
        //Vemos si dicha carta ya ha sido sacada
        if (mazo[palo][numero] == 1){
            mazo[palo][numero] = 0;
            switch(palo){
                //Saca el valor de dicha carta
                //Pone la suma de la puntuacion actual y muestra la carta sacada
                case 0:
                    carta = baraja.picas[numero];
                    puntuacion = 'Jugador'+nMesa+': ' + calPuntuacion(player,carta);
                    mostrarCarta(palo, numero,nMesa);
                    document.getElementById('jugador'+nMesa).innerHTML = '<p>' + puntuacion + '</p>';
                    break;
                case 1:
                    carta = baraja.treboles[numero];
                    puntuacion = 'Jugador'+nMesa+': ' + calPuntuacion(player,carta);
                    mostrarCarta(palo, numero,nMesa);
                    document.getElementById('jugador'+nMesa).innerHTML = '<p>' + puntuacion + '</p>';
                    break;
                case 2:
                    carta = baraja.diamantes[numero];
                    puntuacion = 'Jugador'+nMesa+': ' + calPuntuacion(player,carta);
                    mostrarCarta(palo, numero,nMesa);
                    document.getElementById('jugador'+nMesa).innerHTML = '<p>' + puntuacion + '</p>';
                    break;
                case 3:
                    carta = baraja.corazones[numero];
                    puntuacion = 'Jugador'+nMesa+': ' + calPuntuacion(player,carta);
                    mostrarCarta(palo, numero,nMesa);
                    document.getElementById('jugador'+nMesa).innerHTML = '<p>' + puntuacion + '</p>';
                    break;
            }
            //Dice que ya ha sacado una carta
            cartaSacada = false;
            //Comprueba si con la nueva carta se ha pasado de 21
            if (player.puntuacion > 21){
                terminarJugador(nMesa);
            }
        }
    }
}
//Exactamente igual que la de jugador pero con el crupier
//Le damos carta al crupier
function sacarCartaCrupier(){
    let cartaSacada = true;
    let carta = 0;
    let puntuacion = '';
    while(cartaSacada){
        let palo = Math.floor(Math.random()*4);
        let numero = Math.floor(Math.random()*13);
        if (mazo[palo][numero] == 1){
            mazo[palo][numero] = 0;
            switch(palo){
                case 0:
                    carta = baraja.picas[numero];
                    puntuacion = "Puntuacion Crupier: " + calPuntuacion(crupier,carta);
                    mostrarCarta(palo, numero,0);
                    document.getElementById('crupier').innerHTML = '<p>' + puntuacion + '</p>';
                    break;
                case 1:
                    carta = baraja.treboles[numero];
                    puntuacion = "Puntuacion Crupier: " + calPuntuacion(crupier,carta);
                    mostrarCarta(palo, numero,0);
                    document.getElementById('crupier').innerHTML = '<p>' + puntuacion + '</p>';
                    break;
                case 2:
                    carta = baraja.diamantes[numero];
                    puntuacion = "Puntuacion Crupier: " + calPuntuacion(crupier,carta);
                    mostrarCarta(palo, numero,0);
                    document.getElementById('crupier').innerHTML = '<p>' + puntuacion + '</p>';
                    break;
                case 3:
                    carta = baraja.corazones[numero];
                    puntuacion = "Puntuacion Crupier: " + calPuntuacion(crupier,carta);
                    mostrarCarta(palo, numero,0);
                    document.getElementById('crupier').innerHTML = '<p>' + puntuacion + '</p>';
                    break;
            }
            cartaSacada = false;
        }
    }
}

//Recibe el palo, el numero de la carta a mostrar y la mesa en la que tiene que 
//mostrarlo
function mostrarCarta(palo,numero,nMesa){
    let tablero = document.getElementsByClassName('mesa');
    //Dependiendo del palo añade la carta con su valor
    switch(palo){
        case 0:
            id = (numero + 1) + ' de Picas.png';
            tablero[nMesa].innerHTML = tablero[nMesa].innerHTML + '<img src="baraja francesa/'+id+'">'
            break;
        case 1:
            id = (numero + 1) + ' de Treboles.png';
            tablero[nMesa].innerHTML = tablero[nMesa].innerHTML + '<img src="baraja francesa/'+id+'">'
            break;
        case 2:
            id = (numero + 1) + ' de Diamantes.png';
            tablero[nMesa].innerHTML = tablero[nMesa].innerHTML + '<img src="baraja francesa/'+id+'">'
            break;
        case 3:
            id = (numero + 1) + ' de Corazones.png';
            tablero[nMesa].innerHTML = tablero[nMesa].innerHTML + '<img src="baraja francesa/'+id+'">'
            break;
    }

}





//Sumamos la puntuacion de la nueva carta al total
function calPuntuacion(player, carta){
    switch(carta){
        //El As en Blackjack deberia poder tomar el valor (1 o 11) a voluntad 
        //pero solo para los jugadores 
        //Asi que lo he hecho para todos igual siguiendo la norma del crupier
        case 1:
            if((player.puntuacion + 11) <= 21){
                player.puntuacion += 11;
            }else {
                player.puntuacion += 1;
            }
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            player.puntuacion += carta;
            break;
        //Las figuras valen 10
        case 11:
        case 12:
        case 13:
            player.puntuacion += 10;
            break;
    }
    return player.puntuacion;
}

//Resta 1 al numero de jugadores restantes y quitas los eventos de 
//sus botones
function terminarJugador(jugador){
    jugadoresRest--;
    let pedir = document.getElementById('pedir'+jugador);
    pedir.removeEventListener('click',pedirCarta,true);
    
    let plantarse = document.getElementById('plantar'+jugador);
    plantarse.removeEventListener('click',plantar,true);
    //Si todos los jugadores han acabado se resuelve la partida
    if(jugadoresRest == 0){
        resolverPartida();
    }
}

//Calcula quien gana
function resolverPartida(){
    let results = [0,
        jugador1.puntuacion,
        jugador2.puntuacion,
        jugador3.puntuacion,
        jugador4.puntuacion,
        jugador5.puntuacion,
        ]
    let Vjugadores = false;
    let victoria = [0,0,0,0,0];
    let result = document.getElementById('resultado');
    let frase  = 'Ganan los Jugadores';
    if((results[1]<=21) || (results[2]<=21) ||
     (results[3]<=21) || (results[4]<=21) ||
      (results[5]<=21)){
        while(crupier.puntuacion < 17){
            sacarCartaCrupier();
        }
        results[0]=crupier.puntuacion;
        if(compara(crupier.puntuacion,22)){
            result.innerHTML = '<p>Ganan los Jugadores!!</p>';
            //Comparamos si es mayor que el Jugador 1
        }else{
        if(compara(results[0],results[1])){
            if(results[1]>21){
                victoria[0]=0;
            }else {
                victoria[0]=1;
            }
        }
        //Comparamos si es mayor que el Jugador 2
        if(compara(results[0],results[2])){
            if(results[2]>21){
            }else {
                victoria[1]=1;
            }
        }
        //Comparamos si es mayor que el Jugador 3
        if(compara(results[0],results[3])){
            if(results[3]>21){
            }else {
                    victoria[2]=1;
            }
        }
        //Comparamos si es mayor que el Jugador 4
        if(compara(results[0],results[4])){
            if(results[4]>21){
            }else {
                    victoria[3]=1;
            }
        }
        //Comparamos si es mayor que el Jugador 5
        if(compara(results[0],results[5])){
            if(results[5]>21){
            }else {
                    victoria[4]=1;
            }
        }
        for(let i=0;i<5;i++){
            if(victoria[i] == 1){
                Vjugadores = true;
                frase += ' '+(i+1);
            }
        }
        }if(Vjugadores){
            result.innerHTML = '<p>'+frase+'!!</p>';
        }else{
            result.innerHTML = '<p>Gana el Crupier!!</p>';
        }
    }else 
        result.innerHTML = '<p>Gana el Crupier!!</p>';

    
}

function compara(valor1, valor2){
    console.log('Se mete');
    if(valor1>=valor2){
        return false;
    }else 
        return true;
}

//Le da valor a Inciar Partida y Nº de Jugadores
init();
