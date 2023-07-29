var paused = false;

window.addEventListener('keydown', function(event) {
    if (event.code === 'KeyP' && !paused) 
    {
      paused = true;
    }
    else if (event.code === 'KeyP' && paused) 
    {
      paused = false;
    }
});

function drawPauseMenu()
{
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
    ctx.font = "30px sans-serif";
    ctx.fillText("Press P to continue", canvas.width / 2, canvas.height / 2 + 40);

}
