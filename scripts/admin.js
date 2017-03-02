var base = window.location.origin + "/minisnacks";
var routes = null;
$.getScript(base+"/lib/routes.js",function(response,status){
  routes = new routes();
  
});
var db = null;
$.getScript(base+'/lib/db.class.js',function(response,status){
  db =  new db('users/');

  /*db.find({},function(data){
    var content = "<table class='table'>";
    content += "<tbody>";
    for(var i = 0 ; i < data.length ; i++)
    {
      content +="<tr>";
      content +="<td>"+data[i].id+"</td>";
      content +="<td>"+data[i].name+"</td>";
      content +="</tr>";
    }
    content += "</tbody></table>";
    $("div.content").append(content);
  });*/
});
$('button').on('click',function(){
  console.log(db);
  console.log(data);
});
