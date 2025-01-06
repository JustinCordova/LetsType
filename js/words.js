//Global Var
let charArray = [];
let wordArray = [];
let quoteArray = [];
let quoteUsed;
let curWordIndex = -1;
let wordIndex = 0;
let wordDict = {};
let allDone = false;

let typingStarted = false;
let typingDone = false;

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
  quoteArray = [];
  quoteUsed = "";
  curWordIndex = -1;
  wordIndex = 0;
  wordDict = {};
  totalStrokes = 0;
  backSpaceStrokes = 0;
  typingDone = false;
  typingStarted = false;
}

function clearAllSpans() {
  const container = document.getElementById("text-display");
  container.innerHTML = "";
  // console.log("clearAllSpans");
  if (container) {
    const spans = container.querySelectorAll("span");
    spans.forEach((span) => span.remove()); // Remove each span
  }
}

async function wordParse() {
  const responses = await fetch("assets/samples/words.txt");
  const data = await responses.text();
  wordArray = data.split(" ");
  totalWords = data.split(" ").length;
  charArray = data.split("");
}

async function quoteParse() {
  const responses = await fetch("assets/samples/quotes.txt");
  const data = await responses.text();
  quoteArray = data.split("\n");
  const randomIdx = Math.floor(Math.random() * quoteArray.length);
  quoteUsed = quoteArray[randomIdx];
  totalWords = quoteUsed.split(" ").length;
}

// Displays text for timer, words, and quotes
async function displayText() {
  let dispEl = document.createElement("display-text");
  dispEl.innerHTML = "";
  // Add initial cursor at the start
  addCursor(0);

  // Switches modes
  const wordFl = document.querySelectorAll(".wordFlag");
  const timeFl = document.querySelectorAll(".timeFlag");
  const quoteFl = document.querySelectorAll(".quoteFlag");
  const zenFl = document.querySelectorAll(".zenFlag");
  if (wordFl.length > 0) {
    await wordParse();
    word();
  } else if (timeFl.length > 0) {
    await wordParse();
    time();
  } else if (quoteFl.length > 0) {
    await quoteParse();
    quote();
  } else if (zenFl.length > 0) {
    zen();
  }
}

// Event Listener for Typing
document.addEventListener("keydown", function (event) {
  const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  // console.log(event.key);
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
      backSpaceStrokes++;
    }
  } else if (
    (/[a-zA-Z0-9\s\W']/.test(event.key) ||
      event.key == "'" ||
      event.key == "’") &&
    curWordIndex < charArray.length - 1 &&
    !arrowKeys.includes(event.key)
  ) {
    curWordIndex++;
    addCursor(curWordIndex + 1);
    totalStrokes++;
  }
});

// Matches event input to the text
function inputCheck(event) {
  let timeFl = document.querySelectorAll(".timeFlag");
  let timer = document.getElementById("timer");
  if (allDone) return;
  if (typingStarted == false && typingDone == false) {
    if (timeFl.length <= 0) {
      onWordOpacity();
    }
    else {
      timer.style.display = "block";
    }
    typingStarted = true;
    startTimer();
  }

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

function getTotalWords() {}

function onWordOpacity() {
  const element = document.getElementById("wordCount");

  // Check if the element exists
  if (element) {
    element.style.opacity = "1"; // Make the element visible
  }
}

function offWordOpacity() {
  const element = document.getElementById("wordCount");

  // Check if the element exists
  if (element) {
    element.style.opacity = "0"; // Make the element invisible
  }
}

