import { Graph } from "./graph/Graph";
import "./style.css";
import { drawGrid } from "./utils";

const canvas = document.getElementById("graph") as HTMLCanvasElement;

const addButton = document.getElementById("add-btn") as HTMLButtonElement;
const verticesContainer = document.getElementById("vertices") as HTMLDivElement;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

console.log(canvas.width, canvas.height);

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const graph = new Graph(canvas);

graph.addVertex();
loadVerticesToUI();
addButton.addEventListener("click", () => {
  graph.addVertex();
  loadVerticesToUI();
});

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(canvas, ctx);
  graph.render(ctx);
  requestAnimationFrame(tick);
}

tick();

function loadVerticesToUI() {
  verticesContainer.innerHTML = graph.vertices
    .map((vertex) => vertex.name)
    .join(", ");
}
