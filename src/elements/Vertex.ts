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
  color: { fill: string; stroke: string } = {
    fill: color.vertex.default.fill,
    stroke: color.vertex.default.stroke,
  };

  neighbors: { vertex: Vertex; weight: number }[] = [];
  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color.fill;
    ctx.fill();
    ctx.strokeStyle = this.color.stroke;
    ctx.lineWidth = 1;
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
