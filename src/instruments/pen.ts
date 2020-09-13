import { Instrument, Options } from './base'

export class Pen implements Instrument {
  ctx

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  drawStart(e: MouseEvent, options: Options) {
    this.ctx.beginPath()
    this.draw(e, options)
  }

  drawEnd() {
    this.ctx.closePath()
  }

  draw(e: MouseEvent, options: Options) {
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = options.width
    this.ctx.strokeStyle = options.color
    this.ctx.lineJoin = 'round'

    console.log('drawing')
    this.ctx.lineTo(e.clientX, e.clientY)
    this.ctx.stroke()

    // smoothen out the line
    this.ctx.beginPath()
    this.ctx.moveTo(e.clientX, e.clientY)
  }
}
