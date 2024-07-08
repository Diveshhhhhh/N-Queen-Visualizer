let board = [];
let chessboard = document.getElementById('chessboard');
let stepsCounter = 0;

function createBoard(N) {
    chessboard.innerHTML = '';
    chessboard.style.gridTemplateColumns = `repeat(${N}, 50px)`;
    chessboard.style.gridTemplateRows = `repeat(${N}, 50px)`;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const square = document.createElement('div');
            square.classList.add('square', (i + j) % 2 === 0 ? 'white' : 'black');
            if (board[i][j]) {
                square.innerHTML = '♛';
                square.classList.add('queen');
            }
            chessboard.appendChild(square);
        }
    }
}

function isSafe(board, row, col, N) {
    for (let i = 0; i < col; i++) {
        if (board[row][i]) return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }
    for (let i = row, j = col; i < N && j >= 0; i++, j--) {
        if (board[i][j]) return false;
    }
    return true;
}

function solveNQueensUtil(board, col, N) {
    if (col >= N) return true;
    for (let i = 0; i < N; i++) {
        if (isSafe(board, i, col, N)) {
            board[i][col] = true;
            stepsCounter++;
            createBoard(N);
            if (solveNQueensUtil(board, col + 1, N)) return true;
            board[i][col] = false;
            stepsCounter++;
            createBoard(N);
        }
    }
    return false;
}

function solveNQueens() {
    const N = parseInt(document.getElementById('boardSize').value);
    if (N < 4 || N > 20) {
        alert('Please enter a valid board size between 4 and 20.');
        return;
    }
    board = Array.from({ length: N }, () => Array(N).fill(false));
    stepsCounter = 0;
    document.getElementById('status').innerText = 'Solving...';
    if (solveNQueensUtil(board, 0, N)) {
        createBoard(N);
        document.getElementById('status').innerText = `Solution found in ${stepsCounter} steps!`;
    } else {
        document.getElementById('status').innerText = 'No solution exists.';
    }
}

function resetBoard() {
    const N = parseInt(document.getElementById('boardSize').value);
    board = Array.from({ length: N }, () => Array(N).fill(false));
    stepsCounter = 0;
    createBoard(N);
    document.getElementById('status').innerText = '';
}

createBoard(8);
