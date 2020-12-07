// emtpy array for user pattern to be created
var userClickedPattern = [];
//possible values for the arrays
var buttonColours = ["red", "blue", "green", "yellow"];
//game pattern is created as the game plays
var gamePattern = [];
//false is the load state so the game can be started by keypress
var started = false;
//starting level
var level = 0;


//random background generator
//gen number 1-4
var backgroundRandomNumber = Math.ceil(Math.random() * 4);
//log number
console.log(backgroundRandomNumber);
//apply background based on number from selection background-1-4.png
$("body").css("background-image","url(images/background-" + backgroundRandomNumber + ".png)");
//change text colour based on background
//if 1 OR 4 then change to white
if (backgroundRandomNumber === 1 || backgroundRandomNumber === 4){
  $("#level-title,h3,.foot-notes,a:link").css("color","#ffff")
};


//start game funciton
$(document).keypress(function() {
  //!means true becomes false/false becomes true
  if (!started){
    //start the function
    nextSequence();
    //change the started value to true so it doesn't repeat unless started is changed
    started = true;
  }
});


//game sequence
function nextSequence() {
  //resets user array for re-entry per level
  userClickedPattern = [];
  //advance level number
  level++;
  //change h1 level number
  $("#level-title").text("Level " + level);
  //random number gen
  var randomNumber = Math.floor(Math.random() * 4);
  //number to colour change
  var randomChosenColour = buttonColours[randomNumber];
  //push colour to game pattern array
  gamePattern.push(randomChosenColour);
  //animate random colour chosen & play sound
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};


//check answer function
function checkAnswer(currentLevel){
  //checks last item in array
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
  //console
  console.log("success");
  //checks if array length matches before moving to next level
  if ((gamePattern.length) === (userClickedPattern.length)){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
//if it's wrong
else {
  //console
  console.log("wrong");
  //sound
  playSound("wrong");
  //body change
  $("body").css("background-image" , "none")
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
    $("body").css("background-image","url(images/background-" + backgroundRandomNumber + ".png)");
  },1000);
//change h1
  $("#level-title").text("Game Over, Press Any Key To Restart")
  startOver();
}
}


// restart the game changes these values to match the start of the game
function startOver(){
  level=0;
  gamePattern = [];
  started = false;
}


//click function
$(".btn").click(function() {
  //selects the ID of the pressed button
  var userChosenColour = $(this).attr("id");
  //pushes it to user pattern array
  userClickedPattern.push(userChosenColour);
  //plays the sound and animation for chosen colour
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //runs the check answer function using the length of the array as current level input (-1 because array starts at 0)
  checkAnswer(userClickedPattern.length-1);
});


//sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};


//animation funciton
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};


//how to play dropdown
$(".rules-drop").click(function(){
  $(".game-rules").slideToggle();
});
