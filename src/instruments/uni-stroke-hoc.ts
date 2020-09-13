import {Instrument, Options} from './base'

export class SingleStroke implements Instrument {
  private im
  private canvas
  private prevImg

  constructor(canvas: HTMLCanvasElement, im: Instrument) {
    this.im = im
    this.canvas = canvas
    this.prevImg = canvas.toDataURL()
  }

  drawStart(e: MouseEvent, options: Options) {
    const img = new Image()
    img.src = this.prevImg
    const context = this.canvas.getContext('2d')
    img.onload = () => {
      // clear canvas
      context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // redraw without last stroke
      context?.drawImage(img, 0, 0)
      // start new stroke
      this.im.drawStart(e, options)
    }
  }

  drawEnd(e: MouseEvent) {
    this.im.drawEnd(e)
  }

  draw(e: MouseEvent, options: Options) {
    this.im.draw(e, options)
  }
}
