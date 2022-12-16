export function abs(n: number): number {
  return Math.abs(n)
}

export function clamp(number: number, boundOne: number, boundTwo?: number): number {
  if (!boundTwo) {
    return Math.max(number, boundOne) === boundOne ? number : boundOne
  } else if (Math.min(number, boundOne) === number) {
    return boundOne
  } else if (Math.max(number, boundTwo) === number) {
    return boundTwo
  }
  return number
}

export const inRange = (num: number, a: number, b: number = 0): boolean =>
  Math.min(a, b) <= num && num < Math.max(a, b)
