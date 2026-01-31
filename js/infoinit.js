$(document).ready(function(){
    
  $('#__bruh').removeClass('opacity-trans');

  
  var listleft = [
    'error possibly',
    "// Concept art\n// 3d modeling\n// texturing\n// motion design",
    "// Figma\n// Zbrush\n// maya\n// unity",

  ];
  
  var listright = [
    'error possibly',
    "// Webdesign\n// UXUI\n// graphic design\n// Photography",
    '// Adobe cc\n// fontlab\n// VSC\n// webflow',
  ];
  

  var speed2 = 5;
  var speed3 = 5;

  var skillNumber = 1;

  var i2 = 0;
  var i3 = 0; 
  
  function typeWriter2() {
    var txt = listleft[skillNumber]; // Get the text based on the current indexNumber
    if (i2 < txt.length) {
      document.getElementById("desc-left").innerHTML += txt.charAt(i2);
      i2++;
      setTimeout(typeWriter2, speed2);
    }
  }
  
  function typeWriter3() {
    var txt = listright[skillNumber]; // Get the text based on the current indexNumber
    if (i3 < txt.length) {
      document.getElementById("desc-right").innerHTML += txt.charAt(i3);
      i3++;
      setTimeout(typeWriter3, speed3);
    }
  }  
  
  function updateIndex2(skillIndex) {
    skillNumber = skillIndex; // Update the indexNumber
    i2 = 0; // Reset the index for the typeWriter function
    document.getElementById("desc-left").innerHTML = ""; // Clear the existing text
    typeWriter2(); // Start typing the new text
  }
  
  function updateIndex3(skillIndex) {
    skillNumber = skillIndex; // Update the indexNumber
    i3 = 0; // Reset the index for the typeWriter function
    document.getElementById("desc-right").innerHTML = ""; // Clear the existing text
    typeWriter3(); // Start typing the new text
  }
  
  
  
  function textupdateAll() {
    updateIndex2(skillNumber);
    updateIndex3(skillNumber);
  }

  textupdateAll();


  $('#softd').click(function() {
    skillNumber = 2;
    textupdateAll();
    $('#softd').addClass('skill-active');
    $('#skilld').removeClass('skill-active');

  });

  $('#skilld').click(function() {
    skillNumber = 1;
    textupdateAll();
    $('#skilld').addClass('skill-active');
    $('#softd').removeClass('skill-active');


  });


  var childElements = $("#mid-bar").children();
  var currentIndex = 0;
  var direction = 1;
  
  setInterval(function() {

  
    childElements.removeClass("bar-active");
    childElements.eq(currentIndex).addClass("bar-active");
  
    currentIndex += direction;
  
    if (currentIndex >= childElements.length - 1) {
      direction = -1; // Change direction to go backward
    } else if (currentIndex <= 0) {
      direction = 1; // Change direction to go forward
    }
  
    console.log("balls");
  }, 1100);




});  