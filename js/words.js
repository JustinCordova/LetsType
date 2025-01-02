//Global Var
let charArray = []
let curWordIndex = -1;
let allDone = false;
let typingStarted = false;
let typingDone = false;
let minute = 0;
let second = 0;
let count = 0;
let timerInterval; // Stores the interval ID for the timer

function timer() {
  if (typingStarted && !typingDone) {
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

    // Format time values as two-digit strings
    let minString = minute < 10 ? "0" + minute : minute;
    let secString = second < 10 ? "0" + second : second;

    // Update HTML content
    document.getElementById("minutes").innerHTML = minString;
    document.getElementById("seconds").innerHTML = secString;
  }
}

// Starts the timer when typing begins
function startTimer() {
  if (!typingStarted) {
    typingStarted = true;
    timerInterval = setInterval(timer, 10); // 10 ms interval
  }
}

// Stops the timer when typing is done
function stopTimer() {
  typingDone = true;
  clearInterval(timerInterval);
}

// Blinking Cursor
function addCursor(spanId) {
  // Remove any existing cursors
  const existingCursor = document.querySelector('.cursor');
  if (existingCursor) {
    existingCursor.remove();
  }
  
  // Create and add new cursor
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  const targetSpan = document.getElementById('t' + spanId);
  if (targetSpan) {
    targetSpan.insertAdjacentElement('beforebegin', cursor);
  }
}

function textRand() {
  vincent
}

async function displayText() {
  await wordParse();
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
  // Add initial cursor at the start
  addCursor(0);
}


document.addEventListener("keydown", function (event) {
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

  console.log(event.key);
  if (event.key === "Shift") return;

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
  startTimer();

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

function checkEnd(event) {
  console.log("index: " + curWordIndex);
  console.log("type of length: " + typeof (charArray.length - 1));
  console.log("length: " + (charArray.length - 1));
  
  let dispEl = document.getElementById("t" + curWordIndex);

  // Case Correct
  if (curWordIndex === (charArray.length - 1) && dispEl.style.color === "lightgreen") {
    console.log("Reached correct case");
    showEnd();
  }

  // Case Incorrect
  if (curWordIndex >= (charArray.length - 1) && event.data === " ") {
    console.log("Reached incorrect case");
    console.log(event.key);
    showEnd();
  }
}

displayText();

function showEnd() {
  allDone = true;
  stopTimer();

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
    bg.style.opacity = "0.8";
  }, 10); // Small delay to allow the transition to work
}

async function wordParse() {
  const responses = await fetch('/assets/samples/words.txt')
  const data = await responses.text()
  charArray = data.split("")

}
