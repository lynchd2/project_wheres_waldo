$(document).ready(function() {
  $("#waldo-container").on("click", function(e){
    var posX = $(this).position().left;
    var posY = $(this).position().top;
        alert(Math.floor((e.pageX - posX)) + ' , ' + Math.floor((e.pageY - posY)));
  });
})
