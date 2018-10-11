/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

//gets tweets that are preloaded
function loadTweets() {
  $.get("/tweets", function (data) {
    renderTweets(data);
  })
}

//tweet submit form
$('#tweetForm').submit(function (event) {
  event.preventDefault();
  let data = $(this).serialize();
  $.ajax({
    method: "POST",
    url: "/tweets",
    data
  })
    // .done(function(msg) {
    // });
});


function createTweetElement(tweetData) {

  return `<article class="restTweet">
    <header>
      <img class="avatar" src ="${tweetData.user.avatars.large}"/>
      <h2>${tweetData.user.name}</h2>
      <span class="handle">${tweetData.user.handle}</span>
    </header>
    <section class="tweetText">${tweetData.content.text}</section>
    <footer>
      <span class="days">${tweetData.created_at}</span>
    </footer>
  </article>`;
}


function renderTweets(tweets) {
  tweets.forEach(tweetData => {
    let $tweet = createTweetElement(tweetData);
    $('#restTweets').append($tweet);
  });
}

loadTweets();

});