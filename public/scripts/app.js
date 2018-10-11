/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

//gets tweets that are preloaded
function loadTweets() {
  $.get("/tweets", function (data) {
    renderTweets(sortTweets(data));
  })
}

//new tweet section is hidden; on click of "compose" it appears
$('.new-tweet').hide();

$('#compose').on('click', function (event) {
  $('.new-tweet').slideDown();
  $('#tweedle').focus();
})



//tweet submit form
$('#tweetForm').submit(function (event) {
  event.preventDefault();
  let data = $(this).serialize();
  if (($("#tweedle").val().length == 0) || ($("#tweedle").val() == "")) {
    alert("Oops. Try writing something");
  } else if ($("#tweedle").val().length > 140) {
    alert ("Stop. No one has time for that. 140 characters or less!");
  } else {
    $.ajax({
      method: "POST",
      url: "/tweets",
      data
    })
    .then(function() {loadTweets(), $("#tweedle").val('')})
  }
});

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
      <span class="days">${escape(tweetData.created_at)}</span>
    </footer>
  </article>`;
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

loadTweets();


//sorts tweets in order of when they were created (oldest appear first)
function sortTweets(arrTweets) {
  arrTweets.sort(function (a, b) {
    return a.created_at - b.created_at;
  })
  return arrTweets;
}


});