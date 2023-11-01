// $('#inp').click(function () {
//     // $('#b2').css("visibility", "visible");
//     if ($('#inp').css('width', '240px')){
//         $('#inp').css({"transition":"all 0.6s ease-in-out", "-webkit-transition": "all 0.6s ease-in-out"});
//         $('#b1').css({"top": 0, "left": -32, "width": '15px', "height": '2px', "transition": "all 1s ease-in-out", "-webkit-transition": "all 0.6s ease-in-out"});
//         $('#b2').css({"visibility": "visible", "top": 0, "left": -47, "width": '15px', "height": '2px', "transition": "all 0.3s ease-in-out 0.6s", "-webkit-transition": "all 0.3s ease-in-out 0.6s"});
//         // $('button').css("rotate", "360deg");
//     }
// });

// $('.butt').click(function(){
//     $('#b1').css({"top": 27, "left": -12, "width": "25px", "height": '4px', "transition": "all 0.6s ease-in-out 0.6s", "-webkit-transition": "all 0.6s ease-in-out 0.6s"});
//     $('#b2').css({"top": "-5px", "left": "-40px", "transition":"all 0.3s ease-in-out", "-webkit-transition": "all 0.3s ease-in-out", "visibility":"hidden"});
//     $('#inp').css({"width": "3.2em", "transition":"all 0.6s ease-in-out 1.5s", "-webkit-transition": "all 0.6s ease-in-out 1.5s"});
// });



/// Click event for element with id 'inp'
const inp = document.querySelector('#inp');
inp.addEventListener('click', function() {
  // Apply CSS transitions and animations
  this.style.transition = 'all 0.6s ease-in-out';
  this.style.webkitTransition = 'all 0.6s ease-in-out';

  const b1 = document.querySelector('#b1');
  const b2 = document.querySelector('#b2');

  b1.style.top = '0';
  b1.style.left = '-32px';
  b1.style.width = '15px';
  b1.style.height = '2px';
  b1.style.transition = 'all 1s ease-in-out';
  b1.style.webkitTransition = 'all 0.6s ease-in-out';

  b2.style.visibility = 'visible';
  b2.style.top = '0';
  b2.style.left = '-47px';
  b2.style.width = '15px';
  b2.style.height = '2px';
  b2.style.transition = 'all 0.3s ease-in-out 0.6s';
  b2.style.webkitTransition = 'all 0.3s ease-in-out 0.6s';
});

// Click event for elements with class 'butt'
const buttElements = document.querySelectorAll('.butt');
buttElements.forEach((button) => {
  button.addEventListener('click', function() {
    const b1 = document.querySelector('#b1');
    const b2 = document.querySelector('#b2');

    b1.style.top = '27px';
    b1.style.left = '-12px';
    b1.style.width = '25px';
    b1.style.height = '4px';
    b1.style.transition = 'all 0.6s ease-in-out 0.6s';
    b1.style.webkitTransition = 'all 0.6s ease-in-out 0.6s';

    b2.style.top = '-5px';
    b2.style.left = '-40px';
    b2.style.transition = 'all 0.3s ease-in-out';
    b2.style.webkitTransition = 'all 0.3s ease-in-out';
    b2.style.visibility = 'hidden';

    inp.style.width = '3.2em';
    inp.style.transition = 'all 0.6s ease-in-out 1.5s';
    inp.style.webkitTransition = 'all 0.6s ease-in-out 1.5s';
  });
});
