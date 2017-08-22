const express = require("express");
const router = express.Router();
const fs = require("fs");
// const randomArray = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


let randomArray = ["bonnet", "chaos", "curious", "rent", "dress", "coffee", "frustration"];
let randomWord = randomArray[Math.floor (Math.random() * randomArray.length)];
console.log("random word", randomWord);
// console.log(words);
let underscores;
let guessArray = [];
let playerGuess = [];
let obj = {};
let turns = 8;

router.get("/", function(req, res) {
  // req.session.guesses = 8;
  req.session.token = "78687hksdhjkfhkjahkjlh";


  function newGame (){
    for (var i = 0; i < randomWord.length; i++) {
      guessArray[i] = "_ ";
    }
    underscores = guessArray.join(" ");
  }
newGame();

obj = {
  word: randomWord,
  turns: turns,
  underscores: underscores
}
  console.log(req.session.token);
  res.render("game_play", obj);
});



router.get("/win", function(req, res) {
  res.render("win");
});

router.get("/lose", function(req, res) {
  res.render("lose");
});



router.post("/words", function(req, res){
  console.log(randomWord);
  underscores = '';

  let guess = req.body.letter
  console.log(req.body.letter);



  req.checkBody("letter", '*Please Enter 1 Letter Per Turn*').isLength({max:1});
  req.checkBody("letter", '*Must Enter A Letter*').isAlpha();

  let errors = req.getValidationResult();
  let messages = [];


    errors.then(function(result) {
      result.array().forEach(function(error) {
        messages.push(error.msg);
    })

    let obj = {};
    if(messages.length !== 0){
      obj.errors = messages;
    }
    let letterFound = randomWord.indexOf(guess) !== -1;
    let playerAlreadyGuessed = playerGuess.indexOf(guess) !== -1;

    if (!playerAlreadyGuessed) {
      playerGuess.push(guess);
      if (!letterFound) {
        turns -= 1;
      }
    }


    let reachedUnderscore = false;
    console.log("guesses: ", playerGuess);
    console.log("req.body.letter: ", req.body.letter);
    for (var i = 0; i < randomWord.length; i++) {
      let currentLetter = randomWord[i];

      let beenGuessed = playerGuess.indexOf(currentLetter) !== -1;

      if (beenGuessed === true){
        underscores += currentLetter + ' ';
      } else {
        reachedUnderscore = true;
        underscores += '_ '
      }
      // res.render("game_play", beenGuessed)

    console.log("this letter has been guessed", beenGuessed);
    console.log("random index", randomWord[i]);
    }
    console.log("this is a letter from randomWord", randomWord.indexOf());

    obj.guesses = playerGuess;
    obj.turns = turns;
    obj.underscores = underscores;
    if (!reachedUnderscore) {
      res.render('win');
    } else if (turns === 0) {
      res.render('lose');
    } else {
      res.render("game_play", obj)
    }

  })

})

router.post("/retry", function(req, res){
  req.session.destroy(function(err){
    console.log("token destroyed");
  });
  turns = 8;
  randomWord = randomArray[Math.floor (Math.random() * randomArray.length)];
  underscores;
  guessArray = [];
  playerGuess = [];
  res.redirect('/');
})



module.exports = router;
