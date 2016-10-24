'use strict';

(function () {
  var textbox = document.getElementById('text-box');
  var lastNum = 0;
  var lastOp = '';
  var operated = false;
  addEventTo('b1');addEventTo('b2');
  addEventTo('b3');addEventTo('b4');
  addEventTo('b5');addEventTo('b6');
  addEventTo('b7');addEventTo('b8');
  addEventTo('b9');addEventTo('b0');
  addEventTo('point');
  addEventTo('rest');addEventTo('divide');
  addEventTo('multiply');addEventTo('subtract');
  addEventTo('add');addEventTo('equal');
  addEventTo('clear');
  function addEventTo(id) {
    var butt = document.getElementById(id);
    butt.addEventListener('click', function (event) {
      console.log(butt);
      //console.log(event);
      event.preventDefault();
      switch (butt.value) {
        case 'C':
          textbox.value = '';
          lastNum = 0;
          lastOp = '';
          break;
        case '.':
          writePoint(butt.value);
          break;
        case '%':
        case '/':
        case 'x':
        case '-':
        case '+':
        case '=':
          operate(butt.value);
          break;
        default:
          writeNumber(butt.value);
      }
    });
  }
  function operate(op) {
    var currentNum = Number(textbox.value);
    if (lastOp === '' || lastNum === 0) {
      lastNum = currentNum;
      textbox.value = '';
    } else {
      switch (lastOp) {
        case '%':
          lastNum = lastNum % currentNum;
          break;
        case '/':
          lastNum = lastNum / currentNum;
          break;
        case 'x':
          lastNum = lastNum * currentNum;
          break;
        case '-':
          lastNum = lastNum - currentNum;
          break;
        case '+':
          lastNum = lastNum + currentNum;
          break;
        default:
      }
    }
    textbox.value = lastNum;
    lastOp = op;
    operated = true;
  }

  function writePoint(p) {
    if (textbox.value.indexOf('.') === -1) {
      textbox.value += '.';
    }
  }
  function writeNumber(num) {
    if (operated || textbox.value === '0') {
      textbox.value = num;
      operated = false;
    } else {
      textbox.value += num;
    }
  }
})();