$(document).ready(function(){

// canvas image loading

const canvas = document.getElementById("c-canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = 430;



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
    const context = canvas.getContext('2d');
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

   // context.strokeStyle = 'white'; // Set the stroke color to white
   // context.strokeRect(this.x, this.y, this.width, this.height);
  }
  

  start(){
    //this.positionX = (canvas.width - this.width) / 2; // Calculate the horizontal position to center the image
    this.positionY = (canvas.height - this.height) / 2; // Calculate the vertical position to center the image
    this.speedX = (this.x - this.positionX)/this.randomize;
    this.speedY = (this.y - this.positionY)/this.randomize;
    this.slideY = canvas.height / 2.5;
    
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
    this.cellWidth = this.width / 30;
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


function updateIndicatorClasses() {
  $('#box1').toggleClass('c-indicator-active', indexNumber === 1);
  $('#box2').toggleClass('c-indicator-active', indexNumber === 2);
  $('#box3').toggleClass('c-indicator-active', indexNumber === 3);
  $('#box4').toggleClass('c-indicator-active', indexNumber === 4);
  $('#box5').toggleClass('c-indicator-active', indexNumber === 5);
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
 
}


function previousImage() {
  indexNumber--;
  if (indexNumber < 1) {
    indexNumber = 5;
  };
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
  
}



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
  resetInterval();
  indexNumber = 1;
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
  
});
  $('#box2').click(function() {
  indexNumber = 2;
  resetInterval();
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
});
$('#box3').click(function() {
  indexNumber = 3;
  resetInterval();
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
});
$('#box4').click(function() {
  indexNumber = 4;
  resetInterval();
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
});
$('#box5').click(function() {
  indexNumber = 5;
  resetInterval();
  effect.createGrid(indexNumber);
  updateIndicatorClasses();
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


// end of all
});
// end of all lol