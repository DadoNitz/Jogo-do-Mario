const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
const scoreDisplay = document.querySelector('.score');
const highScoreDisplay = document.querySelector('.high-score');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let loop;

// Função para atualizar o high score na tela
const updateHighScoreDisplay = () => {
    highScoreDisplay.textContent = `High Score: ${highScore}`;
}

// Função para atualizar o score na tela
const updateScoreDisplay = () => {
    scoreDisplay.textContent = `Score: ${score}`;
}

const updateScore = () => {
    score++;
    updateScoreDisplay();
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        updateHighScoreDisplay();
    }
}

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
    updateScore();
}

const checkCollision = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
        clearInterval(loop);

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'assets/imgs/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '35px';

        cloud.style.animation = 'cloud 20s infinite linear';
        cloud.style.left = `${cloudPosition}px`;

        gameOver.style.visibility = 'visible';
    }
}

const restart = () => {
    gameOver.style.visibility = 'hidden';

    pipe.style.animation = 'pipe-animations 1.5s infinite linear';
    pipe.style.left = ``;

    mario.src = 'assets/imgs/mario.png';
    mario.style.width = '130px';
    mario.style.bottom = '0px';
    mario.style.marginLeft = '';
    mario.style.animation = '';

    cloud.style.left = ``;

    score = 0;
    updateScoreDisplay(); // Atualizar score na reinicialização
    loop = setInterval(() => {
        checkCollision();
    }, 10);
}

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

restartButton.addEventListener('click', restart);

// Inicialização do jogo
updateHighScoreDisplay(); // Exibir high score imediatamente
restart();
