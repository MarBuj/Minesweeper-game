import { startBtnActive, startBtnHide, infoCardActive, gameCardActive, resultActive, cardHide } from './animations.js';

const startBtn = document.querySelector('.startBtn');
const exitBtn = document.querySelector('.exitBtn');
const continueBtn = document.querySelector('.continueBtn');
const quitBtn = document.querySelector('.quitBtn');
const replyBtn = document.querySelector('.replyBtn');

const board = document.querySelector('.board');
const gameCardFooter = document.querySelector('.gameCard .card-footer');

startBtnActive();

startBtn.addEventListener('click', () => {
    startBtnHide();
    setTimeout(infoCardActive, 300);
})

exitBtn.addEventListener('click', () => {
    cardHide();
    setTimeout(startBtnActive, 300);
})

continueBtn.addEventListener('click', () => {
    cardHide();
    setTimeout(gameCardActive, 300);
    createBoard();
})

let width = 10;
let bombAmount = 20;
let bombLeft = bombAmount;
let flagAmount  = 0;
let squares = [];
// let isGameOver = false;

replyBtn.addEventListener('click', () => {
    flagAmount  = 0;
    squares = [];
    board.innerHTML = '';
    gameCardFooter.style.display = 'none';
    gameCardFooter.style.opacity = '0';
    createBoard();
})

quitBtn.addEventListener('click', () => {
    cardHide();
    window.location.reload();
    startBtnActive();
})

function createBoard() {
    const BombsArray = Array(bombAmount).fill('bomb'); // creating bombs array;
    const emptyArray = Array(width*width - bombAmount).fill('empty'); // creating available choises array;
    const gameArray = emptyArray.concat(BombsArray); // combining bombs and available choises array;
    const shuffledGameArray = gameArray.sort(() => 0.5 - Math.random()); // shuffling combined array for random arrangement;

    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div'); // creating 100 square divs;
        square.setAttribute('id', i); // giving them id from 0 to 99;
        square.classList.add(shuffledGameArray[i]); // adding classnames ('empty' or 'bomb');

        board.appendChild(square); // placing divs to board HTML element;
        squares.push(square); // creating an array of divs;

        square.addEventListener('click', () => { // user left click;
            click(square);
        });

        square.addEventListener('contextmenu', (e) => { // user right click;
            e.preventDefault();
            addFlag(square);
        })
    }

    for (let i = 0; i < squares.length; i++) {
        let total = 0;
        const isLeftEdge = (i % width === 0);
        const isRightEdge = (i % width === width - 1);

        if (squares[i].classList.contains('empty')) {
            // checks west square;
            if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) {
                total++;
            }
            // checks north-east square;
            if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) {
                total++;
            }
            // checks north square;
            if (i > 10 && squares[i - width].classList.contains('bomb')) {
                total++;
            }
            // checks north-west square;
            if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')){
                total++;
            }
            // checks east square;
            if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) {
                total++;
            }
            // checks south-west square;
            if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) {
                total++;
            }
            // checks south-east square;
            if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) {
                total++;
            }
            // checks south square;
            if (i < 89 && squares[i + width].classList.contains('bomb')) {
                total++;
            }
            squares[i].setAttribute('data', total);
        }
    }
}

function addFlag(square) { // user right click;
    // if (isGameOver) {
    //     return
    // }
    if (!square.classList.contains('checked')) {
        if (!square.classList.contains('flaged')) {
            square.classList.add('flaged');
            square.innerHTML = '<i class="flagged fas fa-flag"></i>';
            bombLeft--;
            bombCounter(bombLeft);
            flagAmount++;
            checkWin();
        } else {
            square.classList.remove('flaged');
            square.innerHTML = '';
            bombLeft++;
            bombCounter(bombLeft);
            flagAmount--;
        }
    }
}

function click(square){ // regular user click function; 
    let currentId = square.id;
    // if (isGameOver) {
    //     return
    // }
    if (square.classList.contains('checked') || square.classList.contains('flaged')) {
        return
    }
    if (square.classList.contains('bomb')) {
        gameOver(square);
        square.classList.add('boom');
        return
    } else {
        let total = square.getAttribute('data');
        if (total != 0) {
            square.classList.add('checked'); 
            square.innerHTML = '<span class="bombNumber fa-stack fa-1x"><i class="far fa-circle fa-stack-2x"></i><strong class="fa-stack-1x circle-text">'+ total +'</strong></span>'
            return
        }
        checkSquare(square, currentId); 
    }
    square.classList.add('checked'); 
}

function checkSquare(square, currentId) { // recursion for finding the closest square with bombs around;
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width - 1);

    setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1].id;
            const newSquare = document.getElementById(newId);
            click(newSquare); 
        }
        if (currentId > 9 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1 - width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare); 
        }
        if (currentId > 10) {
            const newId = squares[parseInt(currentId) - width].id; 
            const newSquare = document.getElementById(newId);
            click(newSquare); 
        }
        if (currentId > 11 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1 - width].id; 
            const newSquare = document.getElementById(newId);
            click(newSquare); 
        }
        if (currentId < 98 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1].id; 
            const newSquare = document.getElementById(newId);
            click(newSquare); 
        }
        if (currentId < 90 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1 + width].id; 
            const newSquare = document.getElementById(newId);
            click(newSquare); 
        }
        if (currentId < 88 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1 + width].id; 
            const newSquare = document.getElementById(newId);
            click(newSquare); 
        }
        if (currentId < 89) {
            const newId = squares[parseInt(currentId) + width].id; 
            const newSquare = document.getElementById(newId);
            click(newSquare); 
        }
    }, 10)
}

function gameOver() {
    document.querySelector('.resultText').innerText = 'Sorry, You lose..';
    resultActive();
    console.log('Game Over!');
    // isGameOver = true;

    squares.forEach(square => { // showing every single bomb in the board;
        if (square.classList.contains('bomb')) {
            square.innerHTML = '<i class="boom fas fa-bomb"></i>';
            square.classList.add('boom');
        }
    })
}

function checkWin() {
    let match = 0;
    for (let i = 0; i < squares.length; i++) {
        // checks if same square contains flaged and bomb classes;
        if (squares[i].classList.contains('flaged') && squares[i].classList.contains('bomb')) {
            match++;
        } 
        if (match == bombAmount) {
            document.querySelector('.resultText').innerText = 'Congrats! You WIN!';
            resultActive();
            console.log('Win!');
        }
    }
}

function bombCounter(bombLeft) { // shows number of bombs left in the board according to amount of flaged squares;
    document.querySelector('.bomb_counter').innerHTML = bombLeft;
}