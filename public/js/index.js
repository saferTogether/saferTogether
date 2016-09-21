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
});
/////////////////////////////////////////////////////
var body = document.getElementsByTagName("body")[0];
body.addEventListener("load", function(){replies = []}, false);


$.each($('.question'), (key,value)=>{
  $(value.children).wrapAll( "<div class='buttonWrapper' id="+key+" />")
})


////////////////////////////////////////////////////
var mprogress = new Mprogress({
  parent: '.header'
});

mprogress.set(0.04);

function progress(){
  if(replies.indexOf(arguments[0])=== -1){ 
    replies.push(arguments[0]) 
    mprogress.inc(0.041)
      $('.slick-next').click()
  }
  else{alert('you have already answered')}

};

var noButton = Array.from(document.getElementsByClassName('no-button'));

var yesButton = Array.from(document.getElementsByClassName('yes-button'));


noButton.map((el) => el.addEventListener('click', progress.bind(null, $(el).closest("div").prop("id"))));

yesButton.map((el) => el.addEventListener('click', progress.bind(null, $(el).closest("div").prop("id"))));





