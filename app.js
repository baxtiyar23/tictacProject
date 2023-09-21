const cells = document.querySelectorAll('.cell');

// Current player
let currentPlayer = 'X';

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

//cell click
function handleCellClick(e) {
  const clickedCell = e.target;
  const cellCoordinates = clickedCell.getAttribute('data-cell');
  const [row, col] = cellCoordinates.split(',');

  if (clickedCell.innerText === '') {
    clickedCell.innerText = currentPlayer;
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  } 
}