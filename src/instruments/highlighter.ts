import {Instrument, Options} from './base'

export class Highlighter implements Instrument {
  ctx

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  drawStart(e: MouseEvent, options: Options) {
    this.ctx.save()
    this.draw(e, options)
  }

  drawEnd() {
    this.ctx.restore()
    this.ctx.beginPath()
  }

  draw(e: MouseEvent, options: Options) {
    this.ctx.globalCompositeOperation = 'multiply'
    this.ctx.globalAlpha = 0.5
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.lineWidth = options.width
    this.ctx.strokeStyle = '#ff0'

    this.ctx.lineTo(e.clientX, e.clientY)
    this.ctx.stroke()

    // smoothen out the line
    this.ctx.beginPath()
    this.ctx.moveTo(e.clientX, e.clientY)
  }
}
