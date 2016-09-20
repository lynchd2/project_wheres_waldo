$(document).ready(function() {
  APP.waldo.init();
});


var APP = APP || {};
APP.waldo = (function($){
  var stub = {};

  var characters = ["Waldo", "Woof", "Wizard"];

  stub.init = function(){
    stub.clickWaldo();
    stub.clickChoice();
    $('.drop-down').hide();
  };

  stub.clickWaldo = function(){
    $("#waldo-container").on("click", function(e){
      var posX = $(this).position().left;
      posX = Math.floor((e.pageX - posX));
      var posY = $(this).position().top;
      posY = Math.floor((e.pageY - posY));
      // console.log((posX) + ' , ' + Math.floor(posY));
      addBox(posX, posY);
      dropDown(posX, posY);
    });
  };

  stub.clickChoice = function() {
    $(".choice").click(function(e) {
      var posX = $(this).position().left;
      posX = Math.floor((e.pageX - posX));
      var posY = $(this).position().top;
      posY = Math.floor((e.pageY - posY));
      $(e.target).css("top", posY).css("left", posX);
      $("#waldo-container").append($(e.target));
      $('.drop-down').slideUp();
    });
  };

  var addBox = function(x, y){
    // need to take care of edge cases (like on the edges)
    var $tag = $('<div>').addClass('finder').css("top", y + 60).css("left", x - 10);
    console.log($tag);
    $('#waldo-container').append($tag);
  };

  var dropDown = function(x, y) {
    createDropDown();
    $('.drop-down').css("top", y + 95).css("left", x - 10);
    $('.drop-down').slideDown();
  };

  var createDropDown = function() {
    var $dropDown = $('<div>').addClass("drop-down")
    for (var i = 0; i < characters.length; i++) {
      $dropDown.append('<div>').addClass("choice").text(characters[i]).attr("data-id", characters[i]);
    }
    $("#waldo-container").after($dropDown);
  }

  return stub;
})($);
