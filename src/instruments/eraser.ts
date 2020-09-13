import {Instrument, Options} from './base'

export class Eraser implements Instrument {
  ctx
  compositionOperation: string

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.compositionOperation = ctx.globalCompositeOperation
  }

  drawStart(e: MouseEvent, options: Options) {
    this.ctx.beginPath()
    this.draw(e, options)
  }

  drawEnd() {
    this.ctx.closePath()

    // reset composition mode after stroke
    this.ctx.globalCompositeOperation = this.compositionOperation
  }

  draw(e: MouseEvent, options: Options) {
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = options.width
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
    this.ctx.lineJoin = 'round'

    this.ctx.lineTo(e.clientX, e.clientY)
    this.ctx.stroke()

    // smoothen out the line
    this.ctx.beginPath()
    this.ctx.moveTo(e.clientX, e.clientY)
  }
}
