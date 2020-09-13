export type Options = {
  width: number
  color: string
}

export abstract class Instrument {
  abstract drawStart(e: MouseEvent, options: Options): void
  abstract drawEnd(e: MouseEvent): void
  abstract draw(e: MouseEvent, options: Options): void

  abstract get getSupportedColors(): string[] | null
}

export const colors: Array<[number, number, number]> = [
  [28, 32, 37],
  [255, 41, 62],
  [0, 115, 232],
  [0, 243, 74],
  [255, 208, 0]
]
