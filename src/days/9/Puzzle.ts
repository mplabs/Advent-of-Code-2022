import { AbstractPuzzle } from '@utils/puzzle'

const distance = (a: number[], b: number[]) =>
  [a[0] - b[0], a[1] - b[1]]

export default class Day9 extends AbstractPuzzle {
  
  solveFirst(): number {
    const visited = new Set<string>()
    let head = [0, 0],
        tail = [0, 0]

    this.input
      .split('\n')
      .map((line: string): [[number, number], number] => {
        const [direction, steps] = line.split(' ')
        switch (direction) {
          case 'R':
            return [[1, 0], parseInt(steps)]
          case 'L':
            return [[-1, 0], parseInt(steps)]
          case 'U':
            return [[0, 1], parseInt(steps)]
          case 'D':
            return [[0, -1], parseInt(steps)]
          default:
            throw new Error(`Unknown direction ${direction}`)
        }
      })
      .forEach(([direction, steps]) => {
        for (let i = 0; i < steps; i++) {
          head[0] += direction[0]
          head[1] += direction[1]

          const [deltaX, deltaY] = distance(head, tail)

          if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) {
            visited.add(tail.join(','))
            continue
          }

          if (Math.abs(deltaX) > 0) {
            tail[0] += deltaX < 0 ? -1 : 1
          }
  
          if (Math.abs(deltaY) > 0) {
            tail[1] += deltaY < 0 ? -1 : 1
          }

          visited.add(tail.join(','))
        }
      })

    return visited.size
  }

  solveSecond(): number {
    // TODO
    return 0
  }
}
