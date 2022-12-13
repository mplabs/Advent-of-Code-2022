import { Puzzle } from '@utils/puzzle'

type Packet = number | Packet[]

export default class Day13 extends Puzzle {
  pairs: [Packet, Packet][] = []

  private compare(left: Packet, right: Packet): number {
    // Integer
    if (Number.isInteger(left) && Number.isInteger(right)) {
      if (left < right) {
        return -1
      }
      if (left > right) {
        return 1
      }
      return 0
    }

    // List
    if (Array.isArray(left) && Array.isArray(right)) {
      for (let i = 0; i < Math.min(left.length, right.length); i++) {
        const result = this.compare(left[i], right[i])
        if (result) {
          return result
        }
      }
      if (left.length < right.length) {
        return -1
      }
      if (left.length > right.length) {
        return 1
      }
      return 0
    }

    // Mixed types
    return this.compare([left].flat(), [right].flat())
  }

  private findIndex<T>(arr: T[], item: T): number {
    return arr.findIndex(
      (elem) => JSON.stringify(elem) === JSON.stringify(item)
    )
  }

  private parseLine(line: string): Packet {
    let result: number[] = []
    try {
      result = JSON.parse(line)
    } catch (e) {
      // noop
    }

    return result
  }

  constructor(input: string) {
    super(input)

    this.pairs = this.input
      .split('\n\n')
      .map((pair) => pair.split('\n').map(this.parseLine)) as [Packet, Packet][]
  }

  public solveFirst(): string | number {
    let result: number = 0

    this.pairs.forEach(([left, right], idx) => {
      if (this.compare(left, right) === -1) {
        result += idx + 1
      }
    })

    return result
  }

  public solveSecond(): string | number {
    let sortedPairs = [...this.pairs, [[2]], [[6]]]
      .flat(1)
      .sort((left, right) => this.compare(left, right))

    return (
      (this.findIndex(sortedPairs, [2]) + 1) *
      (this.findIndex(sortedPairs, [6]) + 1)
    )
  }
}
