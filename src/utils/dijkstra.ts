import { Vertex } from "../elements/Vertex";
import { PriorityQueue } from "../graph/PriorityQueue";

export const useDijkstra = (vertices: Vertex[], start: Vertex, end: Vertex) => {
  const distances: Record<string, number> = {};
  const previousVertex: Record<string, Vertex | null> = {};
  const pq = new PriorityQueue();

  vertices.forEach((vertex) => {
    distances[vertex.name] = vertex === start ? 0 : Infinity;
    previousVertex[vertex.name] = null;
    pq.enqueue(vertex, distances[vertex.name]);
  });

  while (!pq.isEmpty()) {
    const smallestVertex = pq.dequeue();
    if (!smallestVertex) break;

    if (smallestVertex === end) {
      const path: Vertex[] = [];
      let temp: Vertex | null = end;
      while (temp) {
        path.unshift(temp);
        temp = previousVertex[temp.name];
      }

      return { path, distance: distances[end.name] };
    }

    smallestVertex.neighbors.forEach((neighbor) => {
      const newDistance = distances[smallestVertex.name] + neighbor.weight;
      if (newDistance < distances[neighbor.vertex.name]) {
        distances[neighbor.vertex.name] = newDistance;
        previousVertex[neighbor.vertex.name] = smallestVertex;
        pq.enqueue(neighbor.vertex, newDistance);
      }
    });
  }
  return { path: [], distance: Infinity };
};
