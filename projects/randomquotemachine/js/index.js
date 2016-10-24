$(document).ready(function () {
  $('button').on('click', function (e) {
    e.preventDefault();
    var target = e.target;
    $.ajax( {
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      async: false,
      beforeSend: function () {
        $('#hero').html('');
        $('#phrase').html('Loading...');
      },
      success: function(data) {
        var post = data.shift();
        var phrase = post.content.replace(/; /g,": ");
        var phrase2 = phrase.replace(/<p>|<\/p>|<strong>|<\/strong>|<bold>|<\/bold>|<i>|<\/i>|<em>|<\/em>/gi, "");
        if (phrase2.length>140-7){
          $.ajax(this);
          return;
        }
        $('#hero').html("-" + post.title);
        $('#phrase').html(phrase);        
        $('#tweet').attr('href', 'https://twitter.com/intent/tweet?button_hashtag=Quote&text=' + $('#phrase').text());
      },
      cache: false
    });
  });
});

!function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location)? 'http' : 'https';
  if(!d.getElementById(id))
  {
    js = d.createElement(s);
    js.id = id;
    js.src = p + '://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js, fjs);
  }
}(document, 'script', 'twitter-wjs');