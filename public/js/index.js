$(document).ready(function(){
  $('.question-carousel').slick({
    infinite: false,
    accessibility: true,
    adaptiveHeight: true,
    arrows: true,
    draggable: false,
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

////////////////////////////////////////////////////

var mprogress = new Mprogress({
  parent: '.progress-bar'
});
mprogress.set(0.4);

function progress(){
  let pos = arguments[0]
  console.log('inside progres', arguments[0])
  var inst = $('[data-remodal-id=modal]').remodal();
  if(replies.indexOf(pos)=== -1 && openQ.indexOf(Number(pos))=== -1){
    replies.push(arguments[0])
    // mprogress.inc(0.004)

    $('.question-carousel').slick('slickNext')
  } else if (replies.indexOf(pos) === -1 && openQ.indexOf(Number(pos)) !== -1){
    inst.open()
    $(document).on('confirmation', '.remodal', function () {
      replies.push(pos)
      mprogress.inc(0.04)
      $('.question-carousel').slick('slickNext')
    });
  }
  else{alert('you have already answered')}

};

var noButton = Array.from(document.getElementsByClassName('no-button'));
var yesButton = Array.from(document.getElementsByClassName('yes-button'));
noButton.map((el) => el.addEventListener('click', progress.bind(null, $(el).closest("div").prop("id"))));
yesButton.map((el) => el.addEventListener('click', progress.bind(null, $(el).closest("div").prop("id"))));

//////////////////////////

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
