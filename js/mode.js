// Words
function word() {
  const inpEl = document.getElementById("typing-input");
  // const zenEl = document.getElementById("zen-input");
  inpEl.style.display = "block";
  // zenEl.style.display = "none";
  // zenEl.style.zIndex = "-1";
  autoFocus();
  // Switches based on word option type
  let wordEl = document.getElementsByClassName("wordFlag")[0].innerText;
  switch (wordEl) {
    case "10":
      wordArray = randomizeArray(wordArray, 10);
      break;
    case "25":
      wordArray = randomizeArray(wordArray, 25);
      break;
    case "50":
      wordArray = randomizeArray(wordArray, 50);
      break;
    case "100":
      wordArray = randomizeArray(wordArray, 100);
      break;
    default:
      wordArray = randomizeArray(wordArray, 25);
      break;
  }
  // Adds spaces to array
  for (let i = 0; i < wordArray.length - 1; i++) {
    wordArray[i] = wordArray[i] + " ";
  }
  // Converts to string
  let words = wordArray.join("");
  // Split string into characters
  charArray = words.split("");
  makeIndexes(charArray);
  // Create new spans for each charArray element
  let dispEl = document.getElementById("text-display");
  dispEl.innerHTML = "";
  let count = 0;
  charArray.forEach((char) => {

    const charSpan = document.createElement("span");
    charSpan.textContent = char;
    charSpan.id = "t" + count;
    dispEl.appendChild(charSpan);
    count++;
  });
}

// Create indexes for the word numerator
function makeIndexes(array) {
  let charIndex = array;

  charIndex.forEach((char, index) => {
    // console.log("Character: " + char + ", Index: " + index);
    if (char !== " ") {
      // If the character is not a space
      wordDict[index] = wordIndex; // Map the character to the current word index
    } else {
      wordDict[index] = wordIndex;
      wordIndex++;
      // console.log(wordIndex); // Increment the word index when a space is encountered
    }
  });
  // console.log("wordIndex: " + wordIndex);
}

function wordCount() {
  let denom = 0;
  const wordFl = document.querySelectorAll(".wordFlag");
  const quoteFl = document.querySelectorAll(".quoteFlag");
  if (wordFl.length > 0) {
    denom = document.getElementsByClassName("wordFlag")[0].innerText;
  } else if (quoteFl.length > 0) {
    denom = totalWords;
  }

  // console.log(denom);
  // console.log(wordDict);
  let numer;
  if (Number.isNaN(wordDict[curWordIndex] + 1)) {
    // console.log("inside nan");
    numer = 0;
  } else {
    numer = wordDict[curWordIndex] + 1;
  }
  document.getElementById("denominator").innerText = denom;
  document.getElementById("numerator").innerText = numer;
}

// Quote
function quote() {
  const quoteFl = document.querySelectorAll(".quoteFlag");
  const inpEl = document.getElementById("typing-input");
  // const zenEl = document.getElementById("zen-input");
  inpEl.style.display = "block";
  // zenEl.style.display = "none";
  // zenEl.style.zIndex = "-1";
  autoFocus();

  charArray = quoteUsed.split("");

  makeIndexes(charArray);

  let dispEl = document.getElementById("text-display");
  dispEl.innerHTML = "";
  let count = 0;
  console.log(charArray);
  console.log(curWordIndex);
  charArray.forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.textContent = char;
    charSpan.id = "t" + count;
    dispEl.appendChild(charSpan);
    count++;
  });
}

// // Zen
// function zen() {
//   if (typingStarted == false && typingDone == false) {
//     typingStarted = true;
//     startTimer();
//   }
//   let doneZen = false; // Tracks if Zen mode is complete
//   const dispEl = document.getElementById("text-display");
//   const inpEl = document.getElementById("typing-input");
//   const zenEl = document.getElementById("zen-input");
//   inpEl.style.display = "none";
//   zenEl.style.display = "block";
//   zenEl.style.opacity = "0";
//   zenEl.style.zIndex = "1";
//   zenEl.value = "";
//   zenFocus();

//   // Shift + Enter for EndScreen
//   zenEl.addEventListener("keydown", function (event) {
//     if (event.key === "Enter" && event.shiftKey) {
//       // Prevent default behavior
//       event.preventDefault();

//       // End Zen mode
//       doneZen = true;
//       showEnd(); // Call your custom end function
//       zenEl.value = ""; // Clear input box
//     }
//   });
//   // Add event listener for real-time input
//   zenEl.addEventListener("input", function () {
//     if (!doneZen) {
//       dispEl.innerHTML = "";
//       const zenArray = [];
//       // Adding whatever is in the input box to zenArray
//       for (let i = 0; i < zenEl.value.length; i++) {
//         const char = zenEl.value[i];
//         const span = document.createElement("span");
//         span.textContent = char;
//         span.id = "t" + i;
//         zenArray.push(span);
//         dispEl.appendChild(span);
//         console.log(zenArray);
//       }
//     }
//   });
// }

let countTime;
let secondCount;
let minuteCount;
let countDownInterval = null;
let totalTimerSeconds;
let timeButtonSelectedValue;
let countTimer = 0;

// Time
function time() {
  let timeEl = document.getElementsByClassName("timeFlag")[0].innerText;
  switch (timeEl) {
    case "15":
      countTime = 15;
      break;
    case "30":
      countTime = 30;
      break;
    case "60":
      countTime = 60;
      break;
    case "120":
      countTime = 120;
      break;
    default:
      countTime = 15;
      break;
  }

  timeButtonSelectedValue = parseInt(countTime, 10);
  totalTimerSeconds = parseInt(countTime, 10);
  minuteCount = Math.floor(totalSeconds / 60);
  secondCount = totalSeconds % 60;

  const inpEl = document.getElementById("typing-input");
  // const zenEl = document.getElementById("zen-input");
  inpEl.style.display = "block";
  // zenEl.style.display = "none";
  // zenEl.style.zIndex = "-1";
  autoFocus();
  // Show text
  wordArray = randomizeArray(wordArray, 200);
  console.log(wordArray)
  // Adds spaces to array
  for (let i = 0; i < wordArray.length - 1; i++) {
    wordArray[i] = wordArray[i] + " ";
  }
  // Converts to string
  let words = wordArray.join("");
  // Split string into characters
  charArray = words.split("");
  makeIndexes(charArray);
  // Create new spans for each charArray element
  let dispEl = document.getElementById("text-display");
  dispEl.innerHTML = "";
  let count = 0;
  charArray.forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.textContent = char;
    charSpan.id = "t" + count;
    dispEl.appendChild(charSpan);
    count++;
  });
}

// Main countDown Function
function timeModeTimer() {
  countTimer++;
  if (countTimer == 100) {
    if (getGlobalTime() == timeButtonSelectedValue) {
      console.log("reached end of timer")
      stopCountDown();
      showEnd();
    }  
    //console.log("decrementing" + totalTimerSeconds)
    totalTimerSeconds--;
    // Format and display time
    minuteCount = parseInt(totalTimerSeconds / 60)
    secondCount = totalTimerSeconds % 60
    updateTime(minuteCount, secondCount); 
    countTimer = 0;
  }
}

// Display the formatted time
function updateDisplay(minuteCount, secondCount) {
  // Format as two-digit strings
  const minString = minuteCount < 10 ? "0" + minuteCount : minuteCount;
  const secString = secondCount < 10 ? "0" + secondCount : secondCount;

  // Update HTML content
  document.getElementById("minutes").innerText = minString;
  document.getElementById("seconds").innerText = secString;
}

// // Countdown Function
// function showTime(countDown) {
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;

//   // Format and display time
//   updateDisplay(minutes, seconds);
// }

// Starts the timer when typing begins
function startCountDown() {
  console.log("In startCountDown");
  if (typingStarted) {
    typingDone = false; // Ensure the timer can run again
    countDownInterval = setInterval(timeModeTimer, 10); // Run every 1000 ms
  }
}

// Stops the timer when typing is done
function stopCountDown() {
  typingDone = true;
  clearInterval(countDownInterval);
}

// Resets the timer
function resetCountDown() {
  clearInterval(countDownInterval);

  countDown = 0;
  secondCount = 0;
  minuteCount = 0;
  typingStarted = false;
  typingDone = false;
  updateDisplay(0, 0); // Reset the display
}


function updateTime() {
  let globalTime = getGlobalTime();
  let minutes = parseInt((timeButtonSelectedValue - globalTime) / 60)
  let seconds = (timeButtonSelectedValue - globalTime) % 60;

  updateDisplay(minutes, seconds)
}