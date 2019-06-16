'use strict';

let task1 = new Vue({
  el: '#task1',
  data: {
    firstNumber: 0.1,
    secondNumber: 0.2
  },
  methods: {
    sum: function() {
      const result = (this.firstNumber * 10 + this.secondNumber * 10) / 10;
      alert(`Результат:\n ${result}`);
    }
  }
})
