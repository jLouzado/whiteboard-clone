import {Highlighter, Eraser, Instrument, Pen} from './instruments'

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

const UndoManager = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d')
  const stack: string[] = []

  return {
    save: () => {
      const content = canvas.toDataURL()
      stack.push(content)
      console.log('push', stack.length)
    },
    undo: () => {
      const img = new Image()
      const content = stack.pop()
      console.log('pop', stack.length)
      if (content && context) {
        img.src = content
        img.onload = function () {
          console.log('redrawing')
          context.drawImage(img, 0, 0)
        }
      }
    }
  }
}

const setHighlighter = (canvas: HTMLCanvasElement) => (e?: Event) => {
  const context = canvas.getContext('2d')
  e?.preventDefault()
  if (context) {
    const undoer = UndoManager(canvas)
    instrument = new Highlighter(context, undoer)
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
