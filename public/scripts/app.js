/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  //error show function
function displayError (msg) {
  let displayingErr = false;
  $("#errors").text(msg).css("color", "#009fff");
  displayingErr = true;
  $("#tweedle").on('focus', function (event) {
    $("#errors").empty();
  })
}

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

$(document).ready(function() {

  //new tweet section is hidden; on click of "compose" it appears
  $('.new-tweet').hide();

  //toggle variable
  let newTweetNow = false;

  //toggle event listener for the new-tweet section
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



  //tweet submit form
  $('#tweetForm').submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    if ($("#tweedle").val().length == 0) {
      displayError("Surely, you've got a thought in there somewhere.")
      .then(removeErr());
    } else if ($("#tweedle").val().length > 140) {
      displayError("Whoa! That's way too much thought! Reevaluate and leave the bad stuff for another, less discriminating platform.Stop.");
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data
      })
      .then(function() {loadTweets(), $("#tweedle").val('')})
    }
  });

  loadTweets();


});