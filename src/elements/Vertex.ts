import { Graph } from "../graph/Graph";
import { isVertexCollidedWithMouse } from "../utils";
import { color } from "../utils/constants";

export class Vertex {
  name: string;
  x: number;
  y: number;
  radius: number = 20;
  maxRadius: number = 40;
  hoverRadius: number = 45;
  isMouseCollided: boolean = false;
  selected: boolean = false;
  highlighted: boolean = false;

  neighbors: { vertex: Vertex; weight: number }[] = [];
  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle =
      this.highlighted || !this.selected
        ? color.vertex.default.fill
        : color.vertex.selected.fill;
    ctx.fill();
    ctx.strokeStyle =
      this.selected || this.highlighted
        ? color.vertex.selected.stroke
        : color.vertex.default.stroke;
    ctx.lineWidth = this.highlighted ? 3 : 1;
    ctx.stroke();

    // Label
    ctx.font = "28px sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.fillText(this.name, this.x, this.y);
  }

  update(graph: Graph) {
    const mouse = graph.mouse;
    this.isMouseCollided = isVertexCollidedWithMouse(this, {
      x: mouse.x,
      y: mouse.y,
    });
    if (this.radius < this.maxRadius && !this.isMouseCollided) {
      this.radius += (this.maxRadius - this.radius) * 0.3;
    }

    // mouse collission
    if (this.isMouseCollided) {
      if (this.radius < this.hoverRadius) {
        this.radius += (this.hoverRadius - this.radius) * 0.3;
      }

      if (mouse.clicked && graph.mode === "edit") {
        if (!graph.vertexOnHold) graph.vertexOnHold = this;
        if (graph.vertexOnHold === this) {
          this.x = mouse.x;
          this.y = mouse.y;
        }
      } else {
        graph.vertexOnHold = null;
      }
    } else {
      if (this.radius > this.maxRadius) {
        this.radius -= (this.radius - this.maxRadius) * 0.3;
      }
    }
  }
}
