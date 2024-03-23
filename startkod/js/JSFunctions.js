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
    //oGameData.gameField = Array('O', 'O', 'O', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');
    //oGameData.gameField = Array('', '', '', '', '', '', 'O', 'O', 'O');

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

    var win = 0;    
    
    if (oGameData.checkForDraw() !== false){    // Sätter win till 'draw' om true returneras.
       win = 'draw';
    }

    if (oGameData.checkHorizontal() !== false){ // Sätter win till returvärdet, 'X' eller 'O', om false inte returneras.
        win = oGameData.checkHorizontal();
    }

    if (oGameData.checkVertical() !== false){   // Sätter win till returvärdet, 'X' eller 'O', om false inte returneras.
        win = oGameData.checkVertical();
    }

    if (oGameData.checkDiagonalLeftToRight() !== false){    // Sätter win till returvärdet, 'X' eller 'O', om false inte returneras.
        win = oGameData.checkDiagonalLeftToRight();
    }

    if (oGameData.checkDiagonalRightToLeft() !== false){    // Sätter win till returvärdet, 'X' eller 'O', om false inte returneras.
        win = oGameData.checkDiagonalRightToLeft();
    }


    if (win === 'X'){                       // Kollar värdet på win 
        return 1;                           // och returnerar 0, 1, 2 eller 3.
    } else if (win === 'O'){                
        return 2;
    } else if (win === 'draw'){
        return 3;
    } else {
        return 0;
    }


    }

    oGameData.checkHorizontal = function(){ /*Returnerar värdet på den första platsen i arrayen där den hittade 3 
                                            i rad horisontellt, annars returnerar det false.*/
        let arr = oGameData.gameField;
        

        for (let i = 0; i<9; i+=3){
            if (arr[i] != '' && arr[i] === arr[i+1] && arr[i+1] === arr[i+2]){
                return arr[i];   
            }
        }
        return false;
    }

    oGameData.checkVertical = function (){  /*Returnerar värdet på den första platsen i arrayen där den hittade 3 
                                            i rad vertikalt, annars returnerar det false.*/

        var arr = oGameData.gameField;
        

        for (let i = 0; i<3; i++){
            if (arr[i] != '' && arr[i] === arr[i+3] && arr[i+3] === arr[i+6]){
                return arr[i];     
            }
        }
        return false;
    }


    oGameData.checkDiagonalLeftToRight = function(){ /*Returnerar värdet på den första platsen i arrayen där den hittade 3 
                                                     i rad diagonalt från vänster till höger, annars returnerar det false.*/
        var arr = oGameData.gameField;  
        

        if (arr[0] != '' && arr[0] === arr[4] && arr[4] === arr [8]){
            return arr[0];
        }
        return false;
    }

    oGameData.checkDiagonalRightToLeft = function(){ /*Returnerar värdet på den första platsen i arrayen där den hittade 3 
                                                     i rad diagonalt från höger till vänster, annars returnerar det false.*/

        var arr = oGameData.gameField;
        

        if (arr[2] != '' && arr[2] === arr[4] && arr[4] === arr [6]){
            return arr[2];
        }
        return false;
    }

    oGameData.checkForDraw = function() {  //Returnerar false om det finns en tom plats i arrayen, returner true om hela loopen körs igenom.

        var arr = oGameData.gameField;
 

        for (let i = 0; i < 9 ; i++){
            if (arr[i] === ""){
                return false;
                }
            }
        return true;
    }


    window.addEventListener( "load", function(){    //Kallar på oGameData.initGlobalObject(); när sidan har laddats, 
                                                    //Gömmer spelplanen och sätter en lyssnare på newGame knappen som   
                                                    // kallar på validateForm när den klickas.
        oGameData.initGlobalObject();
        document.querySelector("#game-area").classList.add("d-none");

        
        
        newGame.addEventListener("click", validateForm);
    });

    
    
    function validateForm(oEvt) {               //Kontrollerar att nicknames inte är tomma,
                                                //kortare än 5 karaktärer och inte är samma för båda.
                                                //Kontrollerar att färgerna inte är svart, vit eller samma för båda.
                                                //Kallar på initiateGame(); om inget error kastas.

        let nickNames = document.querySelectorAll('input[type="text"]');
        let colors = document.querySelectorAll('input[type="color"]');
        
        
    
        try{
    
            nickNames.forEach(nick=>{
                if(nick.value.length<5 && nick.value.length != 0){
                    nick.focus();
                    throw new Error('Ange ' + nick.getAttribute('title'));
                }
            });

            nickNames.forEach(nick=>{
                if(nick.value.length === 0){
                    nick.focus();
                    throw new Error(nick.getAttribute('title') + " får inte vara tom!");
                }
            });
    
            if (nickNames[0].value === nickNames[1].value){
                throw new Error("Nicknames får inte vara samma!");
            }
    
    
            colors.forEach(color=>{
                if(color.value === '#000000' || color.value === '#ffffff'){
                    color.focus();
                    throw new Error("Färgen får inte vara svart eller vit");
                }

                
    
            });
    
            if(colors[0].value === colors[1].value){
                throw new Error("Färgerna får inte vara samma!");
            }
    
            initiateGame();
    
        }
        catch(error){
            oEvt.preventDefault();
            let oError = document.querySelector('#errorMsg');
            document.querySelector("#errorMsg").textContent = error.message;
            oError.setAttribute('class', 'alert alert-danger');
        }
    
    }
    
    function initiateGame() {       //Gör spelplanen synlig, gömmer formuläret och tömmer errorMsg.
                                    //Hämtar nicknames och färg och tilldelar de till spelare 1 och spelare 2.
                                    //Slumpar vem som ska börja med math.random.


        document.querySelector("form").classList.add("d-none");
        document.querySelector("#game-area").classList.remove("d-none");
        document.querySelector('#errorMsg').textContent = "";
    
        oGameData.nickNamePlayerOne = document.querySelector("#nick1").value;
        oGameData.nickNamePlayerTwo = document.querySelector("#nick2").value;
        oGameData.colorPlayerOne = document.querySelector("#color1").value;
        oGameData.colorPlayerTwo = document.querySelector("#color2").value;
    

        document.querySelectorAll("td").forEach(td => {
            td.textContent = "";
            td.style.backgroundColor = "white";
        });     
    
        let playerChar = null;
        let playerName = null;
        
    
        if(Math.random()>0.5){
            playerChar = oGameData.playerOne;
            playerName = oGameData.nickNamePlayerOne;
            oGameData.currentPlayer = oGameData.playerOne;
        } else {
            playerChar = oGameData.playerTwo;
            playerName = oGameData.nickNamePlayerTwo;
            oGameData.currentPlayer = oGameData.playerTwo;
        }

    
        document.querySelector(".jumbotron h1").textContent = "Aktuell spelare är " + playerName + "(" + playerChar + ")";
          
        document.querySelector('table').addEventListener('click', executeMove);
    }

    function executeMove(oEvt){
    
        if(oEvt.target.nodeName === 'TD' && oEvt.target.textContent === ""){

            oEvt.target.textContent = oGameData.currentPlayer;
            oGameData.gameField[oEvt.target.getAttribute("data-id")] = oGameData.currentPlayer;

            

            if (oGameData.currentPlayer === "X"){ 
                oEvt.target.style.backgroundColor = oGameData.colorPlayerOne;
            }else {
                oEvt.target.style.backgroundColor = oGameData.colorPlayerTwo;
            }

            if (oGameData.currentPlayer === "X"){ 
                oGameData.currentPlayer = oGameData.playerTwo;
                document.querySelector(".jumbotron h1").textContent = "Aktuell spelare är " + oGameData.nickNamePlayerTwo + "(" + oGameData.currentPlayer + ")";
            }else {
                oGameData.currentPlayer = oGameData.playerOne;
                document.querySelector(".jumbotron h1").textContent = "Aktuell spelare är " + oGameData.nickNamePlayerOne + "(" + oGameData.currentPlayer + ")";
            }
    
            if (oGameData.checkForGameOver() > 0){
                document.querySelector(".jumbotron h1").textContent = "Grattis någon vann!";
            }
            console.log(oGameData.checkForGameOver());
            console.log(oEvt.target.textContent);
            console.log(oGameData.gameField);
            console.log(oEvt.target);
        }
    } 




