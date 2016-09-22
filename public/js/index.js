$(document).ready(function(){
  $('.question-carousel').slick({
    infinite: false,
    accessibility: true,
    adaptiveHeight: true,
    arrows: true,
    draggable: true,
    fade: true,
    mobileFirst: true,
    swipe: true
  });
  $('.collapsible').collapsible({
    accordion: true
  });
  $('.slick-next').off()
  $('.slick-next').click(function(){
    console.log('current',$('.question-carousel').slick('slickCurrentSlide'))
    if((replies.indexOf(String($('.question-carousel').slick('slickCurrentSlide')))!= -1)){
      console.log('condition was met')
      $('.question-carousel').slick('slickNext')
    }
  })
})

/////////////////////////////////////////////////////

var body = document.getElementsByTagName("body")[0];
body.addEventListener("load", function(){
  replies = []
}, false);


$.each($('.question'), (key,value) => {
  $(value.children).wrapAll( "<div class='buttonWrapper' id="+ key +" />")
});

// On clicking yes or no

var yesCounter = 0;
var mprogress = new Mprogress({
  parent: '.progress-bar'
});
mprogress.set(0.04);

function progress(){
  let pos = arguments[0]
  console.log('inside progres', arguments[0])
  var inst = $('[data-remodal-id=modal]').remodal();
  mprogress.inc(0.041)
  if(replies.indexOf(pos)=== -1 && openQ.indexOf(Number(pos))=== -1){
    replies.push(arguments[0])
    $('.question-carousel').slick('slickNext')
  } else if (replies.indexOf(pos) === -1 && openQ.indexOf(Number(pos)) !== -1){
    inst.open()
    $(document).on('confirmation', '.remodal', function () {
      replies.push(pos)
      $('.question-carousel').slick('slickNext')
    });
  }
  else{ alert('you have already answered'); mprogress.inc(-0.041) }

};

function questionAnswered(e) {
  if (e.target.parentElement.className === "yellow-button yes-button unanswered"
    && e.target.parentElement.previousSibling.className === "purple-button no-button answered") {
    e.target.textContent = "beenhere";
    e.target.parentElement.previousSibling.firstChild.textContent = "clear";
    e.target.parentElement.className = "yellow-button yes-button answered";
    e.target.parentElement.previousSibling.className = "purple-button no-button unanswered";
    yesCounter++;
  } else if (e.target.parentElement.className === "purple-button no-button unanswered"
    && e.target.parentElement.nextSibling.className === "yellow-button yes-button answered") {
    e.target.textContent = "beenhere";
    e.target.parentElement.nextSibling.firstChild.textContent = "done";
    e.target.parentElement.className = "purple-button no-button answered";
    e.target.parentElement.nextSibling.className = "yellow-button yes-button unanswered";
    yesCounter--;
  } else if (e.target.parentElement.className === "purple-button no-button unanswered") {
    e.target.textContent = "beenhere";
    e.target.parentElement.className = "purple-button no-button answered";
  } else if (e.target.parentElement.className === "yellow-button yes-button unanswered") {
    e.target.textContent = "beenhere";
    e.target.parentElement.className = "yellow-button yes-button answered";
    yesCounter++;
  } console.log(yesCounter);
}

var noButton = Array.from(document.getElementsByClassName('no-button'));
var yesButton = Array.from(document.getElementsByClassName('yes-button'));
noButton.map((el) => el.addEventListener('click', progress.bind(null, $(el).closest("div").prop("id"))));
noButton.map((el) => el.addEventListener('click', questionAnswered));
yesButton.map((el) => el.addEventListener('click', progress.bind(null, $(el).closest("div").prop("id"))));
yesButton.map((el) => el.addEventListener('click', questionAnswered));

// toggle footer on results page

var footer = document.getElementsByClassName('footer')[0];
var collapsibleHeader = Array.from(document.getElementsByClassName('collapsible-header'));

function toggleFooter(e) {
  if (e.target.className === 'collapsible-header active') {
    footer.style.display = 'block';
  } else { footer.style.display = 'none'; }
}

collapsibleHeader.map((el) => el.addEventListener('click', toggleFooter));

// Submit box

var modalSubmitButton = document.getElementsByClassName('remodal-confirm')[0];
var modalTextarea = document.getElementsByClassName('modal-textarea')[0];

function clearTextarea() {
  modalTextarea.value = '';
}

modalSubmitButton.addEventListener('click', clearTextarea);

// Reveal the results (number of yes's at end of quiz)

var finishSurvey = document.getElementById('finish-survey');
var resultsText = document.getElementsByClassName('survey-results')[0];

function showResults() {
  resultsText.textContent = "Thank you for completing the survey. You responded yes to " + yesCounter + " questions.";
}

finishSurvey.addEventListener('click', showResults);
