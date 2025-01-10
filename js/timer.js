let count = 0;
let second = 0;
let minute = 0;
let totalSeconds;
let globalTimerInterval = null;

// Main Timer Function
function globalTimer() {
    count++;

    // Update seconds and minutes based on count
    if (count === 100) {
        second++;
        count = 0;
    }
    if (second === 60) {
        minute++;
        second = 0;
    }

    // Format and display time
    updateGlobalDisplay(minute, second);
}

function getGlobalTime() { 
  return minute * 60 + second;
}

// Display the formatted time
function updateGlobalDisplay(minutes, seconds) {
  // Format as two-digit strings
  const minString = minutes < 10 ? "0" + minutes : minutes;
  const secString = seconds < 10 ? "0" + seconds : seconds;

  // Update HTML content
  document.getElementById("globalMinutes").innerText = minString;
  document.getElementById("globalSeconds").innerText = secString;
}

// Starts the timer when typing begins
function startGlobalTimer() {
    if (typingStarted) {
        typingDone = false; // Ensure the timer can run again
        globalTimerInterval = setInterval(globalTimer, 10); // Run every 10 ms
    }
}

// Stops the timer when typing is done
function stopGlobalTimer() {
  typingDone = true;
  clearInterval(globalTimerInterval);
}

// Resets the timer
function resetGlobalTimer() {
  clearInterval(globalTimerInterval);
  count = 0;
  second = 0;
  minute = 0;
  typingStarted = false;
  typingDone = false;
  updateGlobalDisplay(0, 0); // Reset the display
}
