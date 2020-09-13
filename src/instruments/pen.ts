import {colors, Instrument, Options} from './base'

export class Pen implements Instrument {
  ctx

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  getSupportedColors = colors.map((rgb) => `rgb(${rgb.join(',')})`)

  drawStart(e: MouseEvent, options: Options) {
    this.draw(e, options)
  }

  drawEnd() {
    this.ctx.beginPath()
  }

  draw(e: MouseEvent, options: Options) {
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = options.width
    this.ctx.strokeStyle = options.color
    this.ctx.lineJoin = 'round'

    this.ctx.lineTo(e.clientX, e.clientY)
    this.ctx.stroke()

    // smoothen out the line
    this.ctx.beginPath()
    this.ctx.moveTo(e.clientX, e.clientY)
  }
}
