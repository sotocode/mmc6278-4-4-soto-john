var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

var word;
var answerArray = [];
var userGuess;
var rightGuess = false;
var userRightGuess = 0;
var left = 10;
var wins = 0;
var losses = 0;

//shorten the code
let $ = function (id) {
  return document.getElementById(id)
}

//random word
function random() {
  let random = Math.floor(Math.random() * words.length);
  word = words[random]
}

//show blank start
function showBlank() {
  for (i = 0; i < word.length; i++) {
      answerArray[i] = "_"
  }
  $("word-to-guess").innerHTML = answerArray.join("")
}

//guesses left
function guessesLeft() {
  $("remaining-guesses").innerHTML = left
}

//wins
function winsScore() {
  $("wins").innerHTML = wins
}

//losses
function lossesScore() {
  $("losses").innerHTML = losses
}

//show wrong guess
function wrongGuess(char) {
  $("incorrect-letters").innerHTML += char + ", "
}

// resent function
function initialGame() {
  if ($("winImage")) {
      $("winImage").remove()
  }

  left = 10;
  answerArray = [];
  $("incorrect-letters").innerHTML = "";
  userRightGuess = 0
  rightGuess = false;
  guessesLeft()
  random()
  showBlank()
}

// call initial function
initialGame()
winsScore()
lossesScore()

//check letter
function showLetter(char, str) {
    for (let j = 0; j < str.length; j++) {
        if (char === str[j]) {
            rightGuess = true
            answerArray.splice(j,1,char)
            userRightGuess++
        }
    }
    $("word-to-guess").innerHTML = answerArray.join("")
}

//check length
let matchLength = function() {
    if (word.length === userRightGuess) return true
    else return false
}

//user guess
document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();
    showLetter(userGuess, word)
    if (rightGuess) {
        rightGuess = false
        if (matchLength()) {
            wins++
            winsScore()
            $("previous-word").textContent = word;
            initialGame()
        }
    } else {
        left--
        if (left < 1) {
            initialGame()
            losses++
            lossesScore()
            $("previous-word").textContent = word;
        } else {
            wrongGuess(userGuess)
            guessesLeft()
        }

    }
}