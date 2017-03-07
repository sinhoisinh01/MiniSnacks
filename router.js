/*
  /!\ On codepen, the js pane will contain some /!\
  /!\ other jquery functions that doesn't have  /!\
  /!\ Any effect on the router function         /!\
  --------------------------------------------*/

$(function(){

  /* The following code is the router function.
  --------------------------------------------*/
  function router($route_on){
    var routers = $($route_on + '[data-function="router"]');

    routers.each(function(){

      var $this = $(this);
      var links  = $this.find('a');
      var route = $this.attr('data-route');

      links.each(function(){

        var link = $(this);
        link.attr('data-route',route);

        var route_url = $(this).attr('href');

        if("[data-route="+route+"]"){
          link.attr('href',route+'/'+route_url)
          link.attr('text-route', route+'/'+route_url)
        }

      });
    });
  }


  /* Pen related functions
  --------------------------------------------*/
  $(function(){
    $('p:not(:nth-child(3))').addClass('hidden');
    $('p:nth-child(3)').on('click', function(){
      $(this).toggleClass('open');
      $('p:not(:nth-child(3))').toggleClass('hidden')
    })

  })








  /* Deployment
  -------------------------------------------*/

  	 router('');

  // router() = return nothing;
  // router('') => [data-function="router"];
  // router('div') => div[data-function="router"];
  // router('section') => section[data-function="router"];

})
