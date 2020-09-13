export abstract class Instrument {
  ctx

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  abstract drawStart(e: MouseEvent): void
  abstract drawEnd(e: MouseEvent): void
  // TODO: define state type
  abstract draw(e: MouseEvent, state: { width: number; color: string }): void
}
