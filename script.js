let n;
let board = [];
let speed = 1000;

document.getElementById('speedControl').addEventListener('input', (event) => {
    speed = event.target.value;
    document.getElementById('speedValue').innerText = speed + 'ms';
});

function startVisualization() {
    n = parseInt(document.getElementById('nValue').value);
    if (n === 2 || n === 3) {
        alert('No solution exists for N = ' + n);
        return;
    }
    board = Array.from({ length: n }, () => Array(n).fill(0));
    createBoard();
    solveNQueen(0);
}

function createBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    for (let i = 0; i < n; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        for (let j = 0; j < n; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.className = `cell ${((i + j) % 2 === 0) ? 'white' : 'black'}`;
            cellDiv.id = `cell-${i}-${j}`;
            rowDiv.appendChild(cellDiv);
        }
        boardDiv.appendChild(rowDiv);
    }
}

async function solveNQueen(row) {
    if (row === n) {
        return true;
    }
    for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
            board[row][col] = 1;
            await visualizeStep(row, col, true);
            if (await solveNQueen(row + 1)) {
                displayQueenIcon(row, col); // Display queen icon on successful placement
                return true;
            }
            board[row][col] = 0;
            await visualizeStep(row, col, false);
        }
    }
    return false;
}

function isSafe(row, col) {
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
    }
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 1) return false;
    }
    return true;
}

async function visualizeStep(row, col, isPlacing) {
    const cell = document.getElementById(`cell-${row}-${col}`);
    cell.classList.remove('red', 'queen');
    if (isPlacing) {
        cell.classList.add('queen');
    } else {
        cell.classList.add('red');
        await new Promise(r => setTimeout(r, speed / 2));
        cell.classList.remove('red');
    }
    await new Promise(r => setTimeout(r, speed));
}

function displayQueenIcon(row, col) {
    const cell = document.getElementById(`cell-${row}-${col}`);
    cell.classList.add('queen');
}
