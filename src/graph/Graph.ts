import { Edge } from "../elements/Edge";
import { Vertex } from "../elements/Vertex";
import { incrementChar, randomIntInRange } from "../utils";

export class Graph {
  // TODO: will change it later
  canvas: HTMLCanvasElement;
  vertices: Vertex[] = [];
  edges: Edge[] = [];
  lastName: string = "";

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  addVertex() {
    this.lastName = this.lastName === "" ? "A" : incrementChar(this.lastName);
    this.vertices.push(
      new Vertex(
        this.lastName,
        randomIntInRange(0, this.canvas.width),
        randomIntInRange(0, this.canvas.height)
      )
    );
  }

  addEdge(vertex1: Vertex, vertex2: Vertex, weight: number) {
    vertex1.neighbors.push({ vertex: vertex2, weight });
    vertex2.neighbors.push({ vertex: vertex1, weight });
    this.edges.push(new Edge(vertex1, vertex2, weight));
  }

  render(ctx: CanvasRenderingContext2D) {
    this.vertices.forEach((vertex) => {
      vertex.render(ctx);
    });

    this.edges.forEach((edge) => {
      edge.render(ctx);
    });
  }
}
