import { Mouse } from "../controls/Mouse";
import { Edge } from "../elements/Edge";
import { Vertex } from "../elements/Vertex";
import { loadHTMLGUI } from "../main";
import { incrementChar, randomIntInRange } from "../utils";
import { useDijkstra } from "../utils/dijkstra";

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
        x ?? randomIntInRange(100, this.canvas.width - 100),
        y ?? randomIntInRange(100, this.canvas.height - 100)
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
        vertex.selected = true;
      } else {
        vertex.selected = false;
      }
      vertex.render(ctx);
    });

    this.edges.forEach((edge) => (edge.highlighted = false));
    this.vertices.forEach((vertex) => (vertex.highlighted = false));

    if (this.selectedVertices.length >= 2) {
      const [start, end] = this.selectedVertices;
      const { path } = useDijkstra(this.vertices, start, end);

      path.forEach((vertex, index) => {
        const v2 = this.vertices.find((v) => v === path[index + 1]);
        const edge = this.edges.find(
          (e) =>
            (e.vertex1 === vertex && e.vertex2 === v2) ||
            (e.vertex2 === vertex && e.vertex1 === v2)
        );

        if (!edge) return;
        edge.highlighted = true;
        if (vertex !== start && vertex !== end) vertex.highlighted = true;
      });
    }
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
