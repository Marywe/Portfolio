const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const STARTINGPOS = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

let snake = [...STARTINGPOS];
let dx = 10;
let dy = 0;
let food = { x: 200, y: 200 };
let punctuation = 0;
let playing = true;
let restarted = false;

function drawFood() {
  ctx.fillStyle = 'lightcoral';
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.strokeStyle = 'red';
  ctx.strokeRect(food.x, food.y, 10, 10);
}

function drawRestarting() {
  ctx.font = '48px monospace';
  ctx.fillStyle = 'black';
  ctx.textAlign = "center";
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
  ctx.font = '28px monospace';
  ctx.textAlign = "center";
  ctx.fillText("Restarting in 5 secs", canvas.width / 2, canvas.height / 2 + 35);

  if (!restarted) {
    setTimeout(Restart, 5000);
    restarted = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (playing && !paused) {
    restarted = false;

    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = (i === 0) ? 'green' : 'mediumseagreen';
      ctx.fillRect(snake[i].x, snake[i].y, 10, 10);

      ctx.strokeStyle = 'darkgreen';
      ctx.strokeRect(snake[i].x, snake[i].y, 10, 10);
    }

    drawFood();



    if (snake.length == 0) return;
    if (snake[0].x === food.x && snake[0].y === food.y) {
      food = {
        x: Math.floor(Math.random() * 49) * 10,
        y: Math.floor(Math.random() * 49) * 10
      };

      ctx.font = '48px monospace';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText('Yum!', canvas.offsetWidth / 2, 150);

      punctuation += 50;
    }
    else { snake.pop(); }

    let newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    //GameOver
    if (newHead.x < 0 || newHead.x > canvas.width - 10
      || newHead.y < 0 || newHead.y > canvas.height - 10) {
      GameOver();
      return;
    }
    for (let i = 1; i < snake.length; i++) {
      if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
        GameOver();
        return;
      }
    }


    snake.unshift(newHead);

  }
  else if (paused) { drawPauseMenu(); }
  else { drawRestarting(); }

  ctx.font = '32px monospace';
  ctx.fillStyle = 'black';
  ctx.fillText(punctuation, 75, 470);

}

function main() {
  setInterval(draw, 90);
}

function Restart() {
  snake = [...STARTINGPOS];
  dx = 10;
  dy = 0;
  food = { x: 200, y: 200 };
  punctuation = 0;
  playing = true;
}

function GameOver() {
  playing = false;
  clearInterval(draw);
}

document.addEventListener('keydown', function (event) {
  if ((event.code === 'ArrowLeft' || event.code === 'KeyA') && dx === 0) {
    dx = -10;
    dy = 0;
  } else if ((event.code === 'ArrowUp' || event.code === 'KeyW') && dy === 0) {
    dx = 0;
    dy = -10;
  } else if ((event.code === 'ArrowRight' || event.code === 'KeyD') && dx === 0) {
    dx = 10;
    dy = 0;
  } else if ((event.code === 'ArrowDown' || event.code === 'KeyS') && dy === 0) {
    dx = 0;
    dy = 10;
  }
});

window.onload = main();
