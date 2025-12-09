// Lights Out - ITC505 Final
// Board dimensions
const SIZE = 5;

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const newGame = document.getElementById("new-game");

    createBoard(board);
    randomizeBoard(board);

    // New game button
    newGame.addEventListener("click", () => {
        resetBoard(board);
        randomizeBoard(board);
        status.textContent = "New puzzle generated!";
    });

    // Handle clicks using event delegation
    board.addEventListener("click", (e) => {
        const cell = e.target.closest(".cell");
        if (!cell) return;

        const r = Number(cell.dataset.row);
        const c = Number(cell.dataset.col);

        toggleAt(board, r, c, true);
    });
});

/* Create the 5×5 board dynamically */
function createBoard(board) {
    board.innerHTML = "";

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.dataset.row = r;
            div.dataset.col = c;
            board.appendChild(div);
        }
    }
}

/* Reset to solved state */
function resetBoard(board) {
    board.querySelectorAll(".cell").forEach(cell =>
        cell.classList.remove("is-off")
    );
}

/* Randomize using simulated clicks (guaranteed solvable) */
function randomizeBoard(board) {
    const moves = getRandomInt(10, 25);

    for (let i = 0; i < moves; i++) {
        const r = getRandomInt(0, SIZE - 1);
        const c = getRandomInt(0, SIZE - 1);
        toggleAt(board, r, c, false); // no win checking during setup
    }
}

/* Toggle a cell + neighbors */
function toggleAt(board, r, c, checkWin) {
    toggleCell(board, r, c);
    toggleCell(board, r - 1, c);
    toggleCell(board, r + 1, c);
    toggleCell(board, r, c - 1);
    toggleCell(board, r, c + 1);

    if (checkWin && isSolved(board)) {
        window.alert("You win!");
        document.getElementById("status").textContent = "You solved it!";
    }
}

/* Toggle a single cell safely */
function toggleCell(board, r, c) {
    if (r < 0 || c < 0 || r >= SIZE || c >= SIZE) return;

    const cell = board.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    cell.classList.toggle("is-off");
}

/* Win condition */
function isSolved(board) {
    return !board.querySelector(".cell.is-off");
}

/* Random integer helper */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
