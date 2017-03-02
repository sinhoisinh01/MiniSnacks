var routes = (function(){
  function routes(){
    this.url = window.location.pathname;
    this.base = window.location.origin + "/minisnacks";
    this.route = [];
    var temp = this.url.split("/");
    for(var i = 0 ; i < temp.length ; i++)
      if(temp[i] != "")
        this.route[this.route.length] = temp[i];
  };
  routes.prototype.get = function(container){
    if(this.route.length == 1)
    {
      $.get(this.base+"/view/index.html",function(data){
          $(container).html(data);
      });
    }
    else if(this.route.length ==2 && this.route[1] == "admin")
    {
      console.log(this.route);
      $.get(this.base+"/view/admin.html",function(data){
          $(container).hide().html(data).fadeIn('fast');
      });
    }
  };
  return routes;
}());
