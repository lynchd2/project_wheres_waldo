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
    stub.clickX();
    $('.drop-down').hide();
  };

  stub.clickWaldo = function(){
    $("#waldo-container").on("click", function(e){
      if (characters.length > 0) {
        $('[data-tag="0"]').remove();
        var posX = $(this).position().left;
        posX = Math.floor((e.pageX - posX));
        var posY = $(this).position().top;
        posY = Math.floor((e.pageY - posY));
        // console.log((posX) + ' , ' + Math.floor(posY));
        var tag = addBox(posX, posY);
        dropDown(posX, posY, tag);
      } else {
        submitGuess();
      }
    });
  };

  var submitGuess = function() {};


  //Maybe refactor so parent() is not constantly being used
  //Try to find out parent of choice
  stub.clickChoice = function() {
    $("body").on("click", ".choice", function(e) {
      var $target = $(e.target).removeClass('choice');
      var finderDiv = $target.parent().parent();
      var x = parseInt(finderDiv.css("top"));
      var y = parseInt(finderDiv.css("left"));
      var character = $target.data("id");
      var photo_id = Number(window.location.pathname.split("/").slice(-1));
      ajaxRequest({x: x , y: y ,character: character, photo_id: photo_id}, $target, finderDiv);
    });
  };

  var ajaxRequest = function(tag, $target, finderDiv) {
    $.ajax({
        url: "/tags",
        method: "POST",
        data: JSON.stringify({ tag: tag }),
        contentType: "application/json",
        dataType: "json",
        success: function() {
          finderDiv.attr('data-tag', '1');
          removeChar($target.data('id'));
          var $dropDown = $target.parent().removeClass('drop-down').addClass('absolute');
          $(".choice").remove();
        }
      });
  };

  var getTags = function() {
    var photo_id = Number(window.location.pathname.split("/").slice(-1));
    $.ajax({
      url: "/tags",
      method: "GET",
      data: "pid=" + photo_id,
      contentType: "application/json",
      dataType: "json",
      success: function(data) {
        populateTags(data);
      }
    });
  };

  var populateTags = function(data) {

  };

  stub.clickX = function() {
    $("body").on("click", "a", function(e) {
      e.preventDefault();
      $target = $(e.target);
      if ($target.parent().data('tag')) {
        var char = $target.siblings().last().text();
        characters.push(char);
      }
      $target.parent().remove();
    });
  };

  var removeChar = function(charName){
    var index = characters.indexOf(charName);
    if (index > -1){
      characters.splice(index, 1);
    }
  };

  var addBox = function(x, y){
    // need to take care of edge cases (like on the edges)
    var $tag = $('<div>').addClass('finder').css("top", y + 60).css("left", x - 10).attr("data-tag", "0");
    var $x = $('<a href="#">').addClass("x-link").text("X")
    $tag.append($x);
    $('#waldo-container').after($tag);
    return $tag;
  };

  var dropDown = function(x, y, tag) {
    createDropDown(tag);
    // $('.drop-down').css("top", y + 95).css("left", x - 10);
    $('.drop-down').slideDown();
  };

  var createDropDown = function(tag) {
    var $dropDown = $('<div>').addClass("drop-down");
    for (var i = 0; i < characters.length; i++) {
      addCharacters($dropDown, i);
    }
    tag.append($dropDown);
  };

  var addCharacters = function(dropDown, index) {
    var x = $('<div>').addClass("choice").text(characters[index]).attr("data-id", characters[index]);
    dropDown.append(x);
  };


  return stub;
})($);
