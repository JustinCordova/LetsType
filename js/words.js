//Global Var
let charArray = [];
let wordArray = [];
let curWordIndex = -1;
let wordIndex = 0;
let wordDict = {};

displayText();

function resetWordCount() {
  wordDict = {};
  wordIndex = 0;
  curWordIndex = -1;
}

function resetGlobalVar() {
  clearAllSpans();
  charArray = [];
  wordArray = [];
  curWordIndex = -1;
  wordIndex = 0;
  wordDict = {};
}

function clearAllSpans() {
  const container = document.getElementById("text-display");
  console.log("clearAllSpans");
  if (container) {
    const spans = container.querySelectorAll("span");
    spans.forEach((span) => span.remove()); // Remove each span
  }
}

// Timer
let allDone = false;
let typingStarted = false;
let typingDone = false;
let minute = 0;
let second = 0;
let count = 0;
let timerInterval;

// function timer() {
//   let countDown = document.getElementsByClassName('timeFlag')[0].innerText;
//   console.log(countDown)

//   while (countDown > 0) {
//     showTime(countDown);
//     countDown--;
//   }
//     // if (typingStarted && !typingDone) {
//     //   count++;

//     //   // Update seconds and minutes based on count
//     //   if (count === 100) {
//     //       second--;
//     //       count = 0;
//     //   }
//     //   if (second === 60) {
//     //       minute--;
//     //       second = 0;
//     //   }

//     //   // Format time values as two-digit strings
//     //   let minString = minute < 10 ? "0" + minute : minute;
//     //   let secString = second < 10 ? "0" + second : second;

//     //   // Update HTML content
//     //   document.getElementById("minutes").innerHTML = minString;
//     //   document.getElementById("seconds").innerHTML = secString;
//     // }
// }

// function showTime(countDown) {
//   let totalSeconds = parseInt(countDown, 10);
//   // Calculate minutes and seconds
//   let minutes = Math.floor(totalSeconds / 60);
//   let seconds = totalSeconds % 60;
//   // Format as two-digit strings
//   let minString = minutes < 10 ? "0" + minutes : minutes;
//   let secString = seconds < 10 ? "0" + seconds : seconds;
//   // Display the formatted time
//   // console.log(`${minString}:${secString}`);
//   // Optional: Update an HTML element if needed
//   document.getElementById("minutes").innerText = minString;
//   document.getElementById("seconds").innerText = secString;
// }

// // Starts the timer when typing begins
// function startTimer() {
//   if (!typingStarted) {
//     typingStarted = true;
//     timerInterval = setInterval(timer, 10); // 10 ms interval
//   }
// }

// // Stops the timer when typing is done
// function stopTimer() {
//   typingDone = true;
//   clearInterval(timerInterval);
// }

// Words
function word() {
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
  makeIndexes();

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

function makeIndexes() {
  let charIndex = charArray;

  charIndex.forEach((char, index) => {
    console.log("Character: " + char + ", Index: " + index);
    if (char !== " ") {
      // If the character is not a space
      wordDict[index] = wordIndex; // Map the character to the current word index
    } else {
      wordDict[index] = wordIndex;
      wordIndex++;
      console.log(wordIndex); // Increment the word index when a space is encountered
    }
  });
  console.log("wordIndex: " + wordIndex);
}

function wordCount() {
  let denom = document.getElementsByClassName("wordFlag")[0].innerText;
  console.log(denom);
  console.log(wordDict);
  let numer;
  if (Number.isNaN(wordDict[curWordIndex] + 1)) {
    console.log("inside nan");
    numer = 0;
  } else {
    numer = wordDict[curWordIndex] + 1; // THIS IS THE ISSUE
  }
  document.getElementById("denominator").innerText = denom;
  document.getElementById("numerator").innerText = numer;
}


// Quote

// Zen
function zen() {
  resetGlobalVar();
  let doneZen = false; // Tracks if Zen mode is complete
  const dispEl = document.getElementById("text-display");
  const zenEl = document.getElementById("zen-input");
  const inpEl = document.getElementById("typing-input");
  dispEl.style.display = "none";
  inpEl.style.display = "none";
  zenEl.style.display = "block";
  zenEl.style.opacity = "0";
  zenEl.style.zIndex = "999";
  zenEl.value = "";
  zenFocus();

  // Add event listener for keydown
  zenEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.shiftKey) {
      // Prevent default behavior
      event.preventDefault();

      // End Zen mode
      doneZen = true;
      showEnd(); // Call your custom end function
      zenEl.value = ""; // Clear input box
    }
  });
  // Add event listener for real-time input
  zenEl.addEventListener("input", function () {
    if (!doneZen) {
      // Update display with current input, replacing spaces and newlines
      dispEl.innerHTML = zenEl.value.replace(/\n/g, "<br>");
    }
  });
}

async function wordParse() {
  const responses = await fetch("assets/samples/words.txt");
  const data = await responses.text();
  wordArray = data.split(" ");
  charArray = data.split("");
}

// Displays text for timer, words, and quotes
async function displayText() {
  let dispEl = document.createElement("display-text");
  dispEl.innerHTML = "";
  await wordParse();
  // Add initial cursor at the start
  addCursor(0);
  const wordFl = document.querySelectorAll(".wordFlag");
  const timeFl = document.querySelectorAll(".timeFlag");
  const quoteFl = document.querySelectorAll(".quoteFlag");
  const zenFl = document.querySelectorAll(".zenFlag");
  if (wordFl.length > 0) {
    word();
  } else if (timeFl.length > 0) {
    timer();
  } else if (quoteFl.length > 0) {
    quote();
  } else if (zenFl.length > 0) {
    let dispEl = document.getElementById("text-display");

    zen();
  }
}

document.addEventListener("keydown", function (event) {
  const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  console.log(event.key);
  if (
    event.key === "Shift" ||
    event.key === "Alt" ||
    event.key === "Meta" ||
    event.key === "Escape"
  )
    return;

  if (event.key === "Backspace") {
    if (curWordIndex >= 0) {
      let dispEl = document.getElementById("t" + curWordIndex);
      dispEl.style.color = "#9aa5ce";
      dispEl.style.backgroundColor = null;
      curWordIndex--;
      addCursor(Math.max(0, curWordIndex + 1));
    }
  } else if (
    /[a-zA-Z0-9\s\W]/.test(event.key) &&
    curWordIndex < charArray.length - 1 &&
    !arrowKeys.includes(event.key)
  ) {
    curWordIndex++;
    addCursor(curWordIndex + 1);
  }
});

function inputCheck(event) {
  if (allDone) return;

  // Start timer when the user starts typing
  // startTimer();

  if (!event.data && event.inputType !== "deleteContentBackward") return;

  if (curWordIndex < 0 || curWordIndex >= charArray.length) return;

  let dispEl = document.getElementById("t" + curWordIndex);

  if (event.inputType === "deleteContentBackward") return;

  if (charArray[curWordIndex] === event.data) {
    dispEl.style.color = "lightgreen";
  } else {
    if (charArray[curWordIndex] === " ") {
      dispEl.style.backgroundColor = "indianred";
    }
    dispEl.style.color = "indianred";
  }
}

// Blinking Cursor
function addCursor(spanId) {
  // Remove any existing cursors
  const existingCursor = document.querySelector(".cursor");
  if (existingCursor) {
    existingCursor.remove();
  }

  // Create and add new cursor
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  const targetSpan = document.getElementById("t" + spanId);
  if (targetSpan) {
    targetSpan.insertAdjacentElement("beforebegin", cursor);
  }
}

function checkEnd(event) {
  let dispEl = document.getElementById("t" + curWordIndex);

  // Case Correct
  if (
    curWordIndex === charArray.length - 1 &&
    dispEl.style.color === "lightgreen"
  ) {
    console.log("Reached correct case");
    showEnd();
  }

  // Case Incorrect
  else if (curWordIndex >= charArray.length - 1 && event.data === " ") {
    console.log("Reached incorrect case");
    console.log(event.key);
    showEnd();
  }
}

function showEnd() {
  if (allDone) return;
  // stopTimer();

  let bg = document.createElement("div");
  bg.style.backgroundColor = "black";
  bg.style.position = "fixed";
  bg.style.top = "0";
  bg.style.left = "0";
  bg.style.width = "100%";
  bg.style.height = "100%";
  bg.style.opacity = "0";
  bg.style.transition = "opacity 0.5s ease";
  bg.style.zIndex = "9999"; // Ensure it appears on top

  document.body.appendChild(bg);

  // Fade the overlay in after a slight delay
  setTimeout(() => {
    bg.style.opacity = "0.2";
  }, 10); // Small delay to allow the transition to work
  allDone = true;
}

// Randomize charArray based on input length
function randomizeArray(wordArray, length) {
  // Ensure length is within bounds (between 1 and the length of the array)
  length = Math.min(length, wordArray.length);
  let tempArray = [];
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    tempArray.push(wordArray[randomIndex]);
  }
  return tempArray;
}

// Iterate through spans
function iterateArray(array) {
  let dispEl = document.getElementById("text-display");
  dispEl.innerHTML = "";
  let count = 0;
  array.forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.textContent = char;
    charSpan.id = "t" + count;
    dispEl.appendChild(charSpan);
    count++;
  });
}

function autoFocus() {
  document.getElementById("typing-input").focus();
}

function zenFocus() {
  document.getElementById("zen-input").focus();
}