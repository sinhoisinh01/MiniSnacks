var db = (function(){
  function db (table){
    this.table = table;
    this.url = "http://localhost:3000/"+table;
  };
  db.prototype.find = function(findObj,returnCallback){
    $.ajax({
      url : this.url,
      type: "GET",
      data: findObj,
      success: function(data){
        if(data.length > 0)
        {
          returnCallback(data);
        }
      }
    });
  };
  db.prototype.insert = function(insertObj,returnCallback){
    $.ajax({
      url:this.url,
      type:"POST",
      data:Obj,
      success: function(data){
        if(data != null)
        {
          returnCallback(data);
        }
      }
    });
  };
  db.prototype.remove = function(id){
    $.ajax({
      url:this.url+"/"+id,
      type:"DELETE"
    });
  };
  db.prototype.update = function(id,updateObj,returnCallback){
    $.ajax({
      url:this.url+id,
      type:"PUT",
      data:updateObj,
      success: function(data){
        returnCallback(data);
      }
    });
  };
  return db;
}());
