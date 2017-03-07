$(document).ready(function($) {
  $(".scroll").click(function(event){
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
  });
  $().UItoTop({ easingType: 'easeOutQuart' });
  var lastScrollTop = 0 ;
  var flag = 0 ;
  $(window).on('scroll',function() {
    var scroll = $(this).scrollTop();
    if (scroll > lastScrollTop){
      if(scroll >=220 && flag == 0)
      {
        $('body').animate({
          scrollTop: $(".content").offset().top - 63
        },300);
        scroll = $(window).scrollTop() + 10;
        flag =1;
        $(".header-bottom").css({"position":"fixed","z-index":"1000","top":"0","margin-top":"0","width":"100%","left":"0","opacity":"0.9"});
      }
    }
    else{
      if(scroll< 220){
        flag =0;
        $(".header-bottom").css({"position":"relative","z-index":"","top":"","margin-top":"2em","width":"","left":"","opacity":""});
      }
    }
    lastScrollTop = scroll;
  });
});
