import { Vertex } from "../elements/Vertex";

export class PriorityQueue {
  queue: { vertex: Vertex; priority: number }[] = [];

  enqueue(vertex: Vertex, priority: number) {
    this.queue.push({ vertex, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift()?.vertex;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
