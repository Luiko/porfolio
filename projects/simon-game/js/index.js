'use strict';

$(document).ready(function () {
  var greenButton = ['#3C9E00', '#4CFF11', 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'],
      redButton = ['#BF0000', '#FF0000', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'];
  var blueButton = ['#557BF8', '#6FAFFF', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'],
      yellowButton = ['#F6CB00', '#FFFD01', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];
  var startTime = 400,
      gameWon = 20;
  var On = false,
      strict = false,
      playerTurn = false;
  var steps = [];
  var step = 0,
      currentStreak = 0,
      currentTime = startTime;
  var currentButton = null,
      timerChangeTurn = null,
      timerEachClickMachine = null;

  $('audio')[0].src = greenButton[2];
  $('audio')[1].src = redButton[2];
  $('audio')[2].src = blueButton[2];
  $('audio')[3].src = yellowButton[2];

  $('#switch').on('click', function () {
    if (!On) {
      On = true;
      $('input').css('color', 'red');
      $('#button').css('float', 'right');
      cutAnimation();
    } else {
      readyGame();
      On = false;
      $('input').css('color', '#8A1424');
      $('#button').css('float', 'left');
    }
  });

  $('#start button').on('click', function () {
    if (!On) {
      return;
    }
    currentStreak = 0;
    currentTime = startTime;
    steps = [];
    currentButton = null;
    playerTurn = true;
    cutAnimation();
    steps = machineLed(steps);
    animateSteps(steps, currentTime, 0);
    step = 0;
  });

  $('.corner').on('mousedown', function (event) {
    if (!On || !playerTurn) {
      return;
    }
    var target = event.target;
    var currentCorner = playCorner(target);
    if (currentCorner !== steps[step]) {
      //wrong button
      $('input').val('!!');
      $('audio')[4].play();
      timerChangeTurn = setTimeout(function () {
        if (strict) {
          $('#start button').trigger('click');
        } else {
          $('input').val(getCurrentStreak(currentStreak));
          animateSteps(steps, currentTime, 0);
          step = 0;
        }
      }, 1000);
    } else {
      step++;
    }
  });

  $('#strict button').on('click', function () {
    if (!On) {
      return;
    }
    if (!strict) {
      $('#led').css('background-color', 'red');
      strict = true;
    } else {
      $('#led').css('background-color', 'black');
      strict = false;
    }
  });

  $('.corner').on('mouseup mouseleave', function (event) {
    if (!On || !currentButton) {
      return;
    }
    var target = event.target;
    if ($(target).css('background-color') === colorHexToRGB(currentButton[1])) {
      $(target).css('background-color', currentButton[0]);
    } else {
      return;
    }
    //used to pause sounds here <-
    currentButton = null;
    if (steps.length === step && currentStreak > 0) {
      if (step === gameWon) {
        //animate win
        steps = [0, 1, 2, 3, 0, 1];
        $('input').val('**');
        animateSteps(steps, 180, 0);
        setTimeout(function () {
          readyGame();
        }, 2000);
      } else {
        steps = machineLed(steps);
        animateSteps(steps, currentTime, 0);
        currentTime -= 4;
        step = 0;
      }
    }
  });

  function cutAnimation() {
    if (timerChangeTurn) {
      clearTimeout(timerChangeTurn);
      clearTimeout(timerEachClickMachine);
    }
  }

  function readyGame() {
    strict = false;
    currentStreak = 0;
    currentTime = startTime;
    $('#led').css('background-color', 'black');
    $('input').val('--');
  }

  function getCurrentStreak(streak) {
    return streak < 10 ? '0' + streak : streak;
  }

  function colorHexToRGB(colorHex) {
    function hexToRGB(hex) {
      function numHex(num) {
        switch (num) {
          case 'A':
            return 10;
          case 'B':
            return 11;
          case 'C':
            return 12;
          case 'D':
            return 13;
          case 'E':
            return 14;
          case 'F':
            return 15;
          default:
            return Number(num);
        }
      }
      return numHex(hex[0]) * 16 + numHex(hex[1]);
    }
    var r = hexToRGB(colorHex.substr(1, 2)),
        g = hexToRGB(colorHex.substr(3, 4)),
        b = hexToRGB(colorHex.substr(5, 6));
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  function machineLed(steps) {
    var newStep = Math.floor(Math.random() * 4);
    steps.push(newStep);
    currentStreak++;
    $('input').val(getCurrentStreak(currentStreak));
    return steps;
  }

  function playCorner(target) {
    var currentCorner = -1;
    switch (target.id) {
      case 'cornerTL':
        currentButton = greenButton;
        currentCorner = 0;
        break;
      case 'cornerTR':
        currentButton = redButton;
        currentCorner = 1;
        break;
      case 'cornerBR':
        currentButton = blueButton;
        currentCorner = 2;
        break;
      case 'cornerBL':
        currentButton = yellowButton;
        currentCorner = 3;
        break;
      default:
        console.log('something is wrong');
    }
    $(target).css('background-color', currentButton[1]);
    $('audio').each(function (_, audio) {
      if (currentButton[2] === audio.src) audio.play();
    });
    return currentCorner;
  }

  function animateSteps(steps, time, counted) {
    if (counted === steps.length) {
      return;
    }
    var button = null;
    var element = steps[counted];
    switch (element) {
      case 0:
        button = $('#cornerTL');
        break;
      case 1:
        button = $('#cornerTR');
        break;
      case 2:
        button = $('#cornerBR');
        break;
      case 3:
        button = $('#cornerBL');
        break;
      default:
        console.log('something goes wrong!');
    }
    timerChangeTurn = setTimeout(function () {
      playCorner(button[0]);
      timerEachClickMachine = setTimeout(function () {
        button.trigger('mouseup');
        animateSteps(steps, time, counted + 1);
      }, time);
    }, time);
  }
});
