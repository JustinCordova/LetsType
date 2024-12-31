const sampleText = "The quick brown fox jumps over the lazy dog.";
const charArray = sampleText.split("");
let curWordIndex = -1;


/* function to parse words.txt, index breaks when this is used
async function getRandomWords() {
    const response = await fetch('sample/words.txt');
    const text = await response.text();
    
    // Split the text into words
    const words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
  
    const charArr = [];
    
    // Randomly select 50 words and add their characters to the charArr
    while (charArr.length < 50 && words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      
      // Add characters of the randomly selected word
      for (let char of randomWord) {
        charArr.push(char);
        if (charArr.length >= 50) break; // Stop when 50 characters are collected
      }
      
      // Remove the selected word from the array to avoid repeats
      words.splice(words.indexOf(randomWord), 1);
    }
    console.log(charArr);
    return charArr; // Return the array of characters
  }
  
  
  
  // Shuffle function to randomize the words in the array
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  }
*/
  
// Displays current html text
async function displayText() {
//   let charArr = await getRandomWords();
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


// Event Listener
document.addEventListener("keydown", function (event) {
  console.log(event.key);
  // Ignore shift event
  if (event.key === "Shift") {
    return;
  }
  // Reset previous index when backspace and decrement index
  if (event.key === "Backspace") {
    if (curWordIndex >= 0) {
      let dispEl = document.getElementById("t" + curWordIndex);
      dispEl.style.color = "#9aa5ce";
      dispEl.style.backgroundColor = null;
      curWordIndex--;
    }
  }
  //Increment index on any other key event while index is less than charArr
  else if (
    /[a-zA-Z0-9\s\W]/.test(event.key) &&
    curWordIndex < charArray.length - 1
  ) {
    curWordIndex++;
  }
  addCursor(0);
});

// Matches current key event pressed with the char array based on the current index
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

  // Current char is green if correct, red if incorrect
  if (charArray[curWordIndex] === event.data) {
    dispEl.style.color = "green";
  } else {
    // Space gives a red block if wrong
    if (charArray[curWordIndex] === " ") {
      dispEl.style.backgroundColor = "red";
    }
    dispEl.style.color = "red";
  }
  addCursor();
}

function addCursor() {
    // Remove any existing cursor
    const existingCursor = document.querySelector(".cursor");
    if (existingCursor) {
      existingCursor.remove();
    }
  
    // Create a new cursor element
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
  
    // Handle the case for negative indices
    if (curWordIndex < 0) {
      const firstSpan = document.getElementById("t0"); // First span (default position)
      if (firstSpan && !firstSpan.previousSibling?.classList?.contains("cursor")) {
        // Insert the cursor before the first span
        firstSpan.parentNode.insertBefore(cursor, firstSpan);
      }
    } else {
      // Handle the case for valid indices
      const currentSpan = document.getElementById("t" + curWordIndex);
      if (currentSpan) {
        // Append the cursor to the current span
        currentSpan.appendChild(cursor);
      }
    }
  }
  

displayText();
