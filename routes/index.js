const express = require("express");
const router = express.Router();
// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let randomArray = ["bonnet", "chaos", "curious", "rent", "dress", "coffee", "frustration"];
let chooseRandom = randomArray[Math.floor (Math.random() * randomArray.length)];
console.log("random word", chooseRandom);

let count = 0;
let underscores;
let guessArray = [];



router.get("/", function(req, res) {
  function newGame (){
    for (var i = 0; i < chooseRandom.length; i++) {
      guessArray[i] = "_ ";
    }
    underscores = guessArray.join(" ");
    


  console.log(req.session);
  res.render("game_play", {underscores: underscores});
});

router.get("/win", function(req, res) {
  res.render("win");
});

router.get("/lose", function(req, res) {
  res.render("lose");
});

router.post("/words", function(req, res){
  let letter = body.value


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
      req.session.token = "78687hksdhjkfhkjahkjlh"
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













module.exports = router;
