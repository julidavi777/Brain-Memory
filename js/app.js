//Inicializaciopn de variabes 
let tarjetasDestapadas = 0; 
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null; 
let segundoResultado = null; 
let movimientos = 0; 
let aciertos = 0; 
let timer = 30; 
let temporizador = false; 
let tiempoRegresivoId = null; 
//apuntando a documento html 
let mostrarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')
let tRestante = document.getElementById('t-restante')

console.log(mostrarMovimientos);
console.log(mostrarAciertos);
console.log(tRestante);

//arreglos de números
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]; 

numeros =numeros.sort(() =>Math.random()-0.5)
console.log(numeros)
 function contarTiempo(){

    tiempoRegresivoId = setInterval(() =>{
        timer --;
        tRestante.innerHTML = `Tiempo: ${timer}`

        if(timer ==0){
            clearInterval(tiempoRegresivoId); 
            bloquearTarjetas(); 
        }
    }, 1000);
}

function bloquearTarjetas(){
    for(let i = 0; i < 15; i ++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true; 
    }
}
function destapar(id){

    if(temporizador == false){
        contarTiempo(); 
        temporizador = true;
    }
    tarjetasDestapadas ++; //
    console.log(tarjetasDestapadas)

    if(tarjetasDestapadas == 1){
        //mostrar el primer número
    tarjeta1 = document.getElementById(id); 
    tarjeta1.innerHTML = numeros[id]; 
    //deshabilitar el primer boton 
    tarjeta1.disabled = true; 
    primerResultado = numeros[id]; 
    }else if(tarjetasDestapadas == 2){ 
        //mostrar el segundo boton

        tarjeta2 = document.getElementById(id); 
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado; 

        //Deshabilitar el boton 
        tarjeta2.disabled = true; 
        //incrementar ficha de movimientos 
        movimientos ++; 
        console.log(movimientos)
        mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}`
        if(primerResultado == segundoResultado) {
            tarjetasDestapadas = 0; 
            
            //aumentar aciertos 
            aciertos++; 
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`

            if(aciertos == 8){
                mostrarAciertos.innerHTML += '<p>Juego finalizado</p>'
            }
        }else{
            //mostrar momentaneamente valores y tapar nuevamente 

            setTimeout(() =>{
                tarjeta1.innerHTML = ' '
                tarjeta2.innerHTML = ' '
                tarjeta1.disabled = false; 
                tarjeta2.disabled = false; 
                tarjetasDestapadas = 0; 
            },1000)
        }
    }
}