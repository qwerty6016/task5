'use strict';

let slider = document.getElementById("slider");

slider.oninput = function() {
  if (slider.value < 95) {
     slider.value = 0;
     return;
  };
  if (slider.value >= 95 && slider.value < 337) {
    slider.value = 190;
    return;
  };
  if (slider.value >= 337 && slider.value < 743) {
    slider.value = 485;
    return;
  };
  if (slider.value >= 743) {
     slider.value = 1000;
     return;
  };
};
