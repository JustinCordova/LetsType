function toggleDisplay(clickedId) {
  // Get all the button elements and their corresponding content containers
  const buttons = document.querySelectorAll(".mode-buttons span");
  const times = document.getElementById("times-set");
  const words = document.getElementById("words-set");
  const quote = document.getElementById("quote");
  // const zen = document.getElementById("zen");
  let timerEl = document.getElementById("timer");
  let wordCountEl = document.getElementById("wordCount");

  const containers = {
    times: times,
    words: words,
    quote: quote,
    // zen: zen,
  };

  // Loop through all buttons and reset their styles
  buttons.forEach((button) => {
    // Reset button color to default (gray)
    button.style.color = "#808080";
    timerEl.style.fontSize = "0";
    wordCountEl.style.fontSize = "0";
    if (clickedId === "times") {
      // zen.classList.remove("zenFlag");
      quote.classList.remove("quoteFlag");
      resetWordButtons();
      // Hide
      words.style.display = "none";
      // Show
    } else if (clickedId === "words") {
      resetTimeButtons();
      // zen.classList.remove("zenFlag");
      quote.classList.remove("quoteFlag");
      // Hide
      times.style.display = "none";
      // Show
    } else if (clickedId === "quote") {
      resetTimeButtons();
      resetWordButtons();
      // zen.classList.remove("zenFlag");
      quote.classList.add("quoteFlag");

      // Hide
      times.style.display = "none";
      words.style.display = "none";
      // Show
    } 
    // else if (clickedId === "zen") {
    //   resetTimeButtons();
    //   resetWordButtons();
    //   quote.classList.remove("quoteFlag");
    //   zen.classList.add("zenFlag");
    //   // Hide everything
    //   times.style.display = "none";
    //   words.style.display = "none";
    //   // Show
    // }
    // Hide the times and # of words if Quote or Zen is clicked
    else {
      times.style.display = "none";
      words.style.display = "none";
    }
  });

  // Show the content for the clicked button and set its color to pink
  containers[clickedId].style.display = "block";
  document.getElementById(clickedId).style.color = "#f7768e";
}

function resetTimeFlag() {
  let time1 = document.getElementById("time1");
  let time2 = document.getElementById("time2");
  let time3 = document.getElementById("time3");
  let time4 = document.getElementById("time4");
  time1.classList.remove("timeFlag");
  time2.classList.remove("timeFlag");
  time3.classList.remove("timeFlag");
  time4.classList.remove("timeFlag");
}

function resetWordFlag() {
  let word1 = document.getElementById("word1");
  let word2 = document.getElementById("word2");
  let word3 = document.getElementById("word3");
  let word4 = document.getElementById("word4");
  word1.classList.remove("wordFlag");
  word2.classList.remove("wordFlag");
  word3.classList.remove("wordFlag");
  word4.classList.remove("wordFlag");
}

function resetTimeButtons() {
  // Reset the color of all time buttons to the default color
  time1.style.color = "#808080";
  time2.style.color = "#808080";
  time3.style.color = "#808080";
  time4.style.color = "#808080";
  resetTimeFlag();
}

function resetWordButtons() {
  // Reset the color of all word buttons to the default color
  word1.style.color = "#808080";
  word2.style.color = "#808080";
  word3.style.color = "#808080";
  word4.style.color = "#808080";
  resetWordFlag();
}

function selectTime(timeId) {
  // Reset all buttons before selecting the clicked one
  resetTimeButtons();
  // Get the clicked time button by id and change its color
  let selectedTime = document.getElementById(timeId);
  selectedTime.style.color = "#f7768e"; // Highlight in pink
  selectedTime.classList.add("timeFlag");

  // Calculate minutes and seconds
  let minutes = Math.floor(selectedTime.innerText / 60);
  let seconds = selectedTime.innerText % 60;

  // Format as two-digit strings
  let minString = minutes < 10 ? "0" + minutes : minutes;
  let secString = seconds < 10 ? "0" + seconds : seconds;
  // Display the formatted time

  // Optional: Update an HTML element if needed
  document.getElementById("minutes").innerText = minString;
  document.getElementById("seconds").innerText = secString;
}

function selectWord(wordId) {
  // Reset all buttons before selecting the clicked one
  resetWordButtons();

  // Get the clicked word button by id and change its color
  let selectedWord = document.getElementById(wordId);
  selectedWord.style.color = "#f7768e"; // Highlight in pink
  selectedWord.classList.add("wordFlag");
}
