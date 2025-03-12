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

    // Add vertex to the selectedVertices
    this.canvas.addEventListener("click", () => {
      if (this.graph.mode === "edit") return;
      const clickedVertex = this.graph.vertices.find((v) => v.isMouseCollided);

      if (clickedVertex) {
        if (this.graph.selectedVertices.includes(clickedVertex)) {
          const indexOfVertex =
            this.graph.selectedVertices.indexOf(clickedVertex);
          this.graph.selectedVertices.splice(indexOfVertex, 1);
        } else {
          if (this.graph.selectedVertices.length < 2)
            this.graph.selectedVertices.push(clickedVertex);
        }
      }
      console.log(this.graph.selectedVertices);
    });
  }
}
