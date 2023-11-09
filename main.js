const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const bounceCounterElement = document.getElementById('bounceCounter');

function resetGame() {
  bounceCounter = 0;
  bounceCounterElement.textContent = bounceCounter;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 2; // Reset the ball's horizontal velocity
  ball.dy = 2; // Reset the ball's vertical velocity
  ball.bouncing = false;
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  moveBall();
  bounceCounterElement.textContent = bounceCounter;
}

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  dx: 2,
  dy: 2,
  color: 'blue',
};

let bounceCounter = 0;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Check for collisions with canvas boundaries
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
    bounceCounter++; // Increment bounce counter
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
    bounceCounter++; // Increment bounce counter
  }
}

function clickToMove(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  ball.x = mouseX;
  ball.y = mouseY;
}

canvas.addEventListener('click', clickToMove);
resetButton.addEventListener('click', resetGame);

function gameLoop() {
  updateGame();
  requestAnimationFrame(gameLoop);
}

gameLoop();
