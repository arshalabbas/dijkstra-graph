export function drawGrid(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  for (let i = 20; i < canvas.width; i += 20) {
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let i = 20; i < canvas.width; i += 20) {
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}
