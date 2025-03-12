import { Mouse } from "../controls/Mouse";
import { Edge } from "../elements/Edge";
import { Vertex } from "../elements/Vertex";
import { loadHTMLGUI } from "../main";
import { incrementChar, randomIntInRange } from "../utils";

export class Graph {
  // TODO: will change it later
  canvas: HTMLCanvasElement;
  vertices: Vertex[] = [];
  edges: Edge[] = [];
  lastName: string = "";
  mouse: Mouse;
  vertexOnHold: Vertex | null = null;

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
      vertex.render(ctx);
    });
  }

  update() {
    this.vertices.forEach((vertex) => {
      vertex.update(this);
    });

    // cursor update
    if (this.vertices.filter((v) => v.isMouseCollided).length > 0) {
      if (this.mouse.clicked) this.canvas.style.cursor = "grabbing";
      else this.canvas.style.cursor = "grab";
    } else {
      this.canvas.style.cursor = "default";
    }
  }
}
