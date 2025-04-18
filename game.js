// Variables del juego
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detector de teclas para iniciar el juego
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Adding click event listeners to each button
$(".btn").click(function() {
  // Get the id of the button that was clicked (green, red, yellow, or blue)
  var buttonColor = $(this).attr("id");
  
  // Add the user's choice to their pattern
  userClickedPattern.push(buttonColor);
  
  // Play sound corresponding to the button color
  playSound(buttonColor);
  
  // Add animation to the clicked button
  animatePress(buttonColor);
  
  // Check the user's answer against the game pattern
  checkAnswer(userClickedPattern.length - 1);
});

// Function to generate the next color in the sequence
function nextSequence() {
  // Reset the user's pattern for the next level
  userClickedPattern = [];
  
  // Increase level
  level++;
  
  // Update the h1 title with the new level
  $("#level-title").text("Level " + level);
  
  // Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  
  // Select a random color from the buttonColors array
  var randomChosenColor = buttonColors[randomNumber];
  
  // Add the random color to the game pattern
  gamePattern.push(randomChosenColor);
  
  // Animate the button for the chosen color
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  
  // Play the sound for the chosen color
  playSound(randomChosenColor);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  // Check if the most recent user answer matches the game pattern at that position
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    
    // If the user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Wait 1 second before showing the next sequence
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play the wrong sound
    playSound("wrong");
    
    // Add the game-over class to the body
    $("body").addClass("game-over");
    
    // Change the h1 title
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    // Remove the game-over class after 200 milliseconds
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    
    // Restart the game
    startOver();
  }
}

// Function to play sound
function playSound(name) {
  // Create a new audio object with the correct file path
  var audio = new Audio("sounds/" + name + ".mp3");
  
  // Play the sound
  audio.play().catch(function(error) {
    console.log("Error playing sound: " + error);
  });
}

// Function to animate button press
function animatePress(currentColor) {
  // Add the "pressed" class to the button
  $("#" + currentColor).addClass("pressed");
  
  // Remove the "pressed" class after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}