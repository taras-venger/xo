let state = {
    players: [
        {
            name: 'Player 1',
            moves: [], // contains array of cells' coordinates: [[1, 1], [1, 2]...]
            mark: 'X',
        },
        {
            name: 'Player 2',
            moves: [], // contains array of cells' coordinates: [[1, 1], [1, 2]...]
            mark: '0',
        },
    ],
    activePlayer: 0,
    gameOver: false
};

const initialState = JSON.parse(JSON.stringify(state));

function cellAvailability(cell) {
    const selected = [...state.players[0].moves, ...state.players[1].moves];
    const selectedStr = selected.map(el => el.toString());
    return selectedStr.indexOf(cell.toString()) === -1;
};

// reseives an array of player's moves
const matchByRowOrColumn = arr => {
    const benchmark = arr[0];
    let x = 0;
    let y = 0;
    for (let el of arr) {
        el[0] === benchmark[0] ? x++ : '';
        el[1] === benchmark[1] ? y++ : '';
    };
    return x === 3 || y === 3;
};

// reseives an array of player's moves
const matchByDiagonal = arr => {
    let d1 = 0;
    let d2 = 0
    for (let el of arr) {
        el[0] === el[1] ? d1++ : '';
        el[0] + el[1] === 4 ? d2++ : '';
    };
    return d1 === 3 || d2 === 3;
};

const checkWin = arr => matchByRowOrColumn(arr) || matchByDiagonal(arr);

const checkDraw = () => {
    const selectedCells = [...state.players[0].moves, ...state.players[1].moves];
    return selectedCells.length === 9 && !state.gameOver;
};

function gameOver(arr, name) {
    if (checkWin(arr)) {
        state.gameOver = true;
        setTimeout(() => alert(`${name} won!`), 0);
    } else if (checkDraw()) {
        state.gameOver = true;
        setTimeout(() => alert(`Game over.`), 0);
    };
};

function switchPlayer() {
    state.activePlayer === 0 ? state.activePlayer = 1 : state.activePlayer = 0;
};

function makeMove(coordinates, id) {
    if (!state.gameOver) {
        const activePlayer = state.activePlayer;
        const name = state.players[activePlayer].name;
        const moves = state.players[activePlayer].moves;
        const mark = state.players[activePlayer].mark;
        // Player's move
        if (cellAvailability(coordinates)) {
            moves.push(coordinates);
            document.getElementById(id).innerText = mark;
            gameOver(moves, name);
            // Machine's move
            if (!state.gameOver) {
                switchPlayer();
                state.activePlayer === 1 ? machineMove() : '';
            }
        } else {
            alert('Selected cell is not available');
        };
    };
};

function machineMove() {
    // Identify available cells
    const allCells = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
    const selectedCells = [...state.players[0].moves, ...state.players[1].moves];
    const allCellsStr = allCells.map(cell => cell.toString());
    const selectedStr = selectedCells.map(cell => cell.toString());
    const availableCells = allCellsStr.filter(cell => !selectedStr.includes(cell));
    // Select rendom cell
    const random = Math.floor(Math.random() * availableCells.length);
    const randomCell = availableCells[random].split(',');
    const x = parseInt(randomCell[0]);
    const y = parseInt(randomCell[1]);
    const coordinates = [x, y];
    const id = randomCell.join('-');
    makeMove(coordinates, id);
};

function resetGame() {
    state = JSON.parse(JSON.stringify(initialState));
    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.innerText = '';
    };
};

const table = document.querySelector('.table');
table.addEventListener('click', event => {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    const coordinates = [x, y];
    const id = event.target.id;
    makeMove(coordinates, id);
});

const startButton = document.querySelector('#start');
startButton.addEventListener('click', resetGame);