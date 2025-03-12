import { Gestures } from "./controls/Gestures";
import { Vertex } from "./elements/Vertex";
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

// Add Edge Controls
const vertexSelectors =
  document.querySelectorAll<HTMLSelectElement>(".vertex-select");
const edgeWeight = document.getElementById("edge-weight") as HTMLInputElement;
const edgeButton = document.getElementById("add-edge-btn") as HTMLButtonElement;

// Mode Selector
const modeSelector = document.getElementById("mode") as HTMLInputElement;

function init() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

window.addEventListener("resize", init);

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const graph = new Graph(canvas);

graph.addVertex();
// loadHTMLGUI();
addButton.addEventListener("click", () => {
  graph.addVertex();
  // loadHTMLGUI();
});

modeSelector.addEventListener("change", (e) => {
  graph.mode = (e.target as HTMLInputElement).checked ? "select" : "edit";
});

edgeButton.addEventListener("click", () => {
  let vertices: Vertex[] = [];
  vertexSelectors.forEach((selector) => {
    const vertex = graph.vertices.find(
      (vertex) => vertex.name === selector.value
    );
    if (!vertex) return;
    vertices.push(vertex);
  });
  graph.addEdge(vertices[0], vertices[1], +edgeWeight.value);
  // loadHTMLGUI();
});

new Gestures(canvas, graph);

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(canvas, ctx);
  graph.render(ctx);
  graph.update();
  requestAnimationFrame(tick);
}

tick();
init();

export function loadHTMLGUI() {
  // Loading vertices to the HTML GUI
  verticesSection.innerHTML = "";
  const verticesLabels = graph.vertices.map((vertex) => vertex.name);
  [...verticesLabels].reverse().forEach((label) => {
    const vertexLitstItem = document.createElement("li");
    vertexLitstItem.innerHTML = `
    <div class="flex items-center gap-x-4 w-full bg-white rounded-lg p-2">
    <div class="size-5 rounded-full bg-red-500/60 border border-red-500"></div>
    <span>${label}</span>
    </div>
    `;
    verticesSection.appendChild(vertexLitstItem);
  });

  vertexSelectors.forEach((selector) => {
    selector.innerHTML = "";
    verticesLabels.forEach((label) => {
      const vertexOption = document.createElement("option");
      vertexOption.textContent = label;
      vertexOption.value = label;
      selector.appendChild(vertexOption);
    });
  });

  // Loading edges to the HTML GUI
  edgesSection.innerHTML = "";
  const edges = graph.edges.map((edge) => ({
    v1: edge.vertex1,
    v2: edge.vertex2,
    weight: edge.weight,
  }));

  [...edges].reverse().forEach((edge) => {
    const edgeLitstItem = document.createElement("li");
    edgeLitstItem.innerHTML = `
    <div class="flex items-center gap-x-4 w-full bg-white rounded-lg p-2">
    <span>${edge.v1.name} - ${edge.v2.name} (weight: ${edge.weight})</span>
    </div>
    `;
    edgesSection.appendChild(edgeLitstItem);
  });
}
