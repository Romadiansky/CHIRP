$(document).ready(function() {
  setCharCounter();
});

function setCharCounter() {
  $("#tweedle").on('keyup', function(){
    let counterSpan = $(this).parent().children(".counter");
    let charsLeft = 140 - $(this).val().length;
    counterSpan.html(charsLeft);
    if (charsLeft < 0) {
      counterSpan.css("color", "red");
    } else {
      counterSpan.css("color", "black");
    }
  });
}
