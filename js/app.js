//Inicialización de variabes 
let flipCards = 0; 
let card1 = null;
let card2 = null;
let renderFirst = null; 
let renderSecond = null; 
let moves = 0; 
let hits = 0; 
let time = 30; 
let timer = false; 
let countDown = null; 
let started = false;
//apuntando a documento html 
let showMoves = document.getElementById('moves')
let showHits = document.getElementById('hits')
let timeLeft = document.getElementById('time-left')
let statusGame = document.getElementById('status')

//arreglos de números
let elements = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]; 

elements =elements.sort(() =>Math.random()-0.5)
 function measureTime(){
    countDown = setInterval(() =>{
        time --;
        timeLeft.innerHTML = `Tiempo: ${time}`

        if(time ==0){
            clearInterval(countDown); 
            blockCards(); 
        }
    }, 1000);
}

let startGame = () =>{
    if(!started){

        blockCards(); 
        setTimeout(() =>{
            unBlockCards(); 
            measureTime();
        }, 1000);
        started = true;
        endGame(); 
    }
};


function blockCards(){
    for(let i = 0; i < 16; i ++){
    let blockedCard = document.getElementById(i);
    blockedCard.innerHTML = elements[i];
    blockedCard.disabled = true; 
    }
}
function unBlockCards(){
    for(let i = 0; i < 16; i ++){
    let blockedCard = document.getElementById(i);
    blockedCard.innerHTML = ' ';
    blockedCard.disabled = false; 
    }
}

function showCard(id){
    startGame();
 
    flipCards ++; //

    if(flipCards == 1){
        //mostrar el primer número
    card1 = document.getElementById(id); 
    card1.innerHTML = elements[id]; 
    //deshabilitar el primer boton 
    card1.disabled = true; 
    renderFirst = elements[id]; 
    }else if(flipCards == 2){ 
        //mostrar el segundo boton

        card2 = document.getElementById(id); 
        renderSecond = elements[id];
        card2.innerHTML = renderSecond; 

        //Deshabilitar el boton 
        card2.disabled = true; 
        //incrementar ficha de movimientos 
        moves ++; 
        showMoves.innerHTML = `Movimientos: ${moves}`
        if(renderFirst == renderSecond) {
            flipCards = 0; 
            
            //aumentar Aciertos 
            hits++; 
            showHits.innerHTML = `Aciertos: ${hits}`

         
        }else{
            //mostrar momentaneamente valores y tapar nuevamente 

            setTimeout(() =>{
                card1.innerHTML = ' '
                card2.innerHTML = ' '
                card1.disabled = false; 
                card2.disabled = false; 
                flipCards = 0;       
            },700)
        }
    }
}
function endGame(){
    setTimeout(() =>{
        if(hits == 8){
            statusGame.innerHTML += '<h2 class="win status">¡Felicidades ganaste!</h2>'
        }else{
            statusGame.innerHTML += '<h2 class="lost status">Perdiste, sigue Intentando</h2>'
        }
    },31000);
}