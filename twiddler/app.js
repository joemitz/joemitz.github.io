$(document).ready(function() {
  jQuery("time.timeago").timeago();

  var renderFeed = function(user) {
    $feed.html('');
    var tweets;
    user === undefined ? tweets = streams.home : tweets = streams.users[user];
    
    for (var i = tweets.length - 1; i >= 0; i--) {
      var tweet = tweets[i];
      
      var $tweet =        $('<div class="tweet"></div>');
      var $profilephoto = $('<img class="profile-photo"></img>');
      var $username =     $('<div class="username"></div>');
      var $timestamp =    $('<div class="timestamp"></div>');
      var $message =      $('<div class="message"></div>');
      var $comment =      $('<i class="fas fa-comment comment"></i>');
      var $retweet =      $('<i class="fas fa-retweet retweet"></i>');
      var $like =         $('<i class="fas fa-heart like"></i>');
      var $share =        $('<i class="fas fa-share share"></i>');

      $profilephoto.attr('src', tweet.profilePhotoURL);
      $username.text('@' + tweet.user);
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $message.text(tweet.message);
      
      $tweet.appendTo($feed);
      $profilephoto.appendTo($tweet);
      $username.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $message.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      
      $username.on("click", function(event) {
        renderFeed(this.innerText.substring(1));
        $updateBtn.text('Back');
      });
    }
  }

  var generateVisitorTweet = function(username, message) {
    var tweet = {};
    tweet.user = username;
    tweet.message = message;
    tweet.created_at = new Date();
    tweet.profilePhotoURL = './assets/img/visitor.png';
    addVisitorTweet(tweet);
  };

  var addVisitorTweet = function(newTweet) {
    var username = newTweet.user;
    streams.users[username] === undefined ?
    streams.users[username] = [newTweet] :
    streams.users[username].push(newTweet);
    streams.home.push(newTweet);
    renderFeed();
  };

  var $app = $('#app');
  
  var $layout = $(
    '<div id="container">' + 
      '<div id="box1"></div>' +
      '<div id="box2"></div>' +
      '<div id="box3"></div>' +
    '</div>'
  );
   
  var $newTweetForm = $(
    '<form id="new-tweet-form" autocomplete="off" onsubmit="return false">' +
      '<label>Username</label><br>' + 
        '<input type="text" maxlength="12" name="username"><br>' +
      '<label>Message</label><br> ' +
        '<textarea rows="5" cols="16" maxlength="77" name="message"></textarea><br>' +
      '<input type="submit" name="submit" value="Submit">' +
    '</form>'
  );

  var $updateBtn = $('<button type="button" id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  var $friendsList = $(
    '<div id=friends>' +
    '<span>Friends</span>' +
    '<ul id="friends-list">' +
      '<li id="friend">mracus</li>' +
      '<li id="friend">shawndrost</li>' +
      '<li id="friend">douglascalhoun</li>' +
      '<li id="friend">sharksforcheap</li>' +
    '</ul></div'
  );

  $app.html('');
  $layout.appendTo($app);
  $updateBtn.appendTo('#box1');
  $newTweetForm.appendTo('#box1');
  $feed.appendTo('#box2');
  $friendsList.appendTo('#box3');

  renderFeed();
  
  $updateBtn.on("click", function(event) {
    if ($updateBtn.text() === 'Back') {
      $updateBtn.text('Update Feed');
    }
    renderFeed();
  });

  $("form").submit(function(event) {
    var values = $(this).serializeArray();
    var username = values[0]['value'];
    var message = values[1]['value'];
    generateVisitorTweet(username, message);
    this.reset();
  });

  $("li").on("click", function(event) {
    renderFeed(this.innerText);
    $updateBtn.text('Back');
  });
});