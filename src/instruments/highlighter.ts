import {Instrument, Options} from './base'

export class Highlighter implements Instrument {
  ctx
  compositionOperation: string
  alpha: number

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.compositionOperation = ctx.globalCompositeOperation
    this.alpha = ctx.globalAlpha
  }

  drawStart(e: MouseEvent, options: Options) {
    this.draw(e, options)
  }

  drawEnd() {
    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = this.compositionOperation
    this.ctx.globalAlpha = this.alpha
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
