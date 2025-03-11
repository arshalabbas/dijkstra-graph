import "./style.css";
import { drawGrid } from "./utils";

const canvas = document.getElementById("graph") as HTMLCanvasElement;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

console.log(canvas.width, canvas.height);

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(canvas, ctx);
  requestAnimationFrame(tick);
}

tick();
