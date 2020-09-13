export type Options = {
  width: number
  color: string
}

export abstract class Instrument {
  ctx: CanvasRenderingContext2D | null

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  abstract drawStart(e: MouseEvent, options: Options): void
  abstract drawEnd(e: MouseEvent): void
  abstract draw(e: MouseEvent, options: Options): void
}
