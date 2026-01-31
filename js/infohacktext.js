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


$(document).ready(function(){

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
    
        iteration += 1 / 3;
      }, 30);
    }
    
  // Add your id here stupid for stupid effect START
  
    document.querySelector("#info").onmouseover = event => {
      startAnimation(event.target);
    };
    
    document.querySelector("#projects").onmouseover = event => {
      startAnimation(event.target);
    };
  
    document.querySelector("#menu").onmouseover = event => {
      startAnimation(event.target);
    };
    document.querySelector("#menu-close").onmouseover = event => {
      startAnimation(event.target);
    };
  
  
  
  // id for stupid effect END
  
  $("#menu").click(function() {
    startAnimation($(".nav-box-el")[0]);
    startAnimation($(".nav-box-el")[1]);
    startAnimation($(".nav-box-el")[2]);
    $("#burger").removeClass("bc-hidden");
  });
  
  $("#menu-close").click(function() {
    startAnimation($(".nav-box-el")[0]);
    startAnimation($(".nav-box-el")[1]);
    startAnimation($(".nav-box-el")[2]);
    $("#burger").addClass("bc-hidden");
  });
  
  $(".nav-box-el").click(function() {
    startAnimation(this);
  });
  
  });