const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'red';
let gameOver = false;

const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');

// Initialize the board
function createBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  gameBoard.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', () => placePiece(c));
      gameBoard.appendChild(cell);
    }
  }
}

// Place a piece in the column
function placePiece(col) {
  if (gameOver) return;

  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      updateCell(row, col);
      if (checkWin(row, col)) {
        message.textContent = `${currentPlayer.toUpperCase()} Wins! 🎉`;
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'red' ? 'green' : 'red';
        message.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
      }
      break;
    }
  }
}

// Update the UI
function updateCell(row, col) {
  const index = row * COLS + col;
  const cell = gameBoard.children[index];
  cell.classList.add(currentPlayer);
}

// Check win condition
function checkWin(r, c) {
  const directions = [
    [[0,1],[0,-1]],
    [[1,0],[-1,0]],
    [[1,1],[-1,-1]],
    [[1,-1],[-1,1]]
  ];
  for (const [[dx1, dy1], [dx2, dy2]] of directions) {
    let count = 1;
    count += countDirection(r, c, dx1, dy1);
    count += countDirection(r, c, dx2, dy2);
    if (count >= 4) return true;
  }
  return false;
}

function countDirection(r, c, dr, dc) {
  let count = 0;
  let player = board[r][c];
  for (let i = 1; i < 4; i++) {
    const nr = r + dr * i;
    const nc = c + dc * i;
    if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== player) break;
    count++;
  }
  return count;
}

createBoard();
message.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
