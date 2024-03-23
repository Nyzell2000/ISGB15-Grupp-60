"use strict";



//Testutskrifter
/*
console.log( oGameData );
oGameData.initGlobalObject();
console.log( oGameData.gameField );
console.log( oGameData.checkForGameOver() );
*/

/*
console.log( oGameData.checkHorizontal() );
console.log( oGameData.checkVertical() );
console.log( oGameData.checkDiagonalLeftToRight() );
console.log( oGameData.checkDiagonalRightToLeft() );
console.log( oGameData.checkForDraw() );
*/



/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    // oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function() {

    var over = 0;
    var arr = oGameData.gameField;
    var draw=0;

    for (var i=0; i < arr.length; i++){
        if (arr[i] != "")
        draw++;
    }
    if (draw === 9){
    over  = 3;
    }

    //  oGameData.checkHorizontal = function (){

        if (arr[0] === "X" && arr[1] === "X" && arr[2] === "X"){
            over = 1;
        }

        else if (arr[3] === "X" && arr[4] === "X" && arr[5] === "X"){
            over = 1;   
        }

        else if (arr[6] === "X" && arr[7] === "X" && arr[8] === "X"){
            over = 1;
        }

        else if (arr[0] === "O" && arr[1] === "O" && arr[2] === "O"){
            over = 2;
        }

        else if (arr[3] === "O" && arr[4] === "O" && arr[5] === "O"){
            over = 2;   
        }

        else if (arr[6] === "O" && arr[7] === "O" && arr[8] === "O"){
            over = 2;
        }
       // return over;
    //}

      //  oGameData.checkVertical = function (){

         if (arr[0] === "X" && arr[3] === "X" && arr[6] === "X"){
            over = 1;   
        }

        else if (arr[1] === "X" && arr[4] === "X" && arr[7] === "X"){
            over = 1;   
        }

        else if (arr[2] === "X" && arr[5] === "X" && arr[8] === "X"){
            over = 1;   
        }

        else if (arr[0] === "O" && arr[3] === "O" && arr[6] === "O"){
            over = 2;   
        }

        else if (arr[1] === "O" && arr[4] === "O" && arr[7] === "O"){
            over = 2;   
        }

        else if (arr[2] === "O" && arr[5] === "O" && arr[8] === "O"){
            over = 2;   
        }
       // return over;
   // }

    //  oGameData.checkDiagonalLeftToRight = function(){       

        if (arr[0] === "O" && arr[4] === "O" && arr[8] === "O"){
            over = 2;   
        }
        else if (arr[0] === "X" && arr[4] === "X" && arr[8] === "X"){
            over = 1; 
        }
      //  return over;
    //}

      //  oGameData.checkDiagonalRightToLeft = function(){

        if (arr[2] === "O" && arr[4] === "O" && arr[6] === "O"){
            over = 2;   
        } 
        else if (arr[2] === "X" && arr[4] === "X" && arr[6] === "X"){
            over = 1;
        }
    //}
       // oGameData.checkForDraw = function(){

     //   }

    return over;
    }

    document.addEventListener( "DOMContentLoaded", function(){
    
        oGameData.initGlobalObject();
        document.querySelector("#game-area").classList.add("d-none");
        
        newGame.addEventListener("click", oGameData.validateForm);
    });
    
    //funktion som validerar att nicks är större än 5, samt colors inte är vit eller svart eller samma.
    oGameData.validateForm = function (oEvt) {
        let nickNames = document.querySelectorAll('input[type="text"]');
        let colors = document.querySelectorAll('input[type="color"]');
        
        
    
        try{
    
            nickNames.forEach(nick=>{
                if(nick.value.length<5){
                    nick.focus();
                    throw new Error('Ange ' + nick.getAttribute('title'));
                }
            });
    
            if (nickNames[0].value=== nickNames[1].value){
                throw new Error("Nicknames får inte vara samma!");
            }
    
    
            colors.forEach(color=>{
                if(color.value === '#000000' || color.value === '#ffffff'){
                    color.focus();
                    throw new Error("Färgen får inte vara svart eller vit");
                }
    
            });
    
            if(colors[0].value === colors[1].value){
                colors[0].focus();
                colors[1].focus();
                throw new Error("Färgerna får inte vara samma");
            }
    
            oGameData.initiateGame();
    
        }
        catch(error){
            oEvt.preventDefault();
            let oError = document.querySelector('#errorMsg');
            document.querySelector("#errorMsg").textContent = error.message;
            oError.setAttribute('class', 'alert alert-danger');
        }
    
    }
    
    oGameData.initiateGame = function(){
        document.querySelector("form").classList.add("d-none");
        document.querySelector("#game-area").classList.remove("d-none");
    
        document.querySelector('#errorMsg').textContent = "";
    
        oGameData.nickNamePlayerOne = document.querySelector("#nick1").value;
        oGameData.nickNamePlayerTwo = document.querySelector("#nick2").value;
        oGameData.colorPlayerOne = document.querySelector("#color1").value;
        oGameData.colorPlayerTwo = document.querySelector("#color2").value;
    
        //console.log(oGameData.nickNamePlayerOne);

        document.querySelectorAll("td").forEach(td => {
            td.textContent = "", td.backgroundColor = "#ffffff"
        }); 
    
        let playerChar = null;
        let playerName = null;
        let playerColor = null;
    
        if(Math.random()>0.5){
            playerChar = oGameData.playerOne;
            playerName = oGameData.nickNamePlayerOne;
            playerColor = oGameData.colorPlayerOne;
            oGameData.currentPlayer = playerName;
        } else {
            playerChar = oGameData.playerTwo;
            playerName = oGameData.nickNamePlayerTwo;
            playerColor = oGameData.colorPlayerTwo;
            oGameData.currentPlayer = [playerName] + [playerChar] + [playerColor];
        }
    
        document.querySelector(".jumbotron").textContent = "Aktuell spelare är " + playerName;
          
        document.querySelector('table').addEventListener('click', executeMove);

        function executeMove(oEvt){
    
            if(oEvt.target.nodeName === 'TD'){
                oEvt.target.style.backgroundColor = playerColor;
                oEvt.target.textContent = playerChar;
            }
    

        executeMove();
    }


    }
    
    



