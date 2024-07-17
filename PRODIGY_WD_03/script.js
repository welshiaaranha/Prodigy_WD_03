const cellElements = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        setTimeout(() => alert(`${currentClass.toUpperCase()} Wins!`), 10);
        endGame();
    } else if (isDraw()) {
        setTimeout(() => alert('Draw!'), 10);
        endGame();
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame() {
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function startGame() {
    isXTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

restartButton.addEventListener('click', startGame);

startGame();
