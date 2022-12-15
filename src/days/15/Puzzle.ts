import { inRange } from '@utils/number'
import { Puzzle } from '@utils/puzzle'

const eq = (a: number[], b: number[]): boolean => a[0] === b[0] && a[1] === b[1]

const dist = (sx: number, sy: number, bx: number, by: number): number => Math.abs(bx - sx) + Math.abs(by - sy)

export default class Day15 extends Puzzle {
  static SCAN_ROW = 2000000

  static MIN = 0
  static MAX = 4000000

  coordinates: number[][] = []

  constructor(input: string) {
    super(input)

    this.coordinates = this.input
      .split('\n')
      .map((line) => line.match(/(-?\d+)/g)?.map(Number) as number[])
  }

  public solveFirst(): string | number {
    const nonBeacons = new Set<number>()

    this.coordinates.forEach(([sx, sy, bx, by]) => {
      const radius = Math.abs(bx - sx) + Math.abs(by - sy)
      const distanceToScanRow = Math.abs(Day15.SCAN_ROW - sy)
      let numberOfSteps = radius - distanceToScanRow

      if (numberOfSteps < 0) {
        return
      }

      for (let x = sx - numberOfSteps; x < sx + numberOfSteps + 1; x++) {
        if (x !== bx || Day15.SCAN_ROW !== by) {
          nonBeacons.add(x)
        }
      }
    })

    return nonBeacons.size
  }

  public solveSecond(): string | number {
    const orthoplexes: number[][] = this.coordinates.map(([sx, sy, bx, by]) => [
      sx,
      sy,
      Math.abs(bx - sx) + Math.abs(by - sy),
    ])

    for (let [xa, ya, ra] of orthoplexes) {
      for (let [xb, yb, rb] of orthoplexes) {
        const a = xa - ya - ra
        const b = xb + yb + rb
        const X = Math.floor((b + a) / 2)
        const Y = Math.floor((b - a) / 2 + 1)
        if (0 < X && X < Day15.MAX && 0 < Y && Y <= Day15.MAX && orthoplexes.every(([x, y, r]) => dist(X, Y, x, y) > r)) {
          return Day15.MAX * X + Y
        }
      }
    }

    return 0
  }
}
