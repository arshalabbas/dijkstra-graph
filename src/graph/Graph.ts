import { Vertex } from "../elements/Vertex";
import { incrementChar, randomIntInRange } from "../utils";

export class Graph {
  // TODO: will change it later
  canvas: HTMLCanvasElement;
  vertices: Vertex[] = [];
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

  render(ctx: CanvasRenderingContext2D) {
    this.vertices.forEach((vertex) => {
      vertex.render(ctx);
    });
  }
}
