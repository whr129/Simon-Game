var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

alert("Rules");
alert("1.Press the flashed color and remember it\n2.Press the color from the first flashed to the last one");

function nextSequence() {
    //reset
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    //chose colour
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //fade
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //play sound
    var soundid = $("#" + randomChosenColour).attr("id");
    playSound(soundid);
}

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkanswer(userClickedPattern.length - 1);
})

function playSound(randomChosenColour) {
    var soundFile = "sounds/" + randomChosenColour + ".mp3";
    var snd = new Audio(soundFile);
    snd.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).on("keydown", function() {
    if (! started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function checkanswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //correct
        if (userClickedPattern.length === gamePattern.length) {
            //next level
            setTimeout(nextSequence(), 1000);
        }
    } else {
        //lose
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any key to Restart");
        startOver();
    }
    
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}