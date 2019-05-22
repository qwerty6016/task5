'use strict';

const sum = function sumFirstNumberAndSecondNumber() {
  const firstNumber = parseFloat(document.getElementById('firstNumber').value);
  const secondNumber = parseFloat(document.getElementById('secondNumber').value);
  const result = firstNumber + secondNumber;

  alert(`Результат:\n ${result.toFixed(1)}`);
}
