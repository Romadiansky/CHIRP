$(document).ready(function() {
  setCharCounter();
});

//counts the remaining characters on 'keyup'
function setCharCounter() {
  $("#tweedle").on('keyup', function() {
    changeCharCounter(this);
  });
}

function changeCharCounter(textbox) {
  let counterSpan = $(textbox).parent().children(".counter");
  let charsLeft = 140 - $(textbox).val().length;
  counterSpan.html(charsLeft);
  if (charsLeft < 0) {
    counterSpan.css("color", "red");
  } else {
    counterSpan.css("color", "black");
  }
}