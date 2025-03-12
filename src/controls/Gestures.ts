import { Graph } from "../graph/Graph";

export class Gestures {
  canvas: HTMLCanvasElement;
  graph: Graph;
  constructor(canvas: HTMLCanvasElement, graph: Graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.canvas.addEventListener("dblclick", (e) => {
      const x = e.clientX - this.canvas.offsetLeft;
      const y = e.clientY - this.canvas.offsetTop;
      this.graph.addVertex(x, y);
    });
  }
}
