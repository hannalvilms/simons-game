//button color array
var buttonColors=["red", "blue", "green", "yellow", "purple", "pink"];

//game pattern
var gamePattern=[];
//clicked pattern
var userClickPattern=[];

//call nextSequence only on the first keypress
var started = false;
//first level
var level = 0;

//detect when a key has been pressed
$(document).keypress(function(){
  if (!started) {
    //change title to level 0
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  //stores the id of the button that got clicked
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //calls checkAnswer() after the users click
  checkAnswer(userClickPattern.length-1);
});


function checkAnswer(currentLevel){

  //check if the answer is the same as the game pattern
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

    //if the user got the color right, check that they've finished sequence with another
    if (userClickPattern.length === gamePattern.length){
    //Call nextSequence() after a 1000 millisecond delay
      setTimeout(function () {
          nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}



function nextSequence(){

  //when nextSequence() triggered, prepares the userClickPattern for the next level
  userClickPattern = [];
  //increase level by 1
  level++;

  $("#level-title").text("Level " + level);
  //generates new random number
  var randomNumber = Math.floor(Math.random() * 6);
  //choose random color from button colors
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //button flash animation
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //plays the sound of a chosen color
  playSound(randomChosenColor);
};


function animatePress(currentColor){
  //add class to the button when gets pressed
  $("#" + currentColor).addClass("pressed");
  //remove class after 1s
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

function playSound(name){
  //add sound for the buttons
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
};

function startOver(){
  //resets the values
  level = 0;
  gamePattern = [];
  started = false;
}
