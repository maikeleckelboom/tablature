export function scaleValue(input: number, slope: number = 0.25, yIntercept: number = 0): number {
  return slope * input + yIntercept
}
