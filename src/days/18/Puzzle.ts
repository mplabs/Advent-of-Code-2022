import { Puzzle } from '@utils/puzzle'

type Voxel = number[]

const sides = ([x, y, z]: Voxel): Voxel[] => [
  [x + 1, y, z],
  [x - 1, y, z],
  [x, y + 1, z],
  [x, y - 1, z],
  [x, y, z + 1],
  [x, y, z - 1],
]

export default class Day18 extends Puzzle {
  cubes: Set<string>

  constructor(input: string) {
    super(input)

    this.cubes = new Set(this.input.split('\n'))
  }

  public solveFirst(): string | number {
    let result = 0
    for (const cube of this.cubes) {
      for (const side of sides(cube.split(',').map(Number))) {
        if (!this.cubes.has(side.join(','))) {
          result++
        }
      }
    }

    return result
  }

  public solveSecond(): string | number {
    const seen = new Set<string>()
    let toCheck: Voxel[] = [[0, 0, 0]]
    let result = 0

    while (toCheck.length > 0) {
      const current = toCheck.pop() as Voxel
      seen.add(current.join(','))
      for (const side of sides(current)) {
        if (
          !this.cubes.has(side.join(',')) &&
          !seen.has(side.join(',')) &&
          side.every((value) => -1 <= value && value <= 25)
        ) {
          toCheck.push(side)
        }
      }
    }

    for (const cube of this.cubes) {
      for (const side of sides(cube.split(',').map(Number))) {
        if (seen.has(side.join(','))) {
          result++
        }
      }
    }

    return result
  }
}
