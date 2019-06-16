'use strict';

let task3 = new Vue({
  el: '#task3',
  data: {
    startTime: null,
    gameOver: false,
    updateTimeTimeout: null,
    squares: document.getElementsByClassName('game-square'),
    timer: document.getElementById('timer'),

    // previously clicked square
    previousSquare: null,

    // not shown squares remained to win
    squaresRemained: null
  },
  methods: {
    start: function() {
      this.gameOver = false;
      this.previousSquare = null;
      this.squaresRemained = this.squares.length;

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
      Object.values(this.squares).map((square) => {
        square.dataset.color = colors.splice([Math.floor(Math.random() * colors.length)], 1);
        square.style.backgroundColor = 'white';
        square.dataset.checked = '';
      });

      this.startTime = Date.now();

      this.updateTimeTimeout = setTimeout(this.updateTime, 10);
    },

    // update timer
    updateTime: function() {
      if (this.gameOver) return;

      let timePassed = Date.now() - this.startTime;
      let m = Math.floor(timePassed / 60000);
      let s = Math.floor(timePassed % 60000 / 1000);
      let ms = timePassed % 1000;
      m = this.checkTime(m);
      s = this.checkTime(s);
      ms = this.checkTimeMS(ms);
      timer.innerHTML = `${m}:${s}.${ms}`;
      this.updateTimeTimeout = setTimeout(this.updateTime, 10);
    },

    // add zero in front of numbers < 10
    checkTime: function(i) {
      if (i < 10) {
        i = `0${i}`
      };

      return i;
    },

    // add zero in front of numbers < 100
    checkTimeMS: function(i) {
      if (i < 100) {
        i = `0${i}`
      };

      return i;
    },

    // check color of the square
    checkColor: function(e) {
      let element = e.target;

      if (element.dataset.checked) return;

      if (this.previousSquare && this.previousSquare.id !== element.id) {
        if (this.previousSquare.dataset.color === element.dataset.color) {
          element.dataset.checked = this.previousSquare.dataset.checked = true;
          element.style.backgroundColor = element.dataset.color;
          this.squaresRemained -= 2;
          this.checkGameOver();
        } else {
          element.style.backgroundColor = 'white';
          this.previousSquare.style.backgroundColor = 'white';
        };
        this.previousSquare = null;
      } else {
        element.style.backgroundColor = element.dataset.color;
        this.previousSquare = element;
      }
    },

    checkGameOver: function() {
      if (this.squaresRemained <= 0) {
        this.gameOver = true;
        alert(`Вы выиграли!\nЗатраченное время: ${timer.innerHTML}`);
      }
    }
  }
})
