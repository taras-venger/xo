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
    document.addEventListener('click', () => {
        document.getElementById(id).innerText = mark;
    });
}


function makeMove(selectedCell) {
    if (!state.gameOver) {

        const activePlayer = state.currentPlayer;
        const allResults = [...state.results.player1, ...state.results.player2];

        // 1. Check if the selected cell is available
        if (allResults.includes(selectedCell)) {
            alert('Selected cell is not available');
        } else {
            // 2. Add cell coordinates to the state
            state.results[activePlayer].push(selectedCell);

            // 3. Render changes to the UI
            markCell(selectedCell, activePlayer);

            // 4. Check if current player has won the game
            gameOver(state.results[activePlayer]);
            state.gameOver ?
                alert(`${state.currentPlayer} won!`) :
                switchPlayer();
        };
    };
}


const table = document.querySelector('.table')
table.addEventListener('click', event => {
    let id = event.target.id;
    makeMove(id);
});


function resetGame() {
    // Reset state
    state.results = { player1: [], player2: [] };
    state.currentPlayer = 'player1';
    state.gameOver = false;

    // Reset DOM
    document.querySelector('.cell').innerText = '';
}


const startButton = document.querySelector('#start');
startButton.addEventListener('click', resetGame);