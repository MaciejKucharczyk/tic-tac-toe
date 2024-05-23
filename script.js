const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const resetButton = document.getElementById('resetButton');
const endMessage = document.getElementById('endMessage');
const lines = document.getElementsByClassName("line")

const players = ['X', 'O'];
let currentPlayer = players[0];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const winningLines = ["line1", "line3", "line2", "line5", "line6", "line4", "line7", "line8"]

function checkWin(currentPlayer) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
        showWinningLine(winningCombinations[i])
        return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      return false;
    }
  }
  return true;
}

function showWinningLine(winningCombination){
    for (let i = 0; i < winningCombinations.length; i++){
        if (winningCombinations[i] === winningCombination){
            document.getElementById(winningLines[i]).style.opacity = '1';
            winningLines[i].opacity = 100;
        }
    }
}

function restartGame() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = '';
    squares[i].classList.remove('playerX');
    squares[i].classList.remove('playerO');
  }
  for (let i = 0; i < winningLines.length; i++){
    document.getElementById(winningLines[i]).style.opacity = '0';
  }
  currentPlayer = players[0];
  isGameActive = true;
  endMessage.textContent = '';
}

function announce(type) {
  switch (type) {
    case 'X':
      endMessage.textContent = 'Player X Won!';
      break;
    case 'O':
      endMessage.textContent = 'Player O Won!';
      break;
    case 'TIE':
      endMessage.textContent = 'It\'s a Tie!';
      break;
  }
}

function validateResult() {
  if (checkWin(currentPlayer)) {
    announce(currentPlayer);
    isGameActive = false;
  } else if (checkTie()) {
    announce('TIE');
    isGameActive = false;
  }
}

function change(event) {
  if (isGameActive) {
      const square = event.currentTarget;
      if (square.textContent === '') {
          square.textContent = currentPlayer;
          square.classList.add(`player${currentPlayer}`);
          validateResult();
          if (isGameActive) {
              currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          }
      }
  }
}

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', change);
}

resetButton.addEventListener('click', restartGame);