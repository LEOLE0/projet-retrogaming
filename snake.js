const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const gridCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let currentScore = 0;
let bestScore = 0;
let growthCounter = 0;

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  currentScore = 0;
  growthCounter = 0;
  updateScores();
  placeFood();
}

function placeFood() {
  food.x = Math.floor(Math.random() * gridCount);
  food.y = Math.floor(Math.random() * gridCount);
}

function updateScores() {
  document.getElementById('currentScore').innerText = `Score actuel : ${currentScore}`;
  document.getElementById('bestScore').innerText = `Meilleur score : ${bestScore}`;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.unshift({ x: snake[0].x + direction.x, y: snake[0].y + direction.y });
  
  if (snake[0].x === food.x && snake[0].y === food.y) {
    currentScore++;
    bestScore = Math.max(currentScore, bestScore);
    growthCounter += 1;
    placeFood();
  }

  if (growthCounter === 0) {
    snake.pop();
  } else {
    growthCounter--;
  }

  if (
    snake[0].x < 0 || snake[0].x >= gridCount ||
    snake[0].y < 0 || snake[0].y >= gridCount ||
    snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    resetGame();
  }

  drawRect(food.x, food.y, '#f08080'); // Salmon

  snake.forEach((segment, index) => {
    drawRect(segment.x, segment.y, index === 0 ? '#0f3460' : '#6a0572'); // Head: Bleu nuit, Body: Mauve
  });

  updateScores();
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction.y === 0) {
      direction = { x: 0, y: -1 };
      event.preventDefault();
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
      direction = { x: 0, y: 1 };
      event.preventDefault();
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
      direction = { x: -1, y: 0 };
      event.preventDefault();
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
      direction = { x: 1, y: 0 };
      event.preventDefault();
    }
  });

resetGame();
setInterval(gameLoop, 100);