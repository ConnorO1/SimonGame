buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var start = false;

// start game here

function checkAnswer(currentLevel) {
  var booly = (userClickedPattern[currentLevel] === gamePattern[currentLevel]);


  if (start) {
     if (booly && gamePattern.length === userClickedPattern.length) {
       console.log("good");

       setTimeout(function() {
         newSequence();
       }, 1000);

       userClickedPattern = [];
     }
     else if (!booly){
       console.log("bad");
       playSound("wrong");
       $("body").addClass("game-over");
       $("h1").text("Game Over, Press Any Key to Restart");
       startOver();

       setTimeout(function() {
         $("body").removeClass("game-over");
       }, 200);


     }
   }
};

$(document).keypress(function() {
  if (!start){
    $("h1").text("Level " + level);
    newSequence();
    start = true;
  }
});

function newSequence() {

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

};


$(".btn").click(function(event) {


  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // check checkAnswer

  var gLevel = userClickedPattern.length - 1;
  checkAnswer(gLevel);

});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
};

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};


function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  start = false;
}
