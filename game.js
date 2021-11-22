// alert("boom");
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started = false;
var level = 0;



function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);



  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}



$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// $(".btn").click(animatePress);
function animatePress(currentColor)
{
  // $(".btn").click(function(){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
     }, 100);
}


$(document).keypress(function(){
  if(!started)
  {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }
});



function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    // console.log("Success");
    if(userClickedPattern.length === gamePattern.length )
    {
      setTimeout(function(){
        nextSequence();}, 1000
      );
    }
  }
  else {
    playSound("sounds/wrong.mp3" );
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over, Press any key to START");
    startOver();
    // console.log("Wrong");
  }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}
