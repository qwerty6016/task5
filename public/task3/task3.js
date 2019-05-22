'use strict';

const squares = document.getElementsByClassName('game-square');
const timer = document.getElementById('timer');
let startTime;
let gameOver;
let updateTimeTimeout;

// previously clicked square
let previousSquare;

// not shown squares remained to win
let squaresRemained;

// start the game
const start = function() {
  gameOver = false;
  previousSquare = null;
  squaresRemained = squares.length;

  let colors = [
    'blue',
    'red',
    'green',
    'orange',
    'gray',
    'yellow',
    'violet',
    'aqua',
    'blue',
    'red',
    'green',
    'orange',
    'gray',
    'yellow',
    'violet',
    'aqua'
  ];

  // reset squares
  Object.values(squares).map((square) => {
    square.dataset.color = colors.splice([Math.floor(Math.random() * colors.length)], 1);
    square.style.backgroundColor = 'white';
    square.dataset.checked = '';
  });

  startTime = Date.now();

  updateTimeTimeout = setTimeout(updateTime, 10);
}

// update timer
const updateTime = function() {
  if (gameOver) return;

  let timePassed = Date.now() - startTime;
  let m = Math.floor(timePassed / 60000);
  let s = Math.floor(timePassed % 60000 / 1000);
  let ms = timePassed % 1000;
  m = checkTime(m);
  s = checkTime(s);
  ms = checkTimeMS(ms);
  timer.innerHTML = `${m}:${s}.${ms}`;
  updateTimeTimeout = setTimeout(updateTime, 10);
}

// add zero in front of numbers < 10
const checkTime = function(i) {
  if (i < 10) {
    i = `0${i}`
  };

  return i;
}

// add zero in front of numbers < 100
const checkTimeMS = function(i) {
  if (i < 100) {
    i = `0${i}`
  };

  return i;
}

// check color of the square
const checkColor = function(element) {
  if (element.dataset.checked) return;

  if (previousSquare && previousSquare.id !== element.id) {
    if (previousSquare.dataset.color === element.dataset.color) {
      element.dataset.checked = previousSquare.dataset.checked = true;
      element.style.backgroundColor = element.dataset.color;
      squaresRemained -= 2;
      checkGameOver();
    } else {
      element.style.backgroundColor = 'white';
      previousSquare.style.backgroundColor = 'white';
    };
    previousSquare = null;
  } else {
    element.style.backgroundColor = element.dataset.color;
    previousSquare = element;
  }
}

const checkGameOver = function() {
  if (squaresRemained <= 0) {
    gameOver = true;
    alert(`Вы выиграли!\nЗатраченное время: ${timer.innerHTML}`);
  }
}
