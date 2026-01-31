// Projects button

$(document).ready(function(){

  $('#__bruh').removeClass('opacity-trans');

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

    document.querySelector("#prev-project").onmouseover = event => {
      startAnimation(event.target);
    };

    document.querySelector("#next-project").onmouseover = event => {
      startAnimation(event.target);
    };

    document.querySelector("#be-btn").onmouseover = event => {
      startAnimation(event.target);
    };
  
    function getRandomTime() {
      return Math.floor(Math.random() * 9000) + 1000; // Generate a random time between 1000 (1 second) and 9000 (9 seconds)
    }
    startAnimation(document.querySelector(".project-title"));
    startAnimation(document.querySelector("#p-title-bot"));
    function runAnimation() {
      setTimeout(function() {
        startAnimation(document.querySelector(".project-title"));
        startAnimation(document.querySelector("#p-title-bot"));
        runAnimation();
      }, getRandomTime());
    }

    runAnimation();

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