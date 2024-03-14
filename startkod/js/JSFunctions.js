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
    oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
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

       oGameData.checkHorizontal = function (){

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
        return over;
    }

        oGameData.checkVertical = function (){

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
        return over;
    }

      oGameData.checkDiagonalLeftToRight = function(){       

        if (arr[0] === "O" && arr[4] === "O" && arr[8] === "O"){
            over = 2;   
        }
        else if (arr[0] === "X" && arr[4] === "X" && arr[8] === "X"){
            over = 2; 
        }
        return over;
    }

        oGameData.checkDiagonalRightToLeft = function(){

        if (arr[2] === "O" && arr[4] === "O" && arr[6] === "O"){
            over = 2;   
        } 
        else if (arr[2] === "X" && arr[4] === "X" && arr[6] === "X"){
            over = 2;
        }
    }
        oGameData.checkForDraw = function(){
            var draw=0;
            for (var i=0; i < arr.length; i++){
                if (arr[i] != "")
                draw++;
            }
            if (draw === 9){
            over  = 3;
            }
        }

    return over;
    }



document.addEventListener( "DOMContentLoaded", function(){
    
    oGameData.initGlobalObject();
    document.querySelector("#game-area").classList.add("d-none");
    
    newGame.addEventListener("click", validateForm);
});

function validateForm() {
    var oNick1 = document.getElementById("nick1");
    var oNick2 = document.getElementById("nick2");
    var oColor1 = document.getElementById("color1");
    var oColor2 = document.getElementById("color2");
    var oError = document.getElementById("errorMsg");

    if(oNick1.length < 5 || oNick2.length < 5 || oNick1 === oNick2 || oColor1 === oColor2 || oColor1.value == "#000000" || oColor1.value == "#FFFFFF" || oColor2.value == "#000000" || oColor2.value == "#FFFFFF"){
      oError.style.display = "block";
    }else {
        oError.style.display = "none";
    }
}



console.log( oGameData );
oGameData.initGlobalObject();
console.log( oGameData.gameField );
console.log( oGameData.checkForGameOver() );
console.log(oGameData.checkHorizontal() );
