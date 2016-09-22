// control transitions between pages

var startButton = document.getElementById('start');
var startPage = document.getElementsByClassName('welcome-text')[0];
var surveyPage = document.getElementsByClassName('survey-page')[0];
var resultsPage = document.getElementsByClassName('results-page')[0];
var finishSurvey = document.getElementById('finish-survey');

function togglePages(current, next, display) {
  current.style.display = "none";
  next.style.display = display;
}

startButton.addEventListener('click', () => { togglePages(startPage, surveyPage, 'flex') });
finishSurvey.addEventListener('click', () => { togglePages(surveyPage, resultsPage, 'inline-block')});
