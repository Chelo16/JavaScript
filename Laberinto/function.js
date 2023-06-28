const laberinto = {
    numFilas: 21,
    numColumnas: 21,
    aLaberinto: [],
    caminoTotal: 180
};
function dibujarLaberinto(){
    let campo = document.querySelector(".laberinto");
    //Borramos la matriz y eventos vinculados
    while (campo.firstChild){
        campo.removeChild(campo.firstChild);
    }
    //Establecemos el numero de filas y columnas
    document.querySelector("html").style.setProperty("--num-filas",laberinto.numFilas);
    document.querySelector("html").style.setProperty("--num-columnas",laberinto.numColumnas);
    
    //Creamos el tablero
    for(let f=0; f<laberinto.numFilas; f++){
        for(let c=0; c<laberinto.numColumnas; c++){
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id","f" + f + "_c" + c );
            newDiv.dataset.fila = f;
            newDiv.dataset.columna = c;
             //evento con el botón derecho del raton
            //evento con el botón izquierdo del raton
            campo.appendChild(newDiv);
        }
    }
    generarCampo();
    crearCamino();
}

//Generamos el array vacio donde iran las minas
function generarCampo(){
    //generamos el campo de minas en el objeto buscaminas
    laberinto.aLaberinto = new Array(laberinto.numFilas);
    for (let fila=0; fila<laberinto.numFilas; fila++){
        laberinto.aLaberinto[fila] = new Array(laberinto.numColumnas);
    }
}
//Vamos a poner minas aleatoriamente
function crearCamino(){
    let camninoHecho = 0;
    while (camninoHecho < laberinto.caminoTotal){
        let fila = Math.floor(Math.random() * laberinto.numFilas);
        let columna = Math.floor(Math.random() * laberinto.numColumnas);

        if(laberinto.aLaberinto[fila][columna] != "C"){
            //Pones la posicion de la mina
            laberinto.aLaberinto[fila][columna] = "C";
            let camino = document.getElementById("f"+fila+"_c"+columna);
            camino.classList.add("camino");
            //Sumas una mina al total de minas esparcidas
            camninoHecho++;
        }
    }
}

dibujarLaberinto();