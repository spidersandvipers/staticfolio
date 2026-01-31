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
  constructor(effect, x, y, imageIndex) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    this.image = this.selectChildElement(imageIndex);
    this.slideX = 0;
    this.slideY = 0;
    this.vx = 0;
    this.vy = 0;
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
      this.x, 
      this.y, 
      this.width, 
      this.height
    );
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update() {  // UPDATE
    const dx = this.effect.mouse.x - this.x;
    const dy = this.effect.mouse.y - this.y;
    const distance = Math.hypot(dx, dy);
    if (distance < this.effect.mouse.radius){
      const angle = Math.atan2(dy, dx);
      const force = distance / this.effect.mouse.radius;
      this.vx = force * Math.sin(angle);
      this.vy = force * Math.cos(angle);
    } else {
      this.vx = 0;
      this.vy = 0;
    }
    this.slideX += this.vx;
    this.slideY += this.vy;
  }

}

class Effect {
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 55;
    this.cellHeight = this.height / 35;
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
    for (let y = 0; y < this.height; y += this.cellHeight){
      for (let x = 0; x < this.width; x += this.cellWidth){
        this.imageGrid.push(new Cell(this, x, y, indexNumber)); 
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

var indexNumber = 2; // THATS THE INDEX NUMBER WOOOO

const effect = new Effect(canvas);
console.log(effect);


function animate(){
  effect.render(ctx);
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate);






// end of all
});
// end of all lol