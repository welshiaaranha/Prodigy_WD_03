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
    if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
        placeMark(cell, 'x');
        if (checkWin('x')) {
            setTimeout(() => alert('X Wins!'), 10);
            endGame();
            return;
        } else if (isDraw()) {
            setTimeout(() => alert('Draw!'), 10);
            endGame();
            return;
        }
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    const emptyCells = Array.from(cellElements).filter(cell => !cell.classList.contains('x') && !cell.classList.contains('o'));
    
    // Check if AI can win
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cellElements[a].classList.contains('o') && cellElements[b].classList.contains('o') && !cellElements[c].classList.contains('x') && !cellElements[c].classList.contains('o')) {
            placeMark(cellElements[c], 'o');
            if (checkWin('o')) {
                setTimeout(() => alert('O Wins!'), 10);
                endGame();
                return;
            }
            return;
        }
        if (cellElements[a].classList.contains('o') && cellElements[c].classList.contains('o') && !cellElements[b].classList.contains('x') && !cellElements[b].classList.contains('o')) {
            placeMark(cellElements[b], 'o');
            if (checkWin('o')) {
                setTimeout(() => alert('O Wins!'), 10);
                endGame();
                return;
            }
            return;
        }
        if (cellElements[b].classList.contains('o') && cellElements[c].classList.contains('o') && !cellElements[a].classList.contains('x') && !cellElements[a].classList.contains('o')) {
            placeMark(cellElements[a], 'o');
            if (checkWin('o')) {
                setTimeout(() => alert('O Wins!'), 10);
                endGame();
                return;
            }
            return;
        }
    }

    // Check if AI needs to block player's winning move
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cellElements[a].classList.contains('x') && cellElements[b].classList.contains('x') && !cellElements[c].classList.contains('x') && !cellElements[c].classList.contains('o')) {
            placeMark(cellElements[c], 'o');
            return;
        }
        if (cellElements[a].classList.contains('x') && cellElements[c].classList.contains('x') && !cellElements[b].classList.contains('x') && !cellElements[b].classList.contains('o')) {
            placeMark(cellElements[b], 'o');
            return;
        }
        if (cellElements[b].classList.contains('x') && cellElements[c].classList.contains('x') && !cellElements[a].classList.contains('x') && !cellElements[a].classList.contains('o')) {
            placeMark(cellElements[a], 'o');
            return;
        }
    }

    // If no immediate win or block, pick a random cell
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    placeMark(randomCell, 'o');
    if (checkWin('o')) {
        setTimeout(() => alert('O Wins!'), 10);
        endGame();
    } else if (isDraw()) {
        setTimeout(() => alert('Draw!'), 10);
        endGame();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
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
    cellElements.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

restartButton.addEventListener('click', startGame);

startGame();
