const INFINITY = 1 / 0
const MAX_INTEGER = 1.7976931348623157e308

export const chunk = <T>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_: T, i: number) =>
    arr.slice(i * size, i * size + size)
  )

export function compare<T>(a: T, b: T): -1 | 0 | 1 | null {
  try {
    if (a < b) return -1
    if ((a = b)) return 0
    if (a > b) return 1
  } catch (e) {
    // noop
  }

  return null
}

export const distinct = <T>(value: T, index: number, self: T[]) =>
  self.indexOf(value) === index

export const intersection = <T>(arrays: T[][]): T[] =>
  arrays.reduce((a, b) => a.filter((c) => b.includes(c)))

export function invertMatrix<T>(matrix: any[][]): T[][] {
  return matrix.reduce((acc, cv) => {
    cv.reduce((_, cv2, idx2) => {
      if (acc[idx2] == undefined) {
        acc[idx2] = []
      }
      acc[idx2].push(cv2)
    }, [])
    return acc
  }, [])
}

/**
 * range generator in the vibe of Python
 * 
 * Currently only accending ranges are supported
 * 
 * @TODO: Add descending ranges
 * 
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step step The value to increment or decrement by.
 * @returns {Generator<number}
 */
export function* range(
  start?: number,
  end?: number,
  step?: number
): Generator<number> {
  start = Number(start)
  if (end === undefined) {
    end = start
    start = 0
  } else {
    end = Number(end)
  }

  step = step === undefined ? (start < end ? 1 : -1) : step
  let x = start - step

  while (x < end - step) {
    yield (x += step)
  }
}

export function times<TResult>(
  n: number,
  iteratee: (num: number) => TResult = (num: number) => `${num}` as TResult
): TResult[] {
  return Array.from({ length: n }, iteratee)
}

export const zip = <T>(arr: T[], ...args: T[][]): Array<Array<T>> =>
  arr.map((value, idx) => [value, ...args.map((arr) => arr[idx])])

export const unzip = <T>(...args: T[]): T[][] => zip([...args])
