'use strict';

$(document).ready(function () {
  function AI() {
    var state = ['start', 'defence', 'offensive'];
    var playerArrWinnable = [];
    var machineArrWinnable = [];
    var dangerLines = [];

    function getArrWinneable(char1, char2, dangerLines) {
      var arrWinnable = dangerLines.filter(function (arr) {
        var Mark = 0;
        var empty = 0;
        arr.forEach(function (val) {
          if (val === char1) {
            Mark++;
          } else {
            if (val !== char2) {
              empty++;
            }
          }
        });
        if (Mark === 2 && empty === 1) {
          return true;
        }
      });
      return arrWinnable;
    }

    this.getState = function (chosen) {
      if (chosen.filter(function (val) {
        return !Number.isInteger(val);
      }).length === 0) return state[0];
      dangerLines = [[chosen[0], chosen[3], chosen[6]], [chosen[1], chosen[4], chosen[7]], [chosen[2], chosen[5], chosen[8]], [chosen[0], chosen[1], chosen[2]], [chosen[3], chosen[4], chosen[5]], [chosen[6], chosen[7], chosen[8]], [chosen[0], chosen[4], chosen[8]], [chosen[6], chosen[4], chosen[2]]];
      playerArrWinnable = getArrWinneable('P', 'M', dangerLines);
      machineArrWinnable = getArrWinneable('M', 'P', dangerLines);
      if (machineArrWinnable.length > 0) {
        return state[2];
      }
      if (playerArrWinnable.length > 0) {
        return state[1];
      }
      return state[2];
    };

    this.nextMove = function (state, possibleArr, chosen) {
      var move;
      switch (state) {
        case 'start':
          move = Math.floor(Math.random() * possibleArr.length);
          move = possibleArr[move];
          return move;
        case 'defence':
          move = chosen.indexOf(playerArrWinnable[0].filter(function (val) {
            return Number.isInteger(val);
          })[0]);
          return move;
        case 'offensive':
          if (machineArrWinnable.length > 0) {
            move = chosen.indexOf(machineArrWinnable[0].filter(function (val) {
              return Number.isInteger(val);
            })[0]);
          } else {
            move = Math.floor(Math.random() * possibleArr.length);
            move = possibleArr[move];
          }
          return move;
      }
    };
  }
  var noughtImg = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557191/noughts.png';
  var crossImg = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557191/crosses.png';
  var objsPos = [];
  var possibleSquare;
  var squareChosen;
  var imgMachine;
  var imgPlayer;
  var winLines;
  var machine = new AI();

  function initialization() {
    //necessary for restart
    possibleSquare = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    squareChosen = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }
  initialization();

  function addPos(x, y) {
    objsPos.push({
      id: '#img' + (objsPos.length + 1),
      x: x,
      y: y
    });
  }
  addPos(0, 0);
  addPos(133, 0);
  addPos(266, 0);
  addPos(0, 133);
  addPos(133, 133);
  addPos(266, 133);
  addPos(0, 266);
  addPos(133, 266);
  addPos(266, 266);
  objsPos.forEach(function (obj) {
    $(obj.id).css({
      'margin-left': obj.x,
      'margin-top': obj.y
    });
  });

  function gameBegin(choice) {
    var button = choice;
    if (button.id === 'nought') {
      imgMachine = crossImg;
      imgPlayer = noughtImg;
    } else {
      imgMachine = noughtImg;
      imgPlayer = crossImg;
    }
    $('#menu').css('display', 'none');
  }

  function machineTurn() {
    var img;
    var state = machine.getState(squareChosen);
    var move = machine.nextMove(state, possibleSquare, squareChosen);
    img = objsPos[move];
    possibleSquare = possibleSquare.filter(function (val) {
      return val !== move;
    });
    $(img.id).prop('disable', true);
    squareChosen[move] = 'M';
    $(img.id).attr('src', imgMachine);
  }

  $('button').click(function (event) {
    gameBegin(event.target);
    machineTurn();
  });

  function playerTurn(target) {
    var indexOfTarget;
    indexOfTarget = objsPos.map(function (obj) {
      return obj.id.substr(1);
    }).indexOf(target.id);
    $(target).attr('src', imgPlayer);
    squareChosen[indexOfTarget] = 'P';
    possibleSquare = possibleSquare.filter(function (val) {
      return val !== indexOfTarget;
    });
    $(target).prop({
      disable: true
    });
  }

  function finishGameAction(winner) {
    if (winner) {
      $('#winner-div').css('display', 'inline');
      if (winner === 'M') {
        $('#winner').text('You Lose');
      } else {
        $('#winner').text('You Win');
      }
    } else {
      if (possibleSquare.length === 0) {
        $('#winner-div').css('display', 'inline');
        $('#winner').text('Tie');
        winner = true;
      }
    }
    return winner;
  }

  function whowon() {
    if (possibleSquare.length > 5) {
      return;
    };
    var winner;
    var arr = squareChosen;
    winLines = [
      [arr[0], arr[3], arr[6]], [arr[1], arr[4], arr[7]], 
      [arr[2], arr[5], arr[8]], [arr[0], arr[1], arr[2]], 
      [arr[3], arr[4], arr[5]], [arr[6], arr[7], arr[8]], 
      [arr[0], arr[4], arr[8]], [arr[6], arr[4], arr[2]]];
    winner = winLines.map(function (arr) {
      var player = arr[0];
      if (arr.every(function (val) {
        return player === val;
      })) {
        return player;
      }
    }).filter(function (val) {
      return val;
    })[0];
    return finishGameAction(winner);
  }

  function restart() {
    var cleaner = setTimeout(function () {
      $('img[id!="board"]').prop({
        disable: false,
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557191/space.png'
      });
      $('#winner-div').css('display', 'none');
      initialization();
      machineTurn();
    }, 1500);
  }

  $('img').click(function (event) {
    if ($(event.target).prop('disable')) {
      return;
    }
    var end = false;
    playerTurn(event.target);
    setTimeout(function () {
      if (!whowon()) {
        machineTurn();
        end = whowon();
      } else {
        end = true;
      }
      if (end) {
        restart();
      }
    }, 300);
  });
});