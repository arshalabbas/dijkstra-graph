export class Vertex {
  name: string;
  x: number;
  y: number;
  radius: number = 40;
  color: { fill: string; stroke: string } = {
    fill: "rgba(255, 0, 0, 0.5)",
    stroke: "rgba(255, 0, 0, 1)",
  };
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
  }
}
