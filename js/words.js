const sampleText = "The quick brown fox jumps over the lazy dog.";
const charArray = sampleText.split("");
let curWordIndex = -1;

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

async function displayText() {
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
    curWordIndex < charArray.length - 1
  ) {
    curWordIndex++;
    addCursor(curWordIndex + 1);
  }
});

function inputCheck(event) {
  if (!event.data && event.inputType !== "deleteContentBackward") return;
  if (curWordIndex < 0 || curWordIndex >= charArray.length) return;

  let dispEl = document.getElementById("t" + curWordIndex);

  if (event.inputType === "deleteContentBackward") return;

  if (charArray[curWordIndex] === event.data) {
    dispEl.style.color = "green";
  } else {
    if (charArray[curWordIndex] === " ") {
      dispEl.style.backgroundColor = "red";
    }
    dispEl.style.color = "red";
  }
}

displayText();