import { Vertex } from "../elements/Vertex";

export function drawGrid(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  for (let i = 20; i < canvas.width; i += 20) {
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let i = 20; i < canvas.width; i += 20) {
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}

export function randomIntInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function incrementChar(char: string): string {
  const increment = (c: string): string => {
    return c === "Z" ? "A" : String.fromCharCode(c.charCodeAt(0) + 1);
  };

  let result = "";
  let carry = true;

  for (let i = char.length - 1; i >= 0; i--) {
    if (carry) {
      result = increment(char[i]) + result;
      carry = char[i] === "Z";
    } else {
      result = char[i] + result;
    }
  }

  if (carry) {
    result = "A" + result;
  }

  return result;
}

export function isVertexCollidedWithMouse(
  vertex: Vertex,
  mouse: { x: number; y: number }
): boolean {
  const dx = vertex.x - mouse.x;
  const dy = vertex.y - mouse.y;
  const distance = Math.hypot(dx, dy);

  if (distance < vertex.radius) return true;
  return false;
}
