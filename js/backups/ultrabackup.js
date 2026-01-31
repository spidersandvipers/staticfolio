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

const canvas = document.getElementById("c-canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = 430;



class Cell {
  constructor(effect, x, y, imageIndex, index) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.index = index;
    this.positionX = 0
    this.positionY = this.effect.height * Math.random();
    this.speedX;
    this.speedY;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    this.image = this.selectChildElement(imageIndex);
    this.slideX = 0;
    this.slideY = 0;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.01;
    this.friction = 0.9;
    this.randomize = Math.random() * 10 + 2;
    setTimeout(() => {
      this.start();
    }, this.index * 2);
    
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
    //context.strokeRect(this.x, this.y, this.width, this.height);
  }
  


  start(){
    this.speedX = (this.x - this.positionX)/this.randomize;
    this.speedY = (this.y - this.positionY)/this.randomize;
  }

  update() {  // UPDATE

    //cell pos and opt
    if (Math.abs(this.speedX) > 0.1 || Math.abs(this.speedY) > 0.1) {  //optimazitaon
    this.speedX = (this.x - this.positionX)/this.randomize;
    this.speedY = (this.y - this.positionY)/this.randomize;
    this.positionX += this.speedX;
    this.positionY += this.speedY;
    }
    //crop
    const dx = this.effect.mouse.x - this.x;
    const dy = this.effect.mouse.y - this.y;
    const distance = Math.hypot(dx, dy);
    if (distance < this.effect.mouse.radius){
      const angle = Math.atan2(dy, dx);
      const force = distance / this.effect.mouse.radius;
      this.vx = force * Math.cos(angle);
      this.vy = force * Math.sin(angle);
    } 
  
    this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
    //this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
  }

}


class Effect {
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 50;
    this.cellHeight = this.height / 10;
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
      
    })
    this.canvas.addEventListener('mouseleave', e => {
      
      this.mouse.x = undefined;
      this.mouse.y = undefined;
      
    })
  }
  
  createGrid(){
    
    let index = 0;
    for (let y = 0; y < this.height; y += this.cellHeight){
      for (let x = 0; x < this.width; x += this.cellWidth){
        index++;
        this.imageGrid.unshift(new Cell(this, x, y, indexNumber, index)); 
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

var indexNumber = 3; // THATS THE INDEX NUMBER WOOOO

const effect = new Effect(canvas);
console.log(effect);


function animate(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  effect.render(ctx);
  
  
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate);

// Call the function with the ctx object as an argument


function nextImage() {
  indexNumber++;
  if (indexNumber > 5) {
    indexNumber = 1;
  };
  
  console.log(indexNumber);
  effect.render(ctx);
}


function previousImage() {
  indexNumber--;
  if (indexNumber < 1) {
    indexNumber = 5;
  };
  
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
indexNumber = 1;
resetInterval();
});
$('#box2').click(function() {
indexNumber = 2;
resetInterval();
});
$('#box3').click(function() {
  indexNumber = 3;
resetInterval();
});
$('#box4').click(function() {
  indexNumber = 4;
resetInterval();
});
$('#box5').click(function() {
  indexNumber = 5;
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


// end of all
});
// end of all lol