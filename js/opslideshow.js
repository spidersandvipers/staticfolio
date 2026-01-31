
    // Projects button
  
    const overlayLetters = "1234567890";
  
    function startOverlayAnimation(element) {
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
    
            return overlayLetters[Math.floor(Math.random() * 10)];
          })
          .join("");
    
        if (iteration >= targetValue.length) {
          clearInterval(interval);
        }
    
        iteration += 1 / 5;
      }, 1);
    }




  // Add your id here stupid for stupid effect START
  
  startOverlayAnimation(document.querySelector("#overlay-hack"));
  $("#overlay-hack").delay(100).queue(function() {
    $(this).removeClass("overlay-hack-active");
    $(this).dequeue();
  });



// canvas image loading

// IMAGE SOURCES
$(document).ready(function() {
  var canvas = $('#p-canvas')[0]; // Get the actual canvas element
  var context = canvas.getContext('2d');
  var images = [
    "pimages/invasion/img1.png",
    "pimages/invasion/img2.png",
    "pimages/invasion/img3.png",
    "pimages/invasion/img4.png",
    "pimages/invasion/img5.png",
    "pimages/invasion/img6.png",
    "pimages/invasion/img7.png",
    "pimages/invasion/img8.png",
    "pimages/invasion/img9.png",
    "pimages/invasion/img10.png",
  ]; 
  
  // IMAGE SOURCES END
  var currentImageIndex = 0;

  var canvasHeight = parseInt(getComputedStyle(document.querySelector(".p-canvas-container")).getPropertyValue("height"));

  var pconElement = document.getElementById("pcon");
  var computedConStyle = getComputedStyle(pconElement);
  var conPadding = parseInt(computedConStyle.paddingLeft) + parseInt(computedConStyle.paddingRight);

  var bruhElement = document.getElementById("__bruh");
  var computedStyle = getComputedStyle(bruhElement);
  var padding = parseInt(computedStyle.paddingLeft) + parseInt(computedStyle.paddingRight);
  var canvasWidth = window.innerWidth - (padding + conPadding);

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

      function formatIndex(index) {
        index ++;
        return index.toString().padStart(2, '0');
      }

      // Log the current image number to the console
      console.log("Current image number:", formatIndex(currentImageIndex));

      //project navigation indicator

      document.getElementById('pnumber-current').innerText = formatIndex(currentImageIndex);
      document.getElementById('pnumber-next').innerText = formatIndex((currentImageIndex + 1) % images.length);
      document.getElementById('pnumber-prev').innerText = formatIndex((currentImageIndex - 1 + images.length) % images.length);
      document.getElementById('image-length-n').innerText = formatIndex(images.length - 1);
      document.getElementById('image-length-p').innerText = formatIndex(images.length - 1);



    };

    img.src = images[index];
  }

  var isNextImageRunning = false;
  var isPreviousImageRunning = false;

  function nextImage() {
    if (isNextImageRunning) {
      return;
    }
    
    isNextImageRunning = true;
  
    currentImageIndex = (currentImageIndex + 1) % images.length;
    startOverlayAnimation(document.querySelector("#overlay-hack"));
    $("#overlay-hack").addClass("overlay-hack-active");
    $("#arrow-right").addClass("arrow-right-anim");
    setTimeout(function() {
      loadImage(currentImageIndex);
      $("#arrow-right").removeClass("arrow-right-anim");
    }, 250);
  
    setTimeout(function() {
      $("#overlay-hack").removeClass("overlay-hack-active");

      isNextImageRunning = false;
    }, 500);
  }

  function previousImage() {
    if (isPreviousImageRunning) {
      return;
    }
    
    isPreviousImageRunning = true;
  
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    startOverlayAnimation(document.querySelector("#overlay-hack"));
    $("#overlay-hack").addClass("overlay-hack-active");
    $("#arrow-left").addClass("arrow-left-anim");
  
    setTimeout(function() {
      loadImage(currentImageIndex);
      $("#arrow-left").removeClass("arrow-left-anim");
    }, 250);
  
    setTimeout(function() {
      $("#overlay-hack").removeClass("overlay-hack-active");
  
      isPreviousImageRunning = false;
    }, 500);
  }

/*
  var isNextImageRunning = false;

  function nextImage() {
    if (isNextImageRunning) {
      return;
    }
    
    isNextImageRunning = true;
  
    currentImageIndex = (currentImageIndex + 1) % images.length;
    startOverlayAnimation(document.querySelector("#overlay-hack"));
    document.querySelector("#overlay-hack").classList.add("overlay-hack-active");
  
    setTimeout(function() {
      loadImage(currentImageIndex);
    }, 300);

    setTimeout(function() {
      document.querySelector("#overlay-hack").classList.remove("overlay-hack-active");
      isNextImageRunning = false;
    }, 600);
  }

*/

/*
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    loadImage(currentImageIndex);
  }


  function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    loadImage(currentImageIndex);
  }
*/
  // load the first image
  loadImage(currentImageIndex);

  // event handlers for navigation
  $('#arrow-right').click(function() {
    nextImage();
  });
  $('#arrow-left').click(function() {
    previousImage();
  });

  $('#p-box-right').click(function() {
    nextImage();
  });
  $('#p-box-left').click(function() {
    previousImage();
  });

  // scroll events
function handleScroll(event) {
  if (event.originalEvent.deltaY < 0) {
    previousImage();
  } else if (event.originalEvent.deltaY > 0) {
    nextImage();
  }
}

// scroll event listener
$(document).on("wheel", handleScroll);


});







// end of all

// end of all lol