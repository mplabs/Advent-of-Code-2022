export const chunk = <T>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_: T, i: number) =>
    arr.slice(i * size, i * size + size)
  )

export const distinct = <T>(value: T, index: number, self: T[]) =>
  self.indexOf(value) === index

export const intersection = <T>(arrays: T[][]): T[] =>
  arrays.reduce((a, b) => a.filter(c => b.includes(c)))

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
