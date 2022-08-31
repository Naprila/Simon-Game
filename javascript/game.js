const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;
var gameBegins = false;


if (level == 0) {
  // $('.red').unbind("click");
  $(".btn").css("pointer-events", "none");
}


$(document).on("keypress ", function (e) {
  // console.log(e);
  // || (!start && e.which == 1)   --> for Starting the game with mouse
  if (!start && e.key == "s") {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameBegins = true;
    start = true;
  }

  // enabling the any press key only after the game starts with 'S' ie After Gameover press any key

  if (!start && gameBegins == true) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

function nextSequence() {
  userClickedPattern = [];

  // for disabling the buttons at Start
  if (level == 0) {
    $(".btn").css("pointer-events", "auto");
  }

  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

keyPressed = "";

$(document).on("keydown", function(e){
            // console.log(e.key)

        if(level >= 1)    
        {
            if(e.key == "ArrowUp")
                keyPressed = "green"
            
            if(e.key == "ArrowLeft")
            keyPressed = "red"
            if(e.key == "ArrowDown")
            keyPressed = "yellow"
            if(e.key == "ArrowRight")
            keyPressed = "blue"
            
            if(keyPressed.length != 0)
            {
                // console.log(keyPressed);
                    userClickedPattern.push(keyPressed);
                    playSound(keyPressed);
                    $('#' + keyPressed).fadeOut(100).fadeIn(100);
                        checkAnswer(userClickedPattern.length - 1);
                    animatePress(keyPressed);
            }
        }
});


$(".btn").on("click", function () {
  // console.log(e.key)
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  $(this).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  animatePress(userChosenColour);
});


function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// window.onload = function () {
//   var context = new AudioContext();
//   nextSequence();
// };

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } 
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").css("fontSize", "1.5rem");
    $("#level-title").text("Game Over, Press Any Key To Restart!");
    startOver();
  }
}


function startOver() {
  level = 0;
  start = false;
  gamePattern = [];
}
