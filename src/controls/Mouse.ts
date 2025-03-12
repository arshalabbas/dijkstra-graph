export class Mouse {
  x: number = 0;
  y: number = 0;
  clicked: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener("mousemove", (e) => {
      this.x = e.clientX - canvas.getBoundingClientRect().left;
      this.y = e.clientY - canvas.getBoundingClientRect().top;
    });

    canvas.addEventListener("mousedown", () => {
      this.clicked = true;
    });

    canvas.addEventListener("mouseup", () => {
      this.clicked = false;
    });
  }
}
