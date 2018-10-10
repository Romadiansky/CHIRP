/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var $tweet = createTweetElement(tweetData)

function createTweetElement(tweetData) {

  return `<article>
    <header>
      <h2>${tweetData.user.name}</h2>
      <img src ="${tweetData.user.avatars.large}"/>
      <span class="handle">${tweetData.user.handle}</span>
    <section class="tweetText">${tweetData.content.text}</section>
    <footer>
      <span class="days"${tweetData.created_at}></span>
    </footer>
  </article>`;
}

console.log($tweet);
$('#restTweets').append($tweet);

function renderTweets() {

}
