const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var P1img = document.getElementById("P1img");
var P2img = document.getElementById("P2img");

let stoneSpeed;
const stoneCount = 30;
let stonesNow = 0;
let stones = [];

let p1Y = 550;
let p1X = 130 - 25;
let p2Y = 550;
let p2X = 270 - 25;
const pWidth = 10;
const pHeight = 10;
const playerSpeed = 1;

let keyDown = {
  w: false,
  s: false,
  up: false,
  down: false
};

let winScreen = false;
function start() {
  p1Y = 550;
  p1X = 130 - 25;
  p2Y = 550;
  p2X = 270 - 25;
  stonesNow = 0;
  createAsteroiods();
  gameLoop();
}

function movePlayer() {
  //P1
  if (keyDown.w) {
    if (p1Y > 0 + 50) p1Y -= playerSpeed;
    else win();
  }
  if (keyDown.s) {
    if (p1Y < 550) p1Y += playerSpeed;
  }

  //P2
  if (keyDown.up) {
    if (p2Y > 0 + 50) p2Y -= playerSpeed;
    else win();
  }
  if (keyDown.down) {
    if (p2Y < 550) p2Y += playerSpeed;

  }


  for (let i = 0; i < stonesNow; i++) {
    if (collides(p1X, p1Y, stones[i])) {
      p1Y = 550;
    }

    if (collides(p2X, p2Y, stones[i])) {
      p2Y = 550;
    }
  }
}

function asteroidsMoving() {
  for (let i = 0; i < stones.length; i++) {
    stones[i].x += stones[i].speed;

    if (stones[i].x < -5 || stones[i].x > canvas.width) {
      stones.splice(i, 1);
      --stonesNow;
      createAsteroiods();
    }
  }
}

function collides(x, y, b) {
  if (!b) return false;

  return (x < b.x + 4 && x + 50 > b.x && y < b.y + 4 && y + 16 > b.y);

}

function createAsteroiods() {
  for (let index = stonesNow; index < stoneCount; index++) {
    let xStone = Math.random();
    let speedMult = 1;

    //Goes right
    if (xStone > 0.5) {
      xStone = -5;
    }
    else {
      xStone = canvas.width;
      speedMult = -1;
    }

    var randcolor = Math.floor(Math.random() * ((90 - 50) + 50));
    stones.push({
      x: xStone,
      y: Math.floor(Math.random() * (525 - 75) + 75),
      width: (Math.random() * (7 - 4) + 4),
      speed: (Math.random() * (0.6 - 0.2) + 0.2) * speedMult,
      color: 'rgb(' + randcolor + ',' + randcolor + ',' + randcolor + ')',
    });

    ++stonesNow;
  }

}

function win() {
  winScreen = true;
}

function drawGameOver() {

  ctx.font = "48px sans-serif";
  ctx.fillText("Game Over!", canvas.width / 2 - 180, canvas.height / 2);

}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(P1img, p1X, p1Y, 50, 50);
  ctx.drawImage(P2img, p2X, p2Y, 50, 50);


  for (let i = 0; i < stoneCount; i++) {
    ctx.beginPath();
    ctx.arc(stones[i].x, stones[i].y, stones[i].width, 0, 2 * Math.PI);


    ctx.fillStyle = stones[i].color;
    ctx.fill();
    ctx.closePath();
  }


  ctx.fillStyle = "black";
  ctx.rect(canvas.width / 2, 50, 2, 500);
  ctx.fill();

  drawFinishLine();

}
function drawFinishLine() {
  const lineLength = 20; // Length of each square in the line
  const lineCount = Math.ceil(canvas.width / lineLength); // Number of squares needed to fill the canvas width
  const lineOffsetY = 20; // Vertical offset for each line

  for (let line = 0; line < 3; line++) {
    for (let i = 0; i < lineCount; i++) {
      const x = i * lineLength;
      const y = line * lineOffsetY;

      // Draw black and white squares in an alternating pattern
      if ((line + i) % 2 === 0) {
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = "white";
      }

      ctx.fillRect(x, y, lineLength, lineLength);
    }
  }
}
function gameLoop() {
  if (!winScreen && !paused) {
    movePlayer();
    asteroidsMoving();
  }

  draw();

  if (paused) {
    drawPauseMenu();
  }

  if (winScreen) {
    drawGameOver();
  }

  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', function (event) {
  if (event.key === 'w') keyDown.w = true;
  else if (event.key === 's') keyDown.s = true;
  if (event.key === "ArrowDown") keyDown.down = true;
  else if (event.key === "ArrowUp") keyDown.up = true;
});

window.addEventListener('keyup', function (event) {
  if (event.key === 'w') keyDown.w = false;
  else if (event.key === 's') keyDown.s = false;
  if (event.key === "ArrowDown") keyDown.down = false;
  else if (event.key === "ArrowUp") keyDown.up = false;
});

window.onload = start();