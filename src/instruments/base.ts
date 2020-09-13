export type Options = {
  width: number
  color: string
}

export abstract class Instrument {
  abstract drawStart(e: MouseEvent, options: Options): void
  abstract drawEnd(e: MouseEvent): void
  abstract draw(e: MouseEvent, options: Options): void
}
