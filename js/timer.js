let count = 0;
let second = 0;
let minute = 0;
let timerInterval = null;

// Main Timer Function
function stopWatch() {
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
    updateDisplay(minute, second);
}

// Display the formatted time
function updateDisplay(minutes, seconds) {
  // Format as two-digit strings
  const minString = minutes < 10 ? "0" + minutes : minutes;
  const secString = seconds < 10 ? "0" + seconds : seconds;

  // Update HTML content
  document.getElementById("minutes").innerText = minString;
  document.getElementById("seconds").innerText = secString;
}

// Countdown Function
function showTime(countDown) {
  let totalSeconds = parseInt(countDown, 10);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format and display time
  updateDisplay(minutes, seconds);
}

// Starts the timer when typing begins
function startTimer() {
    if (typingStarted) {
        typingDone = false; // Ensure the timer can run again
        timerInterval = setInterval(stopWatch, 10); // Run every 10 ms
    }
}

// Stops the timer when typing is done
function stopTimer() {
  typingDone = true;
  clearInterval(timerInterval);
}

// Resets the timer
function resetTimer() {
  count = 0;
  second = 0;
  minute = 0;
  typingStarted = false;
  typingDone = false;
  updateDisplay(0, 0); // Reset the display
}
