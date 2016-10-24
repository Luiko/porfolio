'use strict';

$(document).ready(function () {
  var voidLimit = 115;
  var filling;
  var time = 0;
  var currentTime = 0;
  var missingTime = 0;
  var currentVoid = 35;
  var currentSand = [123, 115, 0];
  var sandXS = 0;
  var breakTime = 5;
  var sessionTime = Number($('#sessionTime').val());

  function secondsToMinutes(s) {
    var seconds = s % 60;
    var remainder = seconds;
    var minutes = (s - remainder) / 60;
    remainder = minutes % 60;
    var hours = (minutes - remainder) / 60;
    minutes = remainder;
    var result = seconds > 9 ? seconds : '0' + seconds;
    result = minutes > 9 ? minutes + ':' + result : '0' + minutes + ':' + result;
    result = hours > 9 ? hours + ':' + result : hours > 0 ? '0' + hours + ':' + result : result;
    return result;
  }

  function loadStorage() {
    if (Storage && localStorage.time) {
      var time = JSON.parse(localStorage.time);
      if (!time) {
        return;
      }
      currentTime = time.current;
      missingTime = time.missing;
      currentVoid = time.void;
      currentSand = time.sand;
      breakTime = time.break;
      sessionTime = time.session;
      $('#void').css('height', currentVoid + 'px');
      $('#missingSand').css('height', currentSand[0] + 'px');
      $('#fallingSand').css('height', currentSand[1] + 'px');
      $('#currentSand').css('height', currentSand[2] + 'px');
      $('#breakTime').val(breakTime);
      $('#sessionTime').val(sessionTime);
      $('button').text('continue');
      $('#counter div').text(secondsToMinutes(currentTime));
      $('#rest div').text(secondsToMinutes(missingTime));
    }
  }

  loadStorage();
  $('button').click(function () {
    function errorMessage(str) {
      $('#errorMessage').css('display', 'initial');
      $('#errorMessage').html('<strong>Warning!</strong> ' + str);
    }

    function animateClock() {
      filling = setInterval(function () {
        if (missingTime === 0) {
          currentVoid = 35;
          currentSand = [123, 115, 0];
          currentTime = 0;
          time = breakTime;
          breakTime = sessionTime;
          sessionTime = time;
          missingTime = time * 60;
          sandXS = voidLimit / missingTime;
          if ($('#clockHeader h3').text() === 'Session Timer') {
            $('#clockHeader h3').text('Break');
          } else {
            $('#clockHeader h3').text('Session Timer');
          }
        }
        currentVoid += sandXS;
        currentSand[0] -= sandXS;
        currentSand[1] -= sandXS;
        currentSand[2] += sandXS;
        $('#void').css('height', currentVoid + 'px');
        $('#missingSand').css('height', currentSand[0] + 'px');
        $('#fallingSand').css('height', currentSand[1] + 'px');
        $('#currentSand').css('height', currentSand[2] + 'px');
        currentTime++;
        missingTime--;
        $('#counter div').text(secondsToMinutes(currentTime));
        $('#rest div').text(secondsToMinutes(missingTime));
        var time = {
          current: currentTime,
          missing: missingTime,
          void: currentVoid,
          sand: currentSand,
          break: breakTime,
          session: sessionTime
        };
        localStorage.time = JSON.stringify(time);
      }, 1000);
    }
    if (breakTime === 0 || sessionTime === 0) {
      errorMessage("Number not valid");
      return;
    }
    if (breakTime > 600 || sessionTime > 600) {
      errorMessage("Number too hight!");
      return;
    }
    if ($('button').text() === 'start' || $('button').text() === 'continue') {
      $('button').text('stop');
      time = sessionTime * 60;
      missingTime = missingTime === 0 ? time : missingTime;
      sandXS = voidLimit / time;
      animateClock();
    } else {
      $('button').text('continue');
      clearInterval(filling);
    }
  });

  $('input').on('change select', function () {
    clearInterval(filling);
    breakTime = Number($('#breakTime').val());
    sessionTime = Number($('#sessionTime').val());
    $('button').text('start');
    $('#void').css('height', 35 + 'px');
    $('#missingSand').css('height', 115 + 'px');
    $('#fallingSand').css('height', 0 + 'px');
    $('#currentSand').css('height', 0);
    $('#counter div').text('00:00');
    $('#errorMessage').css('display', 'none');
    currentVoid = 35;
    currentSand = [123, 115, 0];
    currentTime = 0;
    missingTime = 0;
    $('#rest div').text(secondsToMinutes(sessionTime * 60));
  });
});