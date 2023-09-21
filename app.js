const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');


// Current player
let currentPlayer = 'X';

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
 });
 restartBtn.addEventListener('click',resetGame)

//cell click
function handleCellClick(e) {
  const clickedCell = e.target;
  const cellCoordinates = clickedCell.getAttribute('data-cell');
  const [row, col] = cellCoordinates.split(',');

  if (clickedCell.innerText === '') {
    clickedCell.innerText = currentPlayer;
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  checkWin(row, col)
}}


// Check for a win
function checkWin(row, col) {
 const winningCombinations = [
   // Rows
   [[0, 0], [0, 1], [0, 2]],
   [[1, 0], [1, 1], [1, 2]],
   [[2, 0], [2, 1], [2, 2]],
   // Columns
   [[0, 0], [1, 0], [2, 0]],
   [[0, 1], [1, 1], [2, 1]],
   [[0, 2], [1, 2], [2, 2]],
   // Diagonals
   [[0, 0], [1, 1], [2, 2]],
   [[2, 0], [1, 1], [0, 2]]
 ];

 for (const combination of winningCombinations) {
   const [a, b, c] = combination;

   if (
     cells[a[0] * 3 + a[1]].innerText === currentPlayer &&
     cells[b[0] * 3 + b[1]].innerText === currentPlayer &&
     cells[c[0] * 3 + c[1]].innerText === currentPlayer
   ) {
     alert(`Player ${currentPlayer} wins!`);
     resetGame();
     return;
   }
 }
}
function resetGame() {
 cells.forEach((cell) => {
   cell.innerText = '';
 });
 currentPlayer = 'X';
}