//Objeto buscaminas
const buscaminas = {
    numMinasTotales: 10,
    numMinasEncontradas: 0,
    numFilas: 8,
    numColumnas: 8,
    aCampoMinas: []
}

//Fumada para poner un contador 7 segmentos
const numeros = document.querySelectorAll(".numero");
const segmentos = Array.from(numeros).map(numero => numero.querySelectorAll("svg"));
const mapaNumeros = [
    [1,1,1,1,1,0,1],
    [0,1,1,0,0,0,0],
    [1,1,0,1,1,1,0],
    [1,1,1,1,0,1,0],
    [0,1,1,0,0,1,1],
    [1,0,1,1,0,1,1],
    [1,0,1,1,1,1,1],
    [1,1,1,0,0,0,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,0,1,1]
];
//Boton derecho
function derecho(event){
    event.preventDefault();
    marcar(event);
}
//boton izquierdo
function izquierdo(event){
    destapar(event);
}

//Borra la matriz y crea una nueva
function pintarTablero(){
    let tablero = document.querySelector(".tablero");
    //Borramos la matriz y eventos vinculados
    while (tablero.firstChild){
        tablero.firstChild.removeEventListener("contextmenu",derecho,true);
        tablero.firstChild.removeEventListener("click",izquierdo,true);
        tablero.removeChild(tablero.firstChild);
    }
    //Establecemos el numero de filas y columnas
    document.querySelector("html").style.setProperty("--num-filas",buscaminas.numFilas);
    document.querySelector("html").style.setProperty("--num-columnas",buscaminas.numColumnas);
    
    //Creamos el tablero
    for(let f=0; f<buscaminas.numFilas; f++){
        for(let c=0; c<buscaminas.numColumnas; c++){
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id","f" + f + "_c" + c );
            newDiv.dataset.fila = f;
            newDiv.dataset.columna = c;
             //evento con el botón derecho del raton
            newDiv.addEventListener("contextmenu",derecho,true);
            //evento con el botón izquierdo del raton
            newDiv.addEventListener("click",izquierdo,true); 
            tablero.appendChild(newDiv);
        }
    }
    //Llamamos a las funciones para poner las minas 
    generarCampoMinasVacio();
    esparcirMinas();
    verMinas();
    actualizarNumMinasRestantes();
}
//Generamos el array vacio donde iran las minas
function generarCampoMinasVacio(){
    //generamos el campo de minas en el objeto buscaminas
    buscaminas.aCampoMinas = new Array(buscaminas.numFilas);
    for (let fila=0; fila<buscaminas.numFilas; fila++){
        buscaminas.aCampoMinas[fila] = new Array(buscaminas.numColumnas);
    }
}
//Vamos a poner minas aleatoriamente
function esparcirMinas(){
    let minasEsparcidas = 0;
    while (minasEsparcidas < buscaminas.numMinasTotales){
        let fila = Math.floor(Math.random() * buscaminas.numFilas);
        let columna = Math.floor(Math.random() * buscaminas.numColumnas);

        if(buscaminas.aCampoMinas[fila][columna] != "M"){
            //Pones la posicion de la mina
            buscaminas.aCampoMinas[fila][columna] = "M";
            //Sumas una mina al total de minas esparcidas
            minasEsparcidas++;
        }
    }
}


//Vamos a ir recorriendo el campo de minas y 
//poniendo el numero de minas alrededor
function verMinas(){
    for(let f=0;f<buscaminas.numFilas;f++){
        for(let c=0;c<buscaminas.numColumnas;c++){
            if(buscaminas.aCampoMinas[f][c] != "M"){
                contarAlrededor(f,c);
            }
        }
    }
}

//Miramos si la posicion tiene minas alrededor
function contarAlrededor(fila,columna){
    let minasAlrededor = 0;
    for(let f=fila-1;f<=fila+1;f++){
        for(let c=columna-1;c<=columna+1;c++){
            if(f>-1 && f<buscaminas.numFilas){
                if(c>-1 && c<buscaminas.numColumnas){
                    if(buscaminas.aCampoMinas[f][c] == "M"){
                        minasAlrededor++;
                    }
                }
            }
        }
    }
    buscaminas.aCampoMinas[fila][columna] = minasAlrededor;
}

//Funcion del boton derecho
function marcar(evento){
    let casilla2 = evento.currentTarget;
    let fila = casilla2.dataset.fila;
    let columna = casilla2.dataset.columna;
    if (fila>=0 && columna>=0 && fila< buscaminas.numFilas && columna < buscaminas.numColumnas) {
        
        let casilla = document.querySelector("#f" + fila + "_c" + columna);
        //Si no tiene nada le ponemos bandera
        if(casilla.classList.contains("icon-bandera")){
            //si esta marcada como "bandera"
            //Quitamos la bandera y ponemos ?
            casilla.classList.remove("icon-bandera");
            casilla.classList.add("icon-duda");
            casilla.innerHTML = '?';
            buscaminas.numMinasEncontradas--;
        }else if(casilla.classList.length == 0){
            casilla.classList.add("icon-bandera");
            casilla.innerHTML = '<img src="flag.svg" width="17em">';
            buscaminas.numMinasEncontradas++;

            if(buscaminas.numMinasTotales == buscaminas.numMinasEncontradas){
                resolverTablero(true);
            }
            //Si esta con ? la quitamos
        }else if(casilla.classList.contains("icon-duda")){
            casilla.classList.remove("icon-duda");
            casilla.innerHTML = '';
            
        }
        actualizarNumMinasRestantes();
    }
    
}
//Coge el evento y busca la fila/columna
function destapar(evento){
    let casilla = evento.currentTarget;
    let fila = parseInt(casilla.dataset.fila);
    let columna = parseInt(casilla.dataset.columna);
    destaparCasilla(fila,columna);
}
 
//Funcion del boton izquierdo 
function destaparCasilla(fila,columna){
    console.log("destapamos la casilla con fila " + fila + " y columna " +columna );
    if (fila > -1 && fila < buscaminas.numFilas &&
        columna >-1 && columna < buscaminas.numColumnas){
    let casilla = document.querySelector("#f" + fila + "_c" + columna);
    //Vemos si la casilla ya habia sido destapada
    if(!casilla.classList.contains("destapado")){
        //Miramos si tiene bandera
        if(!casilla.classList.contains("icon-bandera")){
            casilla.classList.remove("icon-duda");
            casilla.classList.add("destapado");
            //Le ponemos el numero correspondiente o 'M' debajo
            casilla.innerHTML = buscaminas.aCampoMinas[fila][columna];
            casilla.classList.add("c"+buscaminas.aCampoMinas[fila][columna]);
            //Miramos si no es mina
            if (buscaminas.aCampoMinas[fila][columna] != "M"){
                //Si es 0 destapamos las 8 de alrededor
                if(buscaminas.aCampoMinas[fila][columna] == 0){
                    destaparCasilla(fila-1,columna-1);
                    destaparCasilla(fila-1,columna);
                    destaparCasilla(fila-1,columna+1);
                    destaparCasilla(fila,columna-1);
                    destaparCasilla(fila,columna+1);
                    destaparCasilla(fila+1,columna-1);
                    destaparCasilla(fila+1,columna);
                    destaparCasilla(fila+1,columna+1);

                    casilla.innerHTML = "";
                }
            }else{
                casilla.innerHTML = '<img src="mina.svg" width="17em">';
                casilla.classList.add("icon-bomba");
                casilla.classList.add("fallo");
                resolverTablero(false);
            }
        }
    }
    }
}

//Comprueba si el menu esta desplegado
function buttonClik(value){
    let element = document.querySelector('.opciones');
    if(element.style.display === 'none'){
        mostrarMenu();
    }else{
        ocultarMenu();
    }
}

//Reinicia el tablero
function reiniciar(){
    buscaminas.numMinasEncontradas = 0;
    pintarTablero();
}

//Actualizamos el contador de minas restantes
function actualizarNumMinasRestantes(){
    let minas = (buscaminas.numMinasTotales - buscaminas.numMinasEncontradas);
    let minasRestantes =getDosNumeros(minas.toString())
    setNumero(0,minasRestantes[0]);
    setNumero(1,minasRestantes[1]);

}

//Muestra el menu
function mostrarMenu(){
    let element = document.querySelector('.opciones');
    element.style.display = 'block';
    document.getElementById('d1').addEventListener
    ('click', function(event){
        dificultad(event.target.innerText);
    });
    document.getElementById('d2').addEventListener
    ('click', function(event){
        dificultad(event.target.innerText);
    });
    document.getElementById('d3').addEventListener
    ('click', function(event){
        dificultad(event.target.innerText);
    });

}

//Cambia el nivel de dificultad (filas, columnas, minas)
function dificultad(value){
    if(value === 'Facil'){
        buscaminas.numMinasEncontradas = 0;
        buscaminas.numFilas = 8;
        buscaminas.numColumnas = 8;
        buscaminas.numMinasTotales = 10;
        pintarTablero();
    }else if(value === 'Normal'){
        buscaminas.numMinasEncontradas = 0;
        buscaminas.numFilas = 16;
        buscaminas.numColumnas = 16;
        buscaminas.numMinasTotales = 40;
        pintarTablero();
    }else if(value === 'Dificil'){
        buscaminas.numMinasEncontradas = 0;
        buscaminas.numFilas = 16;
        buscaminas.numColumnas = 31;
        buscaminas.numMinasTotales = 99;
        pintarTablero();
    }
}

//Vamos a ver si hemos ganado o en caso de darle a una mina revelar el mapa
function resolverTablero(bool){
    let tablero = document.querySelector(".tablero");
    let aCasillas = tablero.children;
    for (let i = 0;i < aCasillas.length;i++){
        aCasillas[i].removeEventListener('click',izquierdo,true);
        aCasillas[i].removeEventListener('contextmenu',derecho,true);
        console.log(aCasillas[i]);

        let fila = parseInt(aCasillas[i].dataset.fila);
        let columna = parseInt(aCasillas[i].dataset.columna);

        if(aCasillas[i].classList.contains('icon-bandera')){
            //Comprobamos si la bandera esta bien puesta

            if(buscaminas.aCampoMinas[fila][columna] !== 'M'){
                aCasillas[i].classList.remove('icon-bandera');
                    if(buscaminas.aCampoMinas[fila][columna] == 0){
                        aCasillas[i].innerHTML = '';
                    }else{
                        aCasillas[i].innerHTML = buscaminas.aCampoMinas[fila][columna];
                    }
                aCasillas[i].classList.add("c"+buscaminas.aCampoMinas[fila][columna]);
                aCasillas[i].classList.add('destapado');
                aCasillas[i].classList.add('banderaErronea');
                bool = false;
            }
        }else if(!aCasillas[i].classList.contains('destapado')){
            if(buscaminas.aCampoMinas[fila][columna] == 'M'){
                aCasillas[i].classList.add('destapado');
                aCasillas[i].classList.add('icon-bomba');
                aCasillas[i].innerHTML = '<img src="mina.svg" width="17em">';
            }

        }
    }
    if (bool){
        swal('¡¡¡Enhorabuena!!!','Has ganado','success');
    }else {
        swal("Muelto", "Eres un paquete", "error");
    }
}

//Oculta el menu
function ocultarMenu(){
    let element = document.querySelector('.opciones');
    element.style.display = 'none';
}

//Iniciamos los botones Dificultad y Reiniciar
function init(){
    document.querySelector('.modify').addEventListener
    ('click', function(event){
        buttonClik(event.target.innerText);
    });
    document.querySelector('.modify2').addEventListener
    ('click', function(event){
        reiniciar(event.target);
    });
    
}

//Colocamos el numero respectivo en el 7-segment
function setNumero(i,valor){
    segmentos[i].forEach((segmento, j) =>{
        segmento.children[0].classList.toggle("on", mapaNumeros[valor][j])
    })
}

//Combramos si hay solo un numero ponemos 0 a la izquierda
function getDosNumeros(numero){
    if(numero.length === 2) return numero;
    return "0"+numero;
}

init();
pintarTablero();
