function toggleDisplay(clickedId) {
    // Get all the button elements and their corresponding content containers
    const buttons = document.querySelectorAll('.mode-buttons span');
    const times = document.getElementById('times-set');
    const words = document.getElementById('words-set');
    const quote = document.getElementById('quote'); // For color change
    const zen = document.getElementById('zen');   // For color change
    
    const containers = {
      'times': times,
      'words': words,
      'quote': quote,
      'zen': zen
    };
  
    // Loop through all buttons and reset their styles
    buttons.forEach(button => {
      // Reset button color to default (gray)
      button.style.color = '#808080';

      // Hide # of words if Times button is clicked
      if ((clickedId === 'times')) {
        words.style.display = 'none';
      } 
      // Hide the possible times if Words is clicked
      else if ((clickedId === 'words')) {
        times.style.display = 'none';
      } 
      // Hide the times and # of words if Quote or Zen is clicked
      else {
        times.style.display = 'none';
        words.style.display = 'none';
      }
    });
    
  
    // Show the content for the clicked button and set its color to pink
    containers[clickedId].style.display = 'block';
    document.getElementById(clickedId).style.color = '#f7768e';
  }
  


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
    word1.classList.remove('timeFlag');
    word2.classList.remove('timeFlag');
    word3.classList.remove('timeFlag');
    word4.classList.remove('timeFlag');
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
    word1.classList.remove('wordFlag');
    word2.classList.remove('wordFlag');
    word3.classList.remove('wordFlag');
    word4.classList.remove('wordFlag');
}

function selectTime(timeId) {
  // Reset all buttons before selecting the clicked one
  resetTimeButtons();
  // Get the clicked time button by id and change its color
  let selectedTime = document.getElementById(timeId);
  console.log(selectedTime)
  selectedTime.style.color = '#f7768e'; // Highlight in pink
  selectedTime.classList.add('timeFlag');
  console.log(selectedTime.innerText)

  // Calculate minutes and seconds
  let minutes = Math.floor(selectedTime.innerText / 60);
  let seconds = selectedTime.innerText % 60;

  // Format as two-digit strings
  let minString = minutes < 10 ? "0" + minutes : minutes;
  let secString = seconds < 10 ? "0" + seconds : seconds;
  // Display the formatted time
  console.log(`${minString}:${secString}`);
  // Optional: Update an HTML element if needed
  document.getElementById("minutes").innerText = minString;
  document.getElementById("seconds").innerText = secString;
}

function selectWord(wordId) {
    // Reset all buttons before selecting the clicked one
    resetWordButtons();

    // Get the clicked word button by id and change its color
    let selectedWord = document.getElementById(wordId);
    selectedWord.style.color = '#f7768e'; // Highlight in pink
    selectedWord.classList.add('wordFlag');
}