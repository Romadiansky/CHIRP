$(document).ready(function() {
  setCharCounter();
});

function setCharCounter() {
  $("#tweedle").on('keyup', function(){
    $(this).parent().children(".counter").html(140 - $(this).val().length);
    // console.log(140 - $(this).val().length);
  });
}