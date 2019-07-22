const state = {
    results: {
        player1: [],
        player2: []
    },
    currentPlayer: 'player1',
    gameOver: false
};

const recordToState = (cell, player) => {
    if (state.results[player].includes(cell)) {
        alert('try again');
    } else {
        state.results[player].push(cell);
    }
}

const matchByRowOrColumn = (arr, index) => {
    // index = 0 to check if the game is over due to match by row, index = 1 for columns.
    let count = 0;
    for (let el of arr) {
        el.split('-')[index] === arr[0].split('-')[index] ? count++ : '';
    };
    return count === 3;
}

const matchByDiagonal = arr => {
    let count = 0;
    for (let el of arr) {
        el.split('-')[0] === el.split('-')[1] ? count++ : '';
    };
    return count === 3;
}

const gameOver = arr => matchByRowOrColumn(arr, 0) || matchByRowOrColumn(arr, 1) || matchByDiagonal(arr);

function swithPlayer() {
    if (state.currentPlayer === 'player1') {
        state.currentPlayer = 'player2';
    } else {
        state.currentPlayer = 'player1';
    }
}

// Put it all together
function makeMove(selectedCell) {
    // 1. Select active player
    const activePlayer = state.currentPlayer;

    // 2. Add cell coordinates to the state
    recordToState(selectedCell, activePlayer);

    // 3. Check if the player has won the game
    if (gameOver(state.results[activePlayer])) {
        alert(`${activePlayer} won!`)
    } else {
        swithPlayer();
    }
}
