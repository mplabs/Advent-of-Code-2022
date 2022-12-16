import { Puzzle } from '@utils/puzzle'

export default class Day16 extends Puzzle {
  valves: { [k: string]: any } = {}

  bfs(frontier: string[], end: string) {
    let depth = 1

    while (true) {
      const nextFrontier: string[] = []
      for (let x of frontier) {
        if (x === end) {
          return depth
        }
        for (let y of this.valves[x]?.tunnels) {
          nextFrontier.push(y)
        }
      }
      frontier = nextFrontier
      depth += 1
    }
  }

  constructor(input: string) {
    super(input)

    const parserRegex =
      /Valve (?<valve>[A-Z]{2}).*rate=(?<rate>\d+);.*valves?.(?<tunnels>[A-Z]{2},?.*)+/

    this.input.split('\n').forEach((line) => {
      const groups = line.match(parserRegex)?.groups
      if (groups) {
        const valve = groups.valve
        const rate = parseInt(groups.rate)
        const tunnels = groups.tunnels.split(', ')

        this.valves[valve] = { rate, tunnels, paths: [] }
      }
    })

    const keys = Object.keys(this.valves)
      .filter((valve) => this.valves[valve].rate !== 0)
      .sort()

    for (let k of ['AA', ...keys]) {
      for (let k2 of keys) {
        if (k2 !== k) {
          this.valves[k]['paths'][k2] = this.bfs(this.valves[k]['tunnels'], k2)
        }
      }
    }
  }

  public solveFirst(): string | number {
    let best = 0

    // console.log(this.valves)

    const search = (
      opened: string[],
      flowed: number,
      currentRoom: string,
      depthToGo: number
    ) => {
      if (flowed > best) {
        best = flowed
      }

      if (depthToGo <= 0) {
        return
      }

      if (opened.indexOf(currentRoom) === -1) {
        search(
          [...new Set(opened.concat(currentRoom))],
          flowed + this.valves[currentRoom]['rate'] * depthToGo,
          currentRoom,
          depthToGo - 1
        )
      } else {
        for (let k of Object.keys(this.valves[currentRoom]['paths'])) {
          if (opened.indexOf(k) !== -1) {
            continue
          }
          search(
            opened,
            flowed,
            k,
            depthToGo - this.valves[currentRoom]['paths'][k]
          )
        }
      }
    }

    search(['AA'], 0, 'AA', 29)

    return best
  }

  public solveSecond(): string | number {
    let best = 0

    const search = (
      opened: string[],
      flowed: number,
      currentRoom: string,
      depthToGo: number,
      elephantsTurn: boolean
    ) => {
      if (flowed > best) {
        best = flowed
      }

      if (depthToGo <= 0) {
        return
      }

      if (opened.indexOf(currentRoom) === -1) {
        search(
          [...new Set(opened.concat(currentRoom))],
          flowed + this.valves[currentRoom]['rate'] * depthToGo,
          currentRoom,
          depthToGo - 1,
          elephantsTurn
        )
        if (!elephantsTurn) {
          search([...new Set([currentRoom, ...opened])],flowed + this.valves[currentRoom]['rate'] * depthToGo, 'AA', 25, true)
        }
      } else {
        for (let k of Object.keys(this.valves[currentRoom]['paths'])) {
          if (opened.indexOf(k) !== -1) {
            continue
          }
          search(
            opened,
            flowed,
            k,
            depthToGo - this.valves[currentRoom]['paths'][k],
            elephantsTurn
          )
        }
      }
    }

    search(['AA'], 0, 'AA', 25, false)

    return best
  }
}
