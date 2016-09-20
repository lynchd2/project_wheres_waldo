$(document).ready(function() {
  APP.waldo.init();
});


var APP = APP || {};
APP.waldo = (function($){
  var stub = {};

  stub.init = function(){
    stub.clickWaldo();
  };

  stub.clickWaldo = function(){
    $("#waldo-container").on("click", function(e){
      var posX = $(this).position().left;
      posX = Math.floor((e.pageX - posX));
      var posY = $(this).position().top;
      posY = Math.floor((e.pageY - posY));
      // console.log((posX) + ' , ' + Math.floor(posY));
      addBox(posX, posY);
    });
  };

  var addBox = function(x, y){
    // need to take care of edge cases (like on the edges)
    var $tag = $('<div>').addClass('finder').css("top", y + 60).css("left", x - 10);
    console.log($tag);
    $('#waldo-container').append($tag);
  };

  return stub;
})($);
