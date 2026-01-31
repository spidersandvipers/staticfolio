$(document).ready(function(){
  $('#__bruh').removeClass('opacity-trans');
    const lenis = new Lenis({
      smooth: true,
      infinite: true,
      smoothTouch: true,
      lerp: 0.05,
      wheelMultiplier: 2.5,
      touchMultiplier: 1.7,
      wrapper: document.querySelector('#infinite-scroll-container'),
      content: document.querySelector('#infinite-box')
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
});


/* 
    lenis.scrollTo('#sex', 
    {offset: 0, 
    immediate: true,})  

    lenis.scrollTo('#real', 
    {offset: 0, 
    immediate: true,})  

*/