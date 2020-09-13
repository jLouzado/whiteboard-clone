import {Instrument, Options} from './base'

export class SingleStroke extends Instrument {
  im
  canvas
  stack: Array<string> | undefined

  constructor(canvas: HTMLCanvasElement, im: Instrument) {
    const context = canvas.getContext('2d')
    if (context) {
      super(context)
      this.im = im
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
      this.stack = []

      this.save()
    }
  }

  private save() {
    if (this.canvas && this.stack) {
      const content = this.canvas.toDataURL()
      console.log('push', this.stack.push(content))
    } else console.log('Canvas and/or stack not found')
  }

  drawStart(e: MouseEvent, options: Options) {
    // TODO: why isn't this happening in the child?
    this.ctx?.save()

    if (this.stack) {
      const img = new Image()
      const content = this.stack.pop()
      console.log('pop', this.stack.length)
      if (content) {
        img.src = content
        img.onload = () => {
          console.log('redrawing')
          if (this.ctx) {
            console.log('not null')
            this.ctx.drawImage(img, 0, 0)
          }

          console.log('starting')
          this.save()
          this.im?.drawStart(e, options)
        }
      }
    } else console.log('stack not found')
  }

  drawEnd(e: MouseEvent) {
    this.ctx?.restore()
    this.im?.drawEnd(e)
  }

  draw(e: MouseEvent, options: Options) {
    this.im?.draw(e, options)
  }
}
