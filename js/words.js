const sampleText = "The quick brown fox jumps over the lazy dog.";
const charArray = sampleText.split("");
let curWordIndex = -1;

document.addEventListener("keydown", function (event) {
  console.log(event.key)
  if (event.key === "Shift") {
    // Do nothing for Shift key
    return;
  }
  
  if (event.key === "Backspace") {
    if (curWordIndex >= 0) {
      let dispEl = document.getElementById("t" + curWordIndex);
      dispEl.style.color = '#9aa5ce'; // Reset color to grey
      dispEl.style.backgroundColor = null;
      curWordIndex--;
    }
  } else if (/[a-zA-Z0-9\s\W]/.test(event.key) && curWordIndex < charArray.length - 1) {
    curWordIndex++;
  }
});

function displayText() {
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

function inputCheck(event) {
  if (!event.data && event.inputType !== "deleteContentBackward") {
    return; // Exit if no input data and not backspace
  }

  if (curWordIndex < 0 || curWordIndex >= charArray.length) {
    return; // Exit if index is out of bounds
  }

  let dispEl = document.getElementById("t" + curWordIndex);
  
  if (event.inputType === "deleteContentBackward") {
    // Backspace was handled in keydown event
    return;
  }
  
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