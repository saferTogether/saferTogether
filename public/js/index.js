$(document).ready(function(){
  $('.question-carousel').slick({
    accessibility: true,
    adaptiveHeight: true,
    arrows: true,
    draggable: true,
    fade: true,
    mobileFirst: true,
    swipe: true
  });
});

var mprogress = new Mprogress({
  parent: '.header'
});

mprogress.set(0.04);

function progress() {
  mprogress.inc(0.041);
};

var noButton = Array.from(document.getElementsByClassName('no-button'));

var yesButton = Array.from(document.getElementsByClassName('yes-button'));


noButton.map((el) => el.addEventListener('click', progress));

yesButton.map((el) => el.addEventListener('click', progress));
