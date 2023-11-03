const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 5,
    dx: 0,
    dy: 0,
};

let bounceCount = 0;
const bounceCounter = document.getElementById('bounceCounter');

function updateBounceCount() {
    bounceCounter.innerText = `Bounces: ${bounceCount}`;
}

canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    ball.dx = (mouseX - ball.x) / ball.speed;
    ball.dy = (mouseY - ball.y) / ball.speed;
});

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    bounceCount = 0; // Reset the bounce count
    updateBounceCount(); // Update the displayed bounce count
});

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
        bounceCount++; // Increment the bounce count
        updateBounceCount(); // Update the displayed bounce count
    }

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        bounceCount++; // Increment the bounce count
        updateBounceCount(); // Update the displayed bounce count
    }
}

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'teal';
    ctx.fill();
    ctx.closePath();
}

function gameLoop() {
    drawBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();
