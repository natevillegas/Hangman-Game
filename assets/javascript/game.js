var wordBank = ["skrrt","bao","aye","versace","raindrop","droptop","leggo","toptop","yeah","aye","bando","datway"];
var randNum;
var word;
var userChoiceArray = [];
var userIndexArray = [];
var guesses = 0;
var chances = 10;
var score = 0;
var guessingDisabled = false;
var gameStart = false;
newGame();

document.onkeyup = function(event) {
    var userInput = String.fromCharCode(event.keyCode).toLowerCase();
    if ((event.keyCode >= 65) && (event.keyCode <= 90) && (guessingDisabled == false))  {
      gameStart = true;
      if (userChoiceArray.indexOf(userInput) >= 0) {
        alert("You already guessed that!");
      }
      
      else { 
        userChoiceArray.push(userInput);
        if (userChoiceArray.length == 1);
        document.querySelector("#used").innerHTML = userChoiceArray.toString();
        if (word.indexOf(userInput) == -1) {
          guesses++;
          document.querySelector("#chances").innerHTML = guesses;
        }

        if (guesses == chances) {
          document.querySelector("#result").innerHTML = "YOU LOSE!";
          if (chances == 10) score--;
          if (chances == 5) score--;
          if (chances == 3) score--;
          updateScore();
          guessingDisabled = true;
          gameStart = false;
          enable();
        }

        for (var i = 0; i < word.length; i++) {
            if (word[i] == userInput) userIndexArray
            .push(i);
        }

        if (userIndexArray
        .length > 0) {
            for (i = 0; i < userIndexArray.length; i++) {
                document.querySelector("#letter" + userIndexArray[i]).innerHTML = "  " + userInput + "  ";
            }
            userIndexArray = [];
        }

        var win = false;
        var sum = 0;
        var counter = 0;

        while (!win) {
            if (userChoiceArray.indexOf(word[counter]) >= 0) sum++;
            if (sum == word.length) {
                win = true;
                document.querySelector("#result").innerHTML = "DAB! YOU WIN!";
                if (chances == 10) score++;
                if (chances == 5) score++;
                if (chances == 3) score++;
                updateScore();
                guessingDisabled = true;
                gameStart = false;
                enable();
            }

            if (counter == userChoiceArray.length) break;
            counter++;
        }
      } 
    }
}

function newStart() {
    if (gameStart == true || userChoiceArray.length == 0) {
        newGame();
    }
};

function easyMode()  {
    if (gameStart == false || userChoiceArray.length == 0) {
        chances = 10;
        newGame();
    }
};

function mediumMode()  {
    if (gameStart == false || userChoiceArray.length == 0) {
        chances = 5;
        newGame();
    }
};

function hardMode()  {
    if (gameStart == false || userChoiceArray.length == 0) {
        chances = 3;
        newGame();
    }
};

function getWord() {
    randNum = Math.floor(Math.random() * wordBank.length);
    word = wordBank[randNum];
    return word;
}

function blankSpace(string) {
    for (var i = 0; i < string.length; i++) {
        document.querySelector("#wordSpace").innerHTML += "<span id=letter" + i + ">_" + " " + "</span>";
        document.querySelector("#message").innerHtml = "Use the letters on your keyboard to guess each letter.";
    }
}

function updateScore() {
  document.querySelector("#score").innerHTML = "$" + score + "M";
}

function reset() {
    guesses = 0;
    win = false
    counter = 0;
    sum = 0;
    userChoiceArray = [];
    userIndexArray
   = [];
    guessingDisabled
   = false;
    gameStart = false;
    word = "";
    randNum = 0;
    document.querySelector("#wordSpace").innerHTML = "";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#used").innerHTML = "";
    document.querySelector("#chances").innerHTML = guesses;

}

function enable() {
    document.querySelector("#message").innerHtml = "Use the letters on your keyboard to guess each letter.";
}

function newGame() {
    reset();
    blankSpace(getWord());
}
