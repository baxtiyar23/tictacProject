const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const moveHistoryList = document.getElementById('move-history-list');


// Current player
let currentPlayer = 'X';
let moves = [];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
 });
 restartBtn.addEventListener('click',resetGame)



 //HANDLE PART

//cell click
function handleCellClick(e) {
  const clickedCell = e.target;
  const cellCoordinates = clickedCell.getAttribute('data-cell');
  const [row, col] = cellCoordinates.split(',');

  if (clickedCell.innerText === '') {
    clickedCell.innerText = currentPlayer;
    moves.push({ row, col, player: currentPlayer});
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  checkWin(row, col);
  updateMoveHistory();
}
}

//LOGIC PART
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

 moves = [];
  while (moveHistoryList.firstChild) {
    moveHistoryList.removeChild(moveHistoryList.firstChild);
  }
}


//Update history

function updateMoveHistory(){
  const moveIndex = moves.length -1;
  const move = moves[moveIndex];

  const listItem = document.createElement('li');
  const button = document.createElement('button');
  button.innerText = `Move ${moveIndex+1}: Player ${move.player} at (${move.col}, ${move.row})`;
  button.addEventListener('click', () =>{
    resetGame();
    for(let i=0; i<=moveIndex; i++){
      const { row, col, player} =moves[i];
      // const cellIndex = parseInt(row) * 3 +parseInt(col)
      // cells[cellIndex].innerText = player;
      // currentPlayer = player === 'X' ? '0' : 'X';
    }
    moves = moves.slice(0, moveIndex + 1);
    updateMoveHistory();
  });

  listItem.appendChild(button);
  moveHistoryList.appendChild(listItem);
}