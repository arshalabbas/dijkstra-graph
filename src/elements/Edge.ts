import { Vertex } from "./Vertex";

export class Edge {
  vertex1: Vertex;
  vertex2: Vertex;
  weight: number;

  constructor(vertex1: Vertex, vertex2: Vertex, weight: number) {
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.weight = weight;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.moveTo(this.vertex1.x, this.vertex1.y);
    ctx.lineTo(this.vertex2.x, this.vertex2.y);
    ctx.stroke();

    // Weight text
    const midX = (this.vertex1.x + this.vertex2.x) / 2;
    const midY = (this.vertex1.y + this.vertex2.y) / 2;
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.weight.toString(), midX + 18, midY + 18);
  }
}
