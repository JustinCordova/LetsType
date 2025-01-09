// Accuracy (total - backspace) / total
let totalStrokes = 0;
let backSpaceStrokes = 0;
// WPM 
let totalWords; // in wordParse


function checkEnd(event) {
    let dispEl = document.getElementById("t" + curWordIndex);
    console.log(curWordIndex)
    console.log(dispEl)
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
    let restartEl = document.getElementById("restart-icon");
    restartEl.style.display = "block";
    if (allDone) return;
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
      bg.style.opacity = "0.2";
    }, 10); // Small delay to allow the transition to work
    allDone = true;
  }