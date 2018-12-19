$(document).ready(function() {

  // new tweet section is hidden; on "declare" click it appears
  $('.new-tweet').hide();

  //toggle variable
  let newTweetNow = false;

  // toggle new tween section upon click
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

// error show function
function displayError (type) {
  let displayingErr = false;
  $("#errors").text(randErr(type)).css("color", "#f70d0d");
  displayingErr = true;
  $("#tweedle").on('focus', function (event) {
    $("#errors").empty();
  })
}

// takes any input and returns a string
function escape(str) {
   var div = document.createElement('div');
   div.appendChild(document.createTextNode(str));
   return div.innerHTML;
}

// parses tweedle into HTML code
// only escape values submitted by user
function createTweetElement(tweetData) {

  return `<article class="restTweet">
    <header>
      <img class="avatar" src ="${tweetData.user.avatars.large}"/>
      <h2>${escape(tweetData.user.name)}</h2>
      <span class="handle">${escape(tweetData.user.handle)}</span>
    </header>
    <section class="tweetText">${escape(tweetData.content.text)}</section>
    <footer>
      <span class="days">${jQuery.timeago(tweetData.created_at)}</span>
      <span class="angrycons">
        <span class="iconbox">
          <ion-icon class="icon" data-icon="icon1" data-id="${tweetData._id}" name="hand" title="Oh, stop."></ion-icon>
          <span class="iconcounter">${tweetData.icon1 || 0}</span>
        </span>
        <span class="iconbox">
          <ion-icon class="icon" data-icon="icon2" data-id="${tweetData._id}" name="thumbs-down" title="Thumbs down."></ion-icon>
          <span class="iconcounter">${tweetData.icon2 || 0}</span>
        </span>
        <span class="iconbox">
          <ion-icon class="icon" data-icon="icon3" data-id="${tweetData._id}" name="snow" title="That's cold."></ion-icon>
          <span class="iconcounter">${tweetData.icon3 || 0}</span>
        </span>
      </span>
    </footer>
  </article>`;
}

 // sorts tweets in order of when they were created (oldest appear first)
 function sortTweets(arrTweets) {
   arrTweets.sort(function (a, b) {
     return a.created_at - b.created_at;
   })
   return arrTweets;
 }

// gets tweets that are preloaded
function loadTweets() {
  $.get("/tweets", function (data) {
    renderTweets(sortTweets(data));
  })
}

// renders tweets, in order of most recent to oldest
let mostRecentTweet = 0;

function renderTweets(tweets) {
  tweets.forEach(tweetData => {
    if (tweetData.created_at > mostRecentTweet) {
      let $tweet = createTweetElement(tweetData);
      $('#restTweets').prepend($tweet);
      mostRecentTweet = tweetData.created_at;
      $('.angrycons').first().find('.icon').click(voteHandler);
    }
  });
}

function voteHandler(icon) {
  let button = $(icon.target);
  let bId = button.data('id');
  let bIcon = button.data('icon');
  $.post("/tweets/vote", {id: bId, icon: bIcon}, function(data) {
    button.next().text(data.value[bIcon]);
  });
}