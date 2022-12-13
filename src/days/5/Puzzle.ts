import { chunk, invertMatrix } from '@utils/array'
import { Puzzle } from '@utils/puzzle'

const RULE_REGEX = /^move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)$/

export default class Day5 extends Puzzle {
  private state: string[][] = []

  get rules(): string[] {
    return this.input.split('\n').filter((line) => line.match(/^move/))
  }

  private getInitialState(): string[][] {
    const newLineIndex = this.input.match(/^$/m)?.index as number

    let input = this.input
      .slice(0, newLineIndex - 1)
      .split('\n')
      .slice(0, -1)

    let results = []

    for (const line of input) {
      const matches = line.matchAll(/(\s{3,4}|(?:\[(?<box>\w)\]\s?))/dg)
      results.push([...matches].map((match) => match.groups?.box || null))
    }

    return invertMatrix(results).map((bucket: string[]) =>
      bucket.reverse().filter((n) => n)
    )
  }

  public solveFirst(): string {
    const state = this.getInitialState()

    for (const rule of this.rules) {
      const matches = rule.match(RULE_REGEX)?.groups as {
        count: string
        from: string
        to: string
      }

      for (let i = 0; i < parseInt(matches.count); i++) {
        const box = state[parseInt(matches.from) - 1].pop()
        state[parseInt(matches.to) - 1].push(box as string)
      }
    }

    return state.map((bucket) => bucket.pop()).join('')
  }

  public solveSecond(): string {
    const state = this.getInitialState()

    for (const rule of this.rules) {
      const matches = rule.match(RULE_REGEX)?.groups as {
        count: string
        from: string
        to: string
      }

      const boxes = state[parseInt(matches.from) - 1].splice(
        -parseInt(matches.count)
      )
      state[parseInt(matches.to) - 1].push(...(boxes as string[]))
    }

    return state.map((bucket) => bucket.pop()).join('')
  }
}
