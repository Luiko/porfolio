'use strict';

$(document).ready(function () {
  var text;
  var one = true;
  var linkList;
  function searchInWikipedia() {
    text = $('input').val();
    if (text == '') return;
    linkList = [];
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&maxlag=8&search=' + encodeURI(text) + '&limit=8';
    if (one) {
      $('body').animate({ 'padding-top': '-200px' });
      one = false;
    }
    $.ajax({
      url: url,
      jsonp: 'callback',
      dataType: 'jsonp',
      type: 'GET',
      success: function success(data) {
        if (Array.isArray(data)) {
          data.shift();
          for (var i = data[0].length - 1; i >= 0; i--) {
            var id = 'div-' + i;
            linkList.push({ id: id, link: data[2][i] });
            $('.row').prepend($('<div></div>').attr({ class: 'well', id: id }).html([$('<h3></h3>').attr('id', 'h3-' + i).text(data[0][i]), $('<p></p>').attr('id', 'p-' + i).text(data[1][i]), $('<p></p>').attr('id', 'p2-' + i).html($('<em></em>)').attr('id', 'em-' + i).text(data[2][i]))]));
          }
        }
      },
      complete: function complete(data) {
        var json = data.responseJSON;
        if (Array.isArray(json) && json[0].length === 0) {
          $('.row').prepend($('<div></div>').attr({ class: 'well', id: 'error' }).html([$('<h3></h3>').text('No results found!'), $('<p></p>').text('There may be an error with wikipedia API or the search is not found in wikipedia.')]));
        }
      }
    });
  }
  $('.search').click(searchInWikipedia);
  $('.random').click(function () {
    $('body').css('padding-top', '200px');
    one = true;
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  });
  $('.search, button').click(function () {
    $('input:text').val('');
    $('.well').remove();
  });
  $('div.row').on('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    var target = event.target;
    console.log(target);
    var div;
    var selector = Boolean(target.className) ? target.tagName + '.' + target.className : target.tagName + '#' + target.id;
    if ($(selector).parent().attr('class') == 'well') {
      div = $(selector).parent('.well')[0];
    }
    if (target.tagName == 'EM' && $(selector).parent().parent().attr('class') == 'well') {
      //useless line
      div = $(selector).parent().parent('.well')[0];
    }
    if ($(selector).attr('class') == 'well') {
      div = target;
    }
    if (div) {
      var link = linkList.filter(function (rectangle) {
        return rectangle.id == div.id;
      })[0].link;
      window.open(link);
    }
  });
});