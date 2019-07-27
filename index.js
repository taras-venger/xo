const state = {
    results: {
        player1: [],
        player2: []
    },
    currentPlayer: 'player1',
    gameOver: false
};

// Check if the game is over - step 1
const matchByRowOrColumn = (arr, index) => {
    // index = 0 to check if the whole row matches, index = 1 to check columns.
    let count = 0;
    for (let el of arr) {
        el.split('-')[index] === arr[0].split('-')[index] ? count++ : '';
    };
    return count === 3;
}

// Check if the game is over - step 2
const matchByDiagonal = arr => {
    let d1 = 0;
    let d2 = 0
    for (let el of arr) {
        let row = parseInt(el.split('-')[0]);
        let column = parseInt(el.split('-')[1]);
        row === column ? d1++ : '';
        row + column === 4 ? d2++ : '';
    };
    return d1 === 3 || d2 === 3;
}

// Check if the game is over - step 3
const gameOver = arr => {
    if (matchByRowOrColumn(arr, 0) ||
        matchByRowOrColumn(arr, 1) ||
        matchByDiagonal(arr)) {
        state.gameOver = true;
    };
};

function switchPlayer() {
    state.currentPlayer === 'player1' ?
        state.currentPlayer = 'player2' :
        state.currentPlayer = 'player1';
};

function markCell(id, player) {
    let mark;
    player === 'player1' ? mark = 'x' : mark = '0';
    document.getElementById(id).innerText = mark;
};

function makeMove(selectedCell) {
    if (!state.gameOver) {
        const activePlayer = state.currentPlayer;
        const allResults = [...state.results.player1, ...state.results.player2];

        // Check if the selected cell is available
        if (allResults.includes(selectedCell)) {
            alert('Selected cell is not available');
        } else {
            // Update state
            state.results[activePlayer].push(selectedCell);
            gameOver(state.results[activePlayer]);

            // Update UI
            markCell(selectedCell, activePlayer);

            // Check if current player has won the game
            state.gameOver ?
                setTimeout(() => alert(`${state.currentPlayer} won!`), 0) :
                switchPlayer();
        };
    };
};

function resetGame() {
    // Reset state
    state.results = { player1: [], player2: [] };
    state.currentPlayer = 'player1';
    state.gameOver = false;

    // Reset DOM
    const cells = document.querySelector('.table').children;
    for (let cell of cells) {
        cell.innerText = '';
    }
};

// Set event listeners
const table = document.querySelector('.table');
table.addEventListener('click', event => makeMove(event.target.id));

const startButton = document.querySelector('#start');
startButton.addEventListener('click', resetGame);