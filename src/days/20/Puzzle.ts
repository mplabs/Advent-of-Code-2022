import { range } from '@utils/array'
import { Puzzle } from '@utils/puzzle'

export default class Day20 extends Puzzle {
  numbers: number[]

  mix(arr: number[], rounds: number = 1): number[] {
    const numbers = arr.map((number, index) => `${index}:${number}`)
    const result = [...numbers]

    for (let _ of range(rounds)) {
      for (let i = 0; i < numbers.length; i++) {
        const index = numbers[i]
        const number = parseInt(index.split(':')[1])

        // Shift to the left in reverse
        if (number < 0) {
          result.reverse()
        }

        const oldIndex = result.indexOf(index)
        result.splice(oldIndex, 1) // remove at old index
        const newIndex = (oldIndex + Math.abs(number)) % result.length
        result.splice(newIndex, 0, index) // insert at new index

        // Undo reverse from left shift
        if (number < 0) {
          result.reverse()
        }
      }
    }

    return result.map((entry) => entry.split(':').map(Number)[1])
  }

  constructor(input: string) {
    super(input)

    this.numbers = this.input.split('\n').map(Number)
  }

  public solveFirst(): string | number {
    const result = this.mix(this.numbers)
    const zeroIndex = result.indexOf(0)

    return (
      result[(zeroIndex + 1000) % result.length] +
      result[(zeroIndex + 2000) % result.length] +
      result[(zeroIndex + 3000) % result.length]
    )
  }

  public solveSecond(): string | number {
    const DECRYPTION_KEY = 811589153
    const result = this.mix(
      this.numbers.map((number) => number * DECRYPTION_KEY),
      10
    )
    const zeroIndex = result.indexOf(0)

    return (
      result[(zeroIndex + 1000) % result.length] +
      result[(zeroIndex + 2000) % result.length] +
      result[(zeroIndex + 3000) % result.length]
    )
  }
}
