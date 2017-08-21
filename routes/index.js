const express = require("express");
const router = express.Router();
// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let randomArray = ["bonnet", "chaos", "curious", "rent", "dress", "coffee", "frustration"];
let chooseRandom = randomArray[Math.floor (Math.random() * randomArray.length)];
console.log("random word", randomArray);

let count = 0;
let underscores;
let guessArray = [];
let playerGuess = [];


router.get("/", function(req, res) {
  req.session.guesses = 8;
  req.session.token = "78687hksdhjkfhkjahkjlh";

  function newGame (){
    for (var i = 0; i < chooseRandom.length; i++) {
      guessArray[i] = "_ ";
    }
    underscores = guessArray.join(" ");
  }
newGame();


  // res.render("game_play", guess)
  console.log(req.session.token);
  res.render("game_play", {underscores: underscores});
});

router.get("/win", function(req, res) {
  res.render("win");
});

router.get("/lose", function(req, res) {
  res.render("lose");
});

router.post("/words", function(req, res){



  req.checkBody("letter", '*Please Enter 1 Letter Per Turn*').isLength({min:1, max:1});
  req.checkBody("letter", '*Must Enter A Letter*').isAlpha();

  let errors = req.getValidationResult();
  let messages = [];


    errors.then(function(result) {
      result.array().forEach(function(error) {
        messages.push(error.msg);
    })
        let obj = {
      errors: messages,
      }
      console.log(req.session);

      console.log(obj.errors, "these are errors");
      res.render("game_play", obj);
    })

})

router.post("/retry", function(req, res){
  req.session.destroy(function(err){
    console.log("token destroyed");
  });
  res.redirect('/');
})

router.post("/words", function(req, res){
  req.body.value += playerGuess;
  guess = req.body.value
  console.log("this is the guessed letter", playerGuess);
  res.render("game_play", guess)
})











module.exports = router;
