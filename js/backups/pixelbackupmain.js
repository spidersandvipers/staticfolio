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
canvas.width = 700;
canvas.height = 500;

class Cell {
  constructor(effect, x, y){
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
  }
  draw(context){
    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}

class Effect {
  constructor(canvas, imageIndex) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 55;
    this.cellHeight = this.height / 35;
    this.imageGrid = [];
    this.createGrid();
    console.log(this.imageGrid);
    this.image = this.selectChildElement(imageIndex);
  }

  selectChildElement(index) {
    const carouselContainer = document.querySelector('.carousel-container'); // Select the carousel container element
    const childElements = carouselContainer.children; // Get all the child elements

    return childElements[index]; // Select the desired child element
  }

  createGrid(){
    for (let y = 0; y < this.height; y += this.cellHeight){
      for (let x = 0; x < this.width; x += this.cellWidth){
        this.imageGrid.push(new Cell(this, x, y));
      }
      
    }
  }
  render(context){
    context.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    this.imageGrid.forEach(cell => {
      cell.draw(context);
    })
  }
}

const effect = new Effect(canvas, 2); // THATS WHERE THE NUMBER IS THE INDEX OF THE IMAGE
console.log(effect);
effect.render(ctx);






// end of all
});
// end of all lol