'use strict';

let posibleMoves = [];

// position of clicked square
let initPosition;

const chessboard = [
  ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8'],
  ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
  ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6'],
  ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5'],
  ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4'],
  ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3'],
  ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
  ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1']
];

const showMoves = function showAllPosibleMoves(element) {
  // change color of previously clicked square
  if (initPosition) {
    let previousElement = document.getElementById(initPosition);

    if (previousElement.className === 'chessboard-white') {
      previousElement.style.backgroundColor = 'white';
    } else {
      previousElement.style.backgroundColor = 'black';
    };
  }

  // reset colors of squares
  posibleMoves.map((posibleMove) => {
    if (posibleMove.className === 'chessboard-white') {
      posibleMove.style.backgroundColor = 'white';
    } else {
      posibleMove.style.backgroundColor = 'black';
    };
  });

  // clear posible moves
  posibleMoves = [];

  let x;
  let y;
  initPosition = element.id;

  switch (initPosition[0]) {
    case 'A':
      x = 0;
      break;
    case 'B':
      x = 1;
      break;
    case 'C':
      x = 2;
      break;
    case 'D':
      x = 3;
      break;
    case 'E':
      x = 4;
      break;
    case 'F':
      x = 5;
      break;
    case 'G':
      x = 6;
      break;
    case 'H':
      x = 7;
      break;
  };

  switch (initPosition[1]) {
    case '1':
      y = 7;
      break;
    case '2':
      y = 6;
      break;
    case '3':
      y = 5;
      break;
    case '4':
      y = 4;
      break;
    case '5':
      y = 3;
      break;
    case '6':
      y = 2;
      break;
    case '7':
      y = 1;
      break;
    case '8':
      y = 0;
      break;
  };

  // check if move is posible
  if (chessboard[y - 2] && chessboard[y - 2][x + 1]) {
    posibleMoves.push(document.getElementById(chessboard[y - 2][x + 1]));
  };

  if (chessboard[y - 1] && chessboard[y - 1][x + 2]) {
    posibleMoves.push(document.getElementById(chessboard[y - 1][x + 2]));
  };

  if (chessboard[y + 1] && chessboard[y + 1][x + 2]) {
    posibleMoves.push(document.getElementById(chessboard[y + 1][x + 2]));
  };

  if (chessboard[y + 2] && chessboard[y + 2][x + 1]) {
    posibleMoves.push(document.getElementById(chessboard[y + 2][x + 1]));
  };

  if (chessboard[y - 2] && chessboard[y - 2][x - 1]) {
    posibleMoves.push(document.getElementById(chessboard[y - 2][x - 1]));
  };

  if (chessboard[y - 1] && chessboard[y - 1][x - 2]) {
    posibleMoves.push(document.getElementById(chessboard[y - 1][x - 2]));
  };

  if (chessboard[y + 1] && chessboard[y + 1][x - 2]) {
    posibleMoves.push(document.getElementById(chessboard[y + 1][x - 2]));
  };

  if (chessboard[y + 2] && chessboard[y + 2][x - 1]) {
    posibleMoves.push(document.getElementById(chessboard[y + 2][x - 1]));
  };

  // change color of posible moves
  posibleMoves.map((posibleMove) => {
    posibleMove.style.backgroundColor = 'limeGreen';
  });

  // change color of clicked square
  element.style.backgroundColor = 'blue';
}
