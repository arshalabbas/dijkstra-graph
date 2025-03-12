import { Graph } from "./graph/Graph";
import "./style.css";
import { drawGrid } from "./utils";

const canvas = document.getElementById("graph") as HTMLCanvasElement;

const addButton = document.getElementById("add-btn") as HTMLButtonElement;

// Vertices
const verticesSection = document.querySelector(
  "#vertices-section ul"
) as HTMLDivElement;

// Edges
const edgesSection = document.querySelector(
  "#edges-section ul"
) as HTMLDivElement;

// Edge
const edgeV1 = document.getElementById("edge-v1") as HTMLInputElement;
const edgeV2 = document.getElementById("edge-v2") as HTMLInputElement;
const edgeWeight = document.getElementById("edge-weight") as HTMLInputElement;
const edgeButton = document.getElementById("add-edge-btn") as HTMLButtonElement;

function init() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

window.addEventListener("resize", init);

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const graph = new Graph(canvas);

graph.addVertex();
loadHTMLGUI();
addButton.addEventListener("click", () => {
  graph.addVertex();
  loadHTMLGUI();
});

edgeButton.addEventListener("click", () => {
  const v1 = graph.vertices.find((vertex) => vertex.name === edgeV1.value);
  const v2 = graph.vertices.find((vertex) => vertex.name === edgeV2.value);
  if (!v1 || !v2) return;
  graph.addEdge(v1, v2, +edgeWeight.value);
  loadHTMLGUI();
});

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(canvas, ctx);
  graph.render(ctx);
  requestAnimationFrame(tick);
}

tick();
init();

function loadHTMLGUI() {
  // Loading vertices to the HTML GUI
  verticesSection.innerHTML = "";
  const verticesLabels = graph.vertices.map((vertex) => vertex.name).reverse();
  verticesLabels.forEach((label) => {
    const vertexLitstItem = document.createElement("li");
    vertexLitstItem.innerHTML = `
    <div class="flex items-center gap-x-4 w-full bg-white rounded-lg p-2">
    <div class="size-5 rounded-full bg-red-500/60 border border-red-500"></div>
    <span>${label}</span>
    </div>
    `;
    verticesSection.appendChild(vertexLitstItem);
  });

  // Loading edges to the HTML GUI
  edgesSection.innerHTML = "";
  const edges = graph.edges.map((edge) => ({
    v1: edge.vertex1,
    v2: edge.vertex2,
    weight: edge.weight,
  }));

  edges.forEach((edge) => {
    const edgeLitstItem = document.createElement("li");
    edgeLitstItem.innerHTML = `
    <div class="flex items-center gap-x-4 w-full bg-white rounded-lg p-2">
    <span>${edge.v1.name} - ${edge.v2.name} (weight: ${edge.weight})</span>
    </div>
    `;
    edgesSection.appendChild(edgeLitstItem);
  });
}
