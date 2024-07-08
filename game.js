var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#head").text("Level", +level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong");
    // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");
    $("body").addClass("game-over");
    
    setTimeout(function(){
    $("body").removeClass("game-over");},200);

    $("#head").text("Game Over, Press Any Key to Restart");

       startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#head").text("Level " +level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn().fadeOut().fadeIn();
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function playSound(name){
    var audio = new Audio("./sounds/" +name+ ".mp3");
    audio.play();

}
 
function startOver() {
    level=0
    gamePattern=[];
    started=false;
}
