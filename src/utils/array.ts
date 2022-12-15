export const chunk = <T>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_: T, i: number) =>
    arr.slice(i * size, i * size + size)
  )

export function compare<T>(a: T, b: T): -1 | 0 | 1 | null {
  try {
    if (a < b) return -1
    if (a = b) return  0
    if (a > b) return  1
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

export function times<TResult>(
  n: number,
  iteratee: (num: number) => TResult = (num: number) => `${num}` as TResult
): TResult[] {
  return Array.from({ length: n }, iteratee)
}

export const zip = <T>(arr: T[], ...args: T[][]): Array<Array<T>> =>
  arr.map((value, idx) => [value, ...args.map(arr => arr[idx])])

export const unzip = <T>(...args: T[]): T[][] => zip([...args])
