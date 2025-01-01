

function timeShow() {
    let times = document.getElementById('times-set');
    let words = document.getElementById('words-set');
    let timeButton = document.getElementById('times');
    let wordButton = document.getElementById('words');

    if (times.style.display === "none" || times.style.display === "") {
        // Show the times container and highlight the button
        times.style.display = "block";
        timeButton.style.color = '#f7768e';

        // Hide the words container and reset the word button color
        words.style.display = "none";
        wordButton.style.color = '#808080';
    } else {
        // Hide the times container and reset the time button color
        times.style.display = "none";
        timeButton.style.color = '#808080';
    }
}

function wordsShow() {
    let times = document.getElementById('times-set');
    let words = document.getElementById('words-set');
    let timeButton = document.getElementById('times');
    let wordButton = document.getElementById('words');

    if (words.style.display === "none" || words.style.display === "") {
        // Show the words container and highlight the button
        words.style.display = "block";
        wordButton.style.color = '#f7768e';  // Highlight "words" button in pink

        // Hide the times container and reset the time button color
        times.style.display = "none";
        timeButton.style.color = '#808080';  // Reset "times" button color
    } else {
        // If words are already visible, toggle off the display but keep the "words" button pink
        words.style.display = "none";
        wordButton.style.color = '#808080';
    }
}

// function toggleDisplay(clickedId) {
//     // Get all the button elements and their corresponding content containers
//     const buttons = document.querySelectorAll('.mode-buttons span');
//     const times = document.getElementById('times-set');
//     const words = document.getElementById('words-set');
//     const quote = document.getElementById('quote'); // For color change
//     const zen = document.getElementById('zen');   // For color change
    
//     const containers = {
//       'times': times,
//       'words': words,
//       'quote': quote,
//       'zen': zen
//     };
  
//     // Loop through all buttons and reset their styles
//     buttons.forEach(button => {
//       // Reset button color to default (gray)
//       button.style.color = '#808080';
  
//       // Hide all content containers (except the ones we want to display)
//       if (button.id !== clickedId) {
//         containers[button.id].style.display = 'none';
//       }
//     });
  
//     // Show the content for the clicked button and set its color to pink
//     containers[clickedId].style.display = 'block';
//     document.getElementById(clickedId).style.color = '#f7768e';
//   }
  


function resetTimeButtons() {
    let time1 = document.getElementById('time1');
    let time2 = document.getElementById('time2');
    let time3 = document.getElementById('time3');
    let time4 = document.getElementById('time4');

    // Reset the color of all time buttons to the default color
    time1.style.color = '#808080';
    time2.style.color = '#808080';
    time3.style.color = '#808080';
    time4.style.color = '#808080';
}

function resetWordButtons() {
    let word1 = document.getElementById('word1');
    let word2 = document.getElementById('word2');
    let word3 = document.getElementById('word3');
    let word4 = document.getElementById('word4');

    // Reset the color of all word buttons to the default color
    word1.style.color = '#808080';
    word2.style.color = '#808080';
    word3.style.color = '#808080';
    word4.style.color = '#808080';
}

function selectTime(timeId) {
    // Reset all buttons before selecting the clicked one
    resetTimeButtons();

    // Get the clicked time button by id and change its color
    let selectedTime = document.getElementById(timeId);
    selectedTime.style.color = '#f7768e'; // Highlight in pink
}

function selectWord(wordId) {
    // Reset all buttons before selecting the clicked one
    resetWordButtons();

    // Get the clicked word button by id and change its color
    let selectedWord = document.getElementById(wordId);
    selectedWord.style.color = '#f7768e'; // Highlight in pink
}