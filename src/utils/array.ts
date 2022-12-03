export const chunk = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_: any, i: number) =>
    arr.slice(i * size, i * size + size)
  )

export const intersection = <T>(arrays: T[][]): T[] =>
  arrays.reduce((a, b) => a.filter(c => b.includes(c)))
