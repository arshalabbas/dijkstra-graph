import { Mouse } from "../controls/Mouse";
import { Edge } from "../elements/Edge";
import { Vertex } from "../elements/Vertex";
import { loadHTMLGUI } from "../main";
import { incrementChar, randomIntInRange } from "../utils";
import { color } from "../utils/constants";

export class Graph {
  canvas: HTMLCanvasElement;
  vertices: Vertex[] = [];
  edges: Edge[] = [];
  lastName: string = "";
  mouse: Mouse;
  vertexOnHold: Vertex | null = null;
  selectedVertices: Vertex[] = [];
  mode: "edit" | "select" = "edit";

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.mouse = new Mouse(canvas);
  }

  addVertex(x?: number, y?: number) {
    this.lastName = this.lastName === "" ? "A" : incrementChar(this.lastName);
    this.vertices.push(
      new Vertex(
        this.lastName,
        x ?? randomIntInRange(0, this.canvas.width),
        y ?? randomIntInRange(0, this.canvas.height)
      )
    );
    loadHTMLGUI();
  }

  addEdge(vertex1: Vertex, vertex2: Vertex, weight: number) {
    vertex1.neighbors.push({ vertex: vertex2, weight });
    vertex2.neighbors.push({ vertex: vertex1, weight });
    this.edges.push(new Edge(vertex1, vertex2, weight));
    loadHTMLGUI();
  }

  render(ctx: CanvasRenderingContext2D) {
    this.edges.forEach((edge) => {
      edge.render(ctx);
    });

    this.vertices.forEach((vertex) => {
      if (this.selectedVertices.includes(vertex)) {
        vertex.color.fill = color.vertex.selected.fill;
        vertex.color.stroke = color.vertex.selected.stroke;
      } else {
        vertex.color.fill = color.vertex.default.fill;
        vertex.color.stroke = color.vertex.default.stroke;
      }
      vertex.render(ctx);
    });
  }

  update() {
    this.vertices.forEach((vertex) => {
      vertex.update(this);
    });

    // cursor update
    if (this.vertices.filter((v) => v.isMouseCollided).length > 0) {
      if (this.mouse.clicked && this.mode === "edit")
        this.canvas.style.cursor = "grabbing";
      else this.canvas.style.cursor = this.mode === "edit" ? "grab" : "pointer";
    } else {
      this.canvas.style.cursor = "default";
    }
  }
}
