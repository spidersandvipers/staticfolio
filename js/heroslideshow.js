$(".load-text").addClass("load-text-fadein");

$(window).on('load', function() {
      if (!sessionStorage.getItem("animationPlayed")) {
    loadingEnd();
    sessionStorage.setItem("animationPlayed", true);
  } else {
    // Run a different function here
    loadingOmaeWaMouShinderu();
  }
    
});

function loadingEnd() {
  setTimeout(function() {
    $(".load-text").find("span").addClass("zero-font");
  }, 2200);
  setTimeout(function() {
    $("#load-screen").addClass("load-screen-fade");
  }, 2900);
  setTimeout(function() {
    $("#load-screen").addClass("load-screen-die");
  }, 3750);
}

function loadingOmaeWaMouShinderu() {
    $(".load-text").removeClass("load-text-fadein");
    $("#load-screen").addClass("load-screen-fade");
  setTimeout(function() {
    $("#load-screen").addClass("load-screen-die");
  }, 900);
  
}

$(document).ready(function(){

  // Start typing the new text

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







// id for stupid effect END

// canvas image loading

const canvas = document.getElementById("c-canvas");
const ctx = canvas.getContext("2d", { alpha: false });
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;



class Cell {
  constructor(effect, x, y, imageIndex, dindex) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.dindex = dindex;
    this.positionX = 0
    this.positionY = canvas.height / 2;
    this.speedX;
    this.speedY;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    this.image = new Image();
    this.image.src = this.selectChildElement(imageIndex).src;
    this.image.onload = () => {
      this.image = this.resizeImage(this.image, canvas.width); // Resize the image to the canvas width
      this.start();
    };

    this.slideX = 0;
    this.slideY = 0;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.05;
    this.friction = 0.9;
    this.randomize = Math.random() * 10 + 2;
    setTimeout(() => {
      this.start();
    }, this.dindex * 2);
    
  }

  resizeImage(image, width) {
    const aspectRatio = image.width / image.height;
    const height = width / aspectRatio;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { alpha: false });
    context.drawImage(image, 0, 0, width, height);
    return canvas;
  }
  
  selectChildElement(index) {
    const carouselContainer = document.querySelector('.carousel-container'); // Select the carousel container element
    const childElements = carouselContainer.children; // Get all the child elements

    return childElements[index]; // Select the desired child element
  }

  draw(context) {

    context.drawImage(
      this.image, 
      this.x + this.slideX, 
      this.y + this.slideY, 
      this.width, 
      this.height, 
      this.positionX, 
      this.positionY, 
      this.width, 
      this.height
    );

  //  context.strokeStyle = 'white'; // Set the stroke color to white
  //  context.strokeRect(this.x, this.y, this.width, this.height);
  }
  

  start(){
    //this.positionX = (canvas.width - this.width) / 2; // Calculate the horizontal position to center the image
    this.positionY = (canvas.height - this.height) / 2; // Calculate the vertical position to center the image
    this.speedX = (this.x - this.positionX)/this.randomize;
    this.speedY = (this.y - this.positionY)/this.randomize;
    this.slideY = 0;
    
  }

  update() {
    // Cell pos and opt
    if (Math.abs(this.speedX) > 0.1 || Math.abs(this.speedY) > 0.1) {
      this.speedX = (this.x - this.positionX) / this.randomize;
      this.speedY = (this.y - this.positionY) / this.randomize;
      this.positionX += this.speedX;
      this.positionY += this.speedY;
    }
  
    // Crop
    const dx = this.effect.mouse.x - this.x;
    const dy = this.effect.mouse.y - this.y;
    const distance = Math.hypot(dx, dy);
    if (distance < this.effect.mouse.radius) {
      const angle = Math.atan2(dy, dx);
      const force = distance / this.effect.mouse.radius;
      this.vx = (force * Math.cos(angle)) * -1;
      this.vy = (force * Math.sin(angle)) * -1;
    } else {
      this.vx = 0; // Reset velocity if mouse is not within radius
      this.vy = 0;
    }
  
  //// Update cell positions based on mouse movement
  //this.positionX += (this.vx *= this.friction) - this.slideX * this.ease;
  //this.positionY += (this.vy *= this.friction) - this.slideY * this.ease;
  //
  //this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
  //this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
  }

}


class Effect {
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 5;
    this.cellHeight = this.height / 1;
    this.imageGrid = [];
    this.createGrid();
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 100,
    }
    this.canvas.addEventListener('mousemove', e => {
      
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      
    });
    this.canvas.addEventListener('mouseleave', e => {
      
      this.mouse.x = undefined;
      this.mouse.y = undefined;
      
    });
  }
  
  createGrid(){
    this.imageGrid = []; // Clear the existing imageGrid array
    let dindex = 0;
    for (let y = 0; y < this.height; y += this.cellHeight){
      for (let x = 0; x < this.width; x += this.cellWidth){
        dindex++;
        this.imageGrid.unshift(new Cell(this, x, y, indexNumber, dindex)); 
      }
      
    }
  }
  render(context){  // GRID RENDER
    
    this.imageGrid.forEach(cell => {
      cell.update();
      cell.draw(context);

    })
  }

}

var indexNumber = 1; // THATS THE INDEX NUMBER WOOOO

const effect = new Effect(canvas);
console.log(effect);


function animate(){
  
  effect.render(ctx);
  
  
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate);

// Call the function with the ctx object as an argument


// WHERE The TEXTS ARE ---------------------------------------------------

// texts

var texts = [
  'error possibly',
  '{ design } +\nbackbone',
  '{ 2023 }\n36 days of type',
  '{ 2022 }\nBlender 3D',
  "{ 2022 }\nAlon't",
  '{ 2024 }\nNeue Kaine',
];

var texts2 = [
  'error possibly',
  " ",
  'category\n \n// 3d modeling \n// Typography',
  'category\n \n// 3d modeling \n// environment design',
  "category\n \n// photography \n// editing",
  'category\n \n// Typography \n// UXUI',
];

var texts3 = [
  'error possibly',
  "Hello I'm Oszkar Sztanyo, known for\nbeing obsessed with monsters, mechas,\nangels and Silent Hill",
  'software\n \n// blender \n// zbrush \n// photoshop',
  'software\n \n// blender \n// photoshop',
  "software\n \n// lightroom \n// photoshop",
  'software\n \n// fontlab \n// illustrator',
];

var speed = 5;
var speed2 = 5;
var speed3 = 5;
var indexNumber = 1;
var i = 0;
var i2 = 0;
var i3 = 0;

function typeWriter() {
  var txt = texts[indexNumber]; // Get the text based on the current indexNumber
  if (i < txt.length) {
    document.getElementById("title").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function typeWriter2() {
  var txt = texts2[indexNumber]; // Get the text based on the current indexNumber
  if (i2 < txt.length) {
    document.getElementById("desc1").innerHTML += txt.charAt(i2);
    i2++;
    setTimeout(typeWriter2, speed2);
  }
}

function typeWriter3() {
  var txt = texts3[indexNumber]; // Get the text based on the current indexNumber
  if (i3 < txt.length) {
    document.getElementById("desc2").innerHTML += txt.charAt(i3);
    i3++;
    setTimeout(typeWriter3, speed3);
  }
}

function updateIndex(newIndex) {
  indexNumber = newIndex; // Update the indexNumber
  i = 0; // Reset the index for the typeWriter function
  document.getElementById("title").innerHTML = ""; // Clear the existing text
  typeWriter(); // Start typing the new text
}

function updateIndex2(newIndex) {
  indexNumber = newIndex; // Update the indexNumber
  i2 = 0; // Reset the index for the typeWriter function
  document.getElementById("desc1").innerHTML = ""; // Clear the existing text
  typeWriter2(); // Start typing the new text
}

function updateIndex3(newIndex) {
  indexNumber = newIndex; // Update the indexNumber
  i3 = 0; // Reset the index for the typeWriter function
  document.getElementById("desc2").innerHTML = ""; // Clear the existing text
  typeWriter3(); // Start typing the new text
}

// Assuming currentIndexNumber is 3


// Get the anchor element with id "view"
var anchorElement = document.getElementById("view");

// List of href links AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
var hrefLinks = [
      "*insert link*",
      "projects/36days.html",
      "projects/blender3d.html",
      "projects/alont.html",
      "projects/neuekaine.html"
    ];

// Access the href link based on the currentIndexNumber
var selectedLink = hrefLinks[indexNumber - 1];

var anchorElements = document.getElementById("view");

function updateHref() {
  // Access the href link based on the currentIndexNumber
  var selectedLink = hrefLinks[indexNumber - 1];

  // Set the href attribute of the anchor element to the selected link
  anchorElement.href = selectedLink;
}
updateHref();


function textupdateAll() {
  updateIndex(indexNumber);
  updateIndex2(indexNumber);
  updateIndex3(indexNumber);
  updateHref();

  

}

textupdateAll();

function updateIndicatorClasses() {
  $('#box1').toggleClass('c-indicator-active', indexNumber === 1);
  $('#box2').toggleClass('c-indicator-active', indexNumber === 2);
  $('#box3').toggleClass('c-indicator-active', indexNumber === 3);
  $('#box4').toggleClass('c-indicator-active', indexNumber === 4);
  $('#box5').toggleClass('c-indicator-active', indexNumber === 5);

  $('#desc2').toggleClass('desc-none-active', indexNumber === 1);
  $('#title').toggleClass('responsive-motto', indexNumber === 1);
  $('#view').toggleClass('hidden-view', indexNumber === 1);
  

}

// Update the indicator classes initially
updateIndicatorClasses();

function nextImage() {
  indexNumber++;
  if (indexNumber > 5) {
    indexNumber = 1;
  };
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
  textupdateAll();
 
}


function previousImage() {
  indexNumber--;
  if (indexNumber < 1) {
    indexNumber = 5;
  };
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
  textupdateAll();
  
}




// event handlers for navigation
$('#next').click(function() {
  nextImage();
  resetInterval();
});

$('#prev').click(function() {
  previousImage();
  resetInterval();
});

// box click event handler
$('#box1').click(function() {
  resetInterval();
  indexNumber = 1;
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
  textupdateAll();
  
});
  $('#box2').click(function() {
  indexNumber = 2;
  resetInterval();
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
  textupdateAll();
});
$('#box3').click(function() {
  indexNumber = 3;
  resetInterval();
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
  textupdateAll();
});
$('#box4').click(function() {
  indexNumber = 4;
  resetInterval();
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
  textupdateAll();
});
$('#box5').click(function() {
  indexNumber = 5;
  resetInterval();
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
  textupdateAll();
});


let isScrolling = false;

function handleScroll(event) {
  if (isScrolling) {
    return; // Ignore the scroll event if already scrolling
  }

  isScrolling = true;

  if (event.originalEvent.deltaY < 0) {
    previousImage();
    resetInterval();
  } else if (event.originalEvent.deltaY > 0) {
    nextImage();
    resetInterval();
  }

  setTimeout(() => {
    isScrolling = false; // Reset the flag variable after the delay
  }, 400); // Set the desired delay in milliseconds
}

// Scroll event listener
$(document).on("wheel", handleScroll);

//notjocicodeagain

let pageWidth = $(window).width() || $('body').width();
let treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
const gestureZone = $('#__bruh');

gestureZone.on('touchstart', function(event) {
  touchstartX = event.changedTouches[0].screenX;
  touchstartY = event.changedTouches[0].screenY;
});

gestureZone.on('touchend', function(event) {
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture(event);
});

function handleGesture(e) {
  let x = touchendX - touchstartX;
  let y = touchendY - touchstartY;
  let xy = Math.abs(x / y);
  let yx = Math.abs(y / x);
  if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
    if (yx <= limit) {
      if (x < 0) {
        previousImage();
        resetInterval();
      } else {
        nextImage();
        resetInterval();
      }
    }
    if (xy <= limit) {
      if (y < 0) {
        nextImage();
        resetInterval();
      } else {
        previousImage();
        resetInterval();
      }
    }
  } else {
    console.log("tap");
  }

}

var canSwipe = true;
  var swipeDelay = 100;
  /*click function start*/ {
    canSwipe = false;
    setTimeout(function() {
      canSwipe = true;
    }, swipeDelay);
  } /*click function end*/



//notjoci


var intervalId;

// reset the interval countdown
function resetInterval() {
clearInterval(intervalId);
intervalId = setInterval(nextImage, 6000);
}

// initial interval countdown
resetInterval();




// end of all
});
// end of all lol