$(document).ready(function(){

    // Projects button

//  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//
//  let intervalp = null;
//  
//  document.querySelector("#projects").onmouseover = event => {  
//    let iteration = 0;
//    
//    clearInterval(intervalp);
//    
//    intervalp = setInterval(() => {
//      event.target.innerText = event.target.innerText
//        .split("")
//        .map((letter, index) => {
//          if(index < iteration) {
//            return event.target.dataset.value[index];
//          }
//        
//          return letters[Math.floor(Math.random() * 26)]
//        })
//        .join("");
//      
//      if(iteration >= event.target.dataset.value.length){ 
//        clearInterval(intervalp);
//      }
//      
//      iteration += 1 / 3;
//    }, 30);
//  }

    // Projects button

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function startAnimation(element) {
      let interval = null;
      let iteration = 0;
    
      const targetValue = element.dataset.value;
    
      if (!targetValue) {
        return; // Exit if dataset.value is not set for the element
      }
    
      interval = setInterval(() => {
        element.innerText = element.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetValue[index];
            }
    
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");
    
        if (iteration >= targetValue.length) {
          clearInterval(interval);
        }
    
        iteration += 1 / 2;
      }, 30);
    }
    
// Add your id here stupid for stupid effect START

    document.querySelector("#info").onmouseover = event => {
      startAnimation(event.target);
    };
    
    document.querySelector("#projects").onmouseover = event => {
      startAnimation(event.target);
    };

    document.querySelector("#view").onmouseover = event => {
      startAnimation(event.target);
    };

// id for stupid effect END

// canvas image loading

$(document).ready(function() {
  var canvas = $('#c-canvas')[0]; // Get the actual canvas element
  var context = canvas.getContext('2d');
  var images = [
    "./images/hero images/01hero.png",
    "./images/hero images/02hero.png",
    "./images/hero images/03hero.png",
    "./images/hero images/04hero.png",
    "./images/hero images/05hero.png"
  ]; // Add your own images here
  var currentImageIndex = 0;
  var canvasHeight = 430;
  var canvasWidth = window.innerWidth - 80;

  function loadImage(index) {
    var img = new Image();
    img.onload = function() {
      // aspect ratio stuff
      var aspectRatio = img.width / img.height;
      var scaledWidth, scaledHeight;
      var offsetX, offsetY;

      // resolution magic
      scaledWidth = canvasWidth;
      scaledHeight = scaledWidth / aspectRatio;

      // center pos
      offsetX = (canvasWidth - scaledWidth) / 2;
      offsetY = (canvasHeight - scaledHeight) / 2;

      // resolution magic also?
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Clear
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw
      context.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

      // Log the current image number to the console
      console.log("Current image number:", index + 1);

      // number checker class adder thingy

      $('#box1').toggleClass('c-indicator-active', currentImageIndex === 0);
      $('#box2').toggleClass('c-indicator-active', currentImageIndex === 1);
      $('#box3').toggleClass('c-indicator-active', currentImageIndex === 2);
      $('#box4').toggleClass('c-indicator-active', currentImageIndex === 3);
      $('#box5').toggleClass('c-indicator-active', currentImageIndex === 4);

    };

    img.src = images[index];
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    loadImage(currentImageIndex);
  }

  function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    loadImage(currentImageIndex);
  }

  // load the first image
  loadImage(currentImageIndex);

  // event handlers for navigation
  $('#next').click(function() {
    nextImage();
    resetInterval(); });

  $('#prev').click(function() {
    previousImage();
    resetInterval();
  });

// box click event handler
$('#box1').click(function() {
  currentImageIndex = 0;
  loadImage(currentImageIndex);
  resetInterval();
});
$('#box2').click(function() {
  currentImageIndex = 1;
  loadImage(currentImageIndex);
  resetInterval();
});
$('#box3').click(function() {
  currentImageIndex = 2;
  loadImage(currentImageIndex);
  resetInterval();
});
$('#box4').click(function() {
  currentImageIndex = 3;
  loadImage(currentImageIndex);
  resetInterval();
});
$('#box5').click(function() {
  currentImageIndex = 4;
  loadImage(currentImageIndex);
  resetInterval();
});


  // scroll events
function handleScroll(event) {
  if (event.originalEvent.deltaY < 0) {
    previousImage(), resetInterval();
  } else if (event.originalEvent.deltaY > 0) {
    nextImage(), resetInterval();
  }
}

// scroll event listener
$(document).on("wheel", handleScroll);

var intervalId;

// reset the interval countdown
function resetInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(nextImage, 6000);
}

// initial interval countdown
resetInterval();

});







// end of all
});
// end of all lol