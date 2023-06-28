let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screnn = document.querySelector('.calculator_input');

//Definimos una funcion que comprueba si es numero o symbolo
function buttonClik(value){
	if(isNaN(value)){
		handleSymbol(value);
	}else{
		handleNumber(value);
	}
	screnn.innerText = buffer;
}

//Las distintas operaciones dependiendo del simbolo
function handleSymbol(symbol){
	switch(symbol){
		//Borra el buffer y la pantalla
		case 'C':
			buffer = '0';
			runningTotal = 0;
			break;
		//Toma el buffer y lo suma a la pantalla
		case '=':
			if(previousOperator === null){
				return
			}
			flushOperation(parseFloat(buffer));
			previousOperator = null;
			buffer = runningTotal;
			runningTotal = 0;
			break;
		//Elimina el ultimo numero
		case '←':
			if(buffer.length ===1){
				buffer = '0';
			}else{
				buffer = buffer.substring(0,buffer.length - 1);
			}
			break;
		case '√':
			buffer = Math.sqrt(buffer);
			runningTotal = 0;
			break;
		case '+':
		case '−':
		case '×':
		case '÷':
		case '^':
			handleMath(symbol);
			break;			
		case '.':
			if(buffer.substring(buffer.length - 1, buffer.length) === '.'){
				return
			}else{
				buffer = buffer + '.';
			}

	}
}

//Mete lo de la pantalla en el buffer y realiza la operacion
function handleMath(symbol){
	if(buffer === '0'){
		return;
	}

	const intBuffer = parseFloat(buffer);

	if(runningTotal === 0){
		runningTotal = intBuffer;
	}else{
		flushOperation(intBuffer);
	}
	previousOperator = symbol;
	buffer = '0';
}

//Haze operaciones basicas
function flushOperation(intBuffer){
	if(previousOperator === '+'){
		runningTotal += intBuffer;
	}else if(previousOperator === '−'){
		runningTotal -= intBuffer;
	}else if(previousOperator === '×'){
		runningTotal *= intBuffer;
	}else if(previousOperator === '÷'){
		runningTotal /= intBuffer;
	}else if(previousOperator === '^'){
		runningTotal **= intBuffer;
	}
}

//Añade el numero a la pantalla
function handleNumber(numberString){
	if(buffer === '0'){
		buffer = numberString;
	}else{
		buffer += numberString;
	}
}

//Inicializa los botones para que se puedan pulsar
function init(){
	document.querySelector('.calculator_buttons').addEventListener
	('click', function(event){
		buttonClik(event.target.innerText);
	})
}

init();