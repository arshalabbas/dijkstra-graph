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
addButton.addEventListener("click", () => {
  graph.addVertex();
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
  if (+edgeWeight.value < 0) return alert("Edge weight cannot be negative.");
  graph.addEdge(vertices[0], vertices[1], +edgeWeight.value);
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
  const vertices = graph.vertices;
  [...vertices].reverse().forEach((vertex) => {
    const vertexLitstItem = document.createElement("li");
    const isSelected = graph.selectedVertices.includes(vertex);
    vertexLitstItem.innerHTML = `
    <div class="flex items-center gap-x-4 w-full bg-white rounded-lg p-2 data-label="${
      vertex.name
    }">
    <div class="size-5 rounded-full ${
      isSelected ? "bg-blue-300" : "bg-red-300"
    }  border ${isSelected ? "border-blue-500" : "border-red-500"}"></div>
    <span>${vertex.name}</span>
    </div>
    `;
    verticesSection.appendChild(vertexLitstItem);
  });

  vertexSelectors.forEach((selector) => {
    selector.innerHTML = "";
    vertices
      .map((vertex) => vertex.name)
      .forEach((label) => {
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
