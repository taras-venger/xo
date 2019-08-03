let state = {
    players: [
        {
            name: 'Player 1',
            moves: [],
            mark: 'X',
            winner: false
        },
        {
            name: 'Player 2',
            moves: [],
            mark: '0',
            winner: false
        },
    ],
    activePlayer: 0,
    gameOver: false
};

const cellsIDs = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
const cellsPosition = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
const cellsDOM = document.querySelectorAll('.cell');

const getUsedIDs = () => [...state.players[0].moves, ...state.players[1].moves];
const getState = state => JSON.parse(JSON.stringify(state));
const initialState = getState(state);


function cellAvailability(id) {
    const usedIDs = getUsedIDs();
    return !usedIDs.some(usedID => id === usedID);
};

const matchByRowOrColumn = moves => {
    const lastMove = moves[moves.length - 1];
    let row = 0;
    let column = 0;
    for (let i of moves) {
        cellsPosition[i][0] === cellsPosition[lastMove][0] && row++;
        cellsPosition[i][1] === cellsPosition[lastMove][1] && column++;
    };
    return row === 3 || column === 3;
};

const matchByDiagonal = moves => {
    let d1 = 0;
    let d2 = 0;
    for (let i of moves) {
        cellsPosition[i][0] === cellsPosition[i][1] && d1++;
        cellsPosition[i][0] + cellsPosition[i][1] === 4 && d2++;
    };
    return d1 === 3 || d2 === 3;
};

const checkWin = moves => matchByRowOrColumn(moves) || matchByDiagonal(moves);
const checkDraw = () => getUsedIDs().length === 9;

function gameOver(moves, name) {
    if (checkWin(moves)) {
        state.gameOver = true;
        setTimeout(() => alert(`${name} won!`), 0);
    } else if (checkDraw()) {
        state.gameOver = true;
        setTimeout(() => alert(`Game over`), 0);
    };
};

function switchPlayer() {
    state.activePlayer === 0 ? state.activePlayer = 1 : state.activePlayer = 0;
};

function makeMove(id) {
    if (!state.gameOver) {
        const { name, moves, mark } = state.players[state.activePlayer];
        // Player's move
        if (cellAvailability(id)) {
            moves.push(id);
            document.getElementById(id).innerText = mark;
            gameOver(moves, name);
            // Machine's move
            if (!state.gameOver) {
                switchPlayer();
                state.activePlayer === 1 && machineMove();
            }
        } else {
            alert('Selected cell is not available');
        };
    };
};

function machineMove() {
    const usedIDs = getUsedIDs();
    const vacantIDs = cellsIDs.filter(id => !usedIDs.includes(id));
    const randomNumber = Math.floor(Math.random() * vacantIDs.length);
    const randomID = vacantIDs[randomNumber];
    makeMove(randomID);
};

function resetGame() {
    state = getState(initialState);
    for (let cell of cellsDOM) {
        cell.innerText = '';
    };
};

const table = document.querySelector('.table');
table.addEventListener('click', event => {
    makeMove(event.target.id);
});

const startButton = document.querySelector('#start');
startButton.addEventListener('click', resetGame);