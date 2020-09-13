import {Eraser, Highlighter, Instrument, Pen} from './instruments'
import {SingleStroke} from './instruments/uni-stroke-hoc'

const canvas = document.getElementById('canvas') as HTMLCanvasElement | null

let ctx: CanvasRenderingContext2D | null = null

let state = {
  drawing: false,
  width: 5, // pixels
  color: 'blue'
}

let instrument: Instrument | null = null

const resizeCanvas = (canvas: HTMLCanvasElement, window: Window) => {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
}

const drawStart = (e: MouseEvent) => {
  state.drawing = true
  instrument?.drawStart(e, state)
}

const drawEnd = (e: MouseEvent) => {
  state.drawing = false
  instrument?.drawEnd(e)
}

const drawing = (e: MouseEvent) => {
  if (!state.drawing) return

  instrument?.draw(e, state)
}

const setThickPen = (e: Event) => {
  e.preventDefault()
  console.log('setting thick')
  state = {
    ...state,
    width: 20
  }
}

const setThinPen = (e: Event) => {
  e.preventDefault()
  console.log('setting thick')
  state = {
    ...state,
    width: 5
  }
}

const setEraser = (context: CanvasRenderingContext2D) => (e: Event) => {
  e.preventDefault()
  instrument = new Eraser(context)
}

const setPen = (context: CanvasRenderingContext2D) => (e?: Event) => {
  e?.preventDefault()
  instrument = new Pen(context)
}

const setHighlighter = (canvas: HTMLCanvasElement) => (e?: Event) => {
  const context = canvas.getContext('2d')
  e?.preventDefault()
  if (context) {
    instrument = new SingleStroke(canvas, new Highlighter(context))
  }
}

window.onload = () => {
  if (canvas) {
    resizeCanvas(canvas, window)
    ctx = canvas.getContext('2d') ?? null
    if (ctx) {
      window.addEventListener('mousedown', drawStart)
      window.addEventListener('mouseup', drawEnd)
      window.addEventListener('mousemove', drawing)

      setPen(ctx)()
      const eraser = document.getElementById('eraser')
      if (eraser) {
        eraser.addEventListener('click', setEraser(ctx))
      }
      const pen = document.getElementById('pen')
      if (pen) {
        pen.addEventListener('click', setPen(ctx))
      }
      const highlighter = document.getElementById('highlighter')
      if (highlighter) {
        highlighter.addEventListener('click', setHighlighter(canvas))
      }
    }

    const incSize = document.getElementById('setThick')
    if (incSize) {
      incSize.addEventListener('click', setThickPen)
    }
    const decSize = document.getElementById('setThin')
    if (decSize) {
      decSize.addEventListener('click', setThinPen)
    }
  }
}
