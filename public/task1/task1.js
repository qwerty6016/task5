'use strict';

const sum = function sumFirstNumberAndSecondNumber() {
  const firstNumber = parseFloat(document.getElementById('firstNumber').value);
  const secondNumber = parseFloat(document.getElementById('secondNumber').value);
  const result = (firstNumber * 10 + secondNumber * 10) / 10;

  alert(`Результат:\n ${result}`);
}
