export class Graph {
  neighbors: { [key: string]: string[] } = {}

  addEdge(u: string, ...values: string[]) {
    this.neighbors[u] = [...(this.neighbors[u] || []), ...values]
  }

  shortestPath(source: string, target: string): string[] | null {
    if (source === target) {
      return [source]
    }

    const queue = [source]
    const visited = { [source]: true }
    const predecessor: { [k: string]: string } = {}
    let tail = 0

    while (tail < queue.length) {
      let u = queue[tail++]
      const neighbors = this.neighbors[u]
      for (const v of neighbors) {
        if (visited[v]) {
          continue
        }
        visited[v] = true
        if (v === target) {
          const path = [v]
          while (u !== source) {
            path.push(u)
            u = predecessor[u]
          }
          path.push(u)
          path.reverse()
          return path
        }
        predecessor[v] = u
        queue.push(v)
      }
    }
    return null
  }
}

// export function bfs(graph: Graph, start: string, end: string) {
//   const queue: string[] = [start]
//   const visited: string[] = [start]
//   while (queue.length > 0) {
//     const v = queue.shift() as string
//     if (v === end) {
//       return v
//     }
//     for (const w of graph.neighbors[v] || []) {
//       if (!visited.includes(w)) {
//         visited.push(w)
//         queue.push(w)
//       }
//     }
//   }
// }

// export function shortestPath(graph: Graph, source: string, target: string) {
//   if (source === target) {
//     return source
//   }

//   const queue = [source]
//   const visited = { [source]: true }
//   const predecessor: { [k: string]: string } = {}
//   let tail = 0

//   while (tail < queue.length) {
//     let u = queue[tail++]
//     const neighbors = graph.neighbors[u]
//     for (const v of neighbors) {
//       if (visited[v]) {
//         continue
//       }
//       visited[v] = true
//       if (v === target) {
//         const path = [v]
//         while (u !== source) {
//           path.push(u)
//           u = predecessor[u]
//         }
//         path.push(u)
//         path.reverse()
//         return path.join(' -> ')
//       }
//       predecessor[v] = u
//       queue.push(v)
//     }
//   }
//   return
// }
