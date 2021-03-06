var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".start").click(function(){
  $("h1.score-number").text(level*10);
  if (!started){
    nextSequence();
    $("#level-title").text("Level "+level);
    started = true
  }
});

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        $("h1.score-number").text(level*10);
        // Add high score function here
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
      console.log("wrong");
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $(".container").addClass("game-over");
      setTimeout(function(){
        $(".container").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press 'Start' to Restart");
      startOver();
    }
}

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.random();
  randomNumber = randomNumber*4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).addClass("highlight");
  setTimeout(function(){
    $("#"+randomChosenColor).removeClass("highlight");
  }, 300);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
