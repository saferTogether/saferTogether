var startButton = document.getElementById('start');
var startPage = document.getElementsByClassName('welcome-text')[0];
var surveyPage = document.getElementsByClassName('survey-page')[0];
var resultsPage = document.getElementsByClassName('results-page')[0];

function togglePages(current, next) {
  current.style.display = "none";
  next.style.display = "flex";
}

startButton.addEventListener('click', () => { togglePages(startPage, surveyPage) });
