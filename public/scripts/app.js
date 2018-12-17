$(document).ready(function() {

  //new tweet section is hidden; on "declare" click it appears
  $('.new-tweet').hide();

  //toggle variable
  let newTweetNow = false;

  //toggle new tween section upon click
  $('#compose').on('click', function (event) {
    if (newTweetNow == false) {
      $('.new-tweet').slideDown();
      $('#tweedle').focus();
      newTweetNow = true;
    } else {
      $('.new-tweet').slideUp();
      newTweetNow = false;
    }
  })

  // tweet submit form: default action is prevented;
  // error checking occurs;
  // if 'error', displayError function is called with randomErrorGenerator error;
  // if not error, we angrify the text, pass it to the textarea, serialize it, and post!
  // once the chirp has been made, the textarea is made empty again
  $('#tweetForm').submit(function (event) {
    event.preventDefault();
    if ($("#tweedle").val().length == 0) {
      displayError(errZero)
    } else if ($("#tweedle").val().length > 140) {
      displayError(errTooMuch);
    } else {
      let angryData = angrify($("#tweedle").val())
      $("#tweedle").val(angryData);
      data = $(this).serialize();
      $.ajax({
        method: "POST",
        url: "/tweets",
        data
      })
      .then(function() {loadTweets(); $("#tweedle").val(''); changeCharCounter($("#tweedle")) });
    }
  });

  loadTweets();

});

//error show function
function displayError (type) {
  let displayingErr = false;
  $("#errors").text(randErr(type)).css("color", "#f70d0d");
  displayingErr = true;
  $("#tweedle").on('focus', function (event) {
    $("#errors").empty();
  })
}

//takes any input and returns a string
function escape(str) {
   var div = document.createElement('div');
   div.appendChild(document.createTextNode(str));
   return div.innerHTML;
}

 //parses tweedle into HTML code
function createTweetElement(tweetData) {

  return `<article class="restTweet">
    <header>
      <img class="avatar" src ="${escape(tweetData.user.avatars.large)}"/>
      <h2>${escape(tweetData.user.name)}</h2>
      <span class="handle">${escape(tweetData.user.handle)}</span>
    </header>
    <section class="tweetText">${escape(tweetData.content.text)}</section>
    <footer>
      <span class="days">${escape(jQuery.timeago(tweetData.created_at))}</span>
      <span class="angrycons">
        <span class="iconbox">
          <span class="iconcaption">"oh, stop!"</span>
          <ion-icon id="icon1" name="hand"></ion-icon>
          <span class="iconcounter">0</span>
        </span>
        <span class="iconbox">
          <span class="iconcaption">"ew, just ew."</span>
          <ion-icon id="icon2" name="thumbs-down"></ion-icon>
        </span>
        <span class="iconbox">
          <span class="iconcaption">"dang that's cold"</span>
          <ion-icon id="icon3" name="snow"></ion-icon>
        </span>
      </span>
    </footer>
  </article>`;
}

 //sorts tweets in order of when they were created (oldest appear first)
 function sortTweets(arrTweets) {
   arrTweets.sort(function (a, b) {
     return a.created_at - b.created_at;
   })
   return arrTweets;
 }

//gets tweets that are preloaded
function loadTweets() {
  $.get("/tweets", function (data) {
    renderTweets(sortTweets(data));
  })
}

//renders tweets, in order of most recent to oldest
let mostRecentTweet = 0;

function renderTweets(tweets) {
  tweets.forEach(tweetData => {
    if (tweetData.created_at > mostRecentTweet) {
      let $tweet = createTweetElement(tweetData);
      $('#restTweets').prepend($tweet);
      mostRecentTweet = tweetData.created_at;
    }
  });
}