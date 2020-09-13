import { Instrument } from './base'

export class Pen implements Instrument {
  ctx

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  drawStart(e: MouseEvent) {
    this.ctx.beginPath()
    // draw dot
  }

  drawEnd() {
    this.ctx.closePath()
  }

  draw(e: MouseEvent, state: { width: number; color: string }) {
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = state.width
    this.ctx.strokeStyle = state.color
    this.ctx.lineJoin = 'round'

    console.log('drawing')
    this.ctx.lineTo(e.clientX, e.clientY)
    this.ctx.stroke()

    // smoothen out the line
    this.ctx.beginPath()
    this.ctx.moveTo(e.clientX, e.clientY)
  }
}
