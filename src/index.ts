const root = document.getElementById('root')
const canvas = document.getElementById('canvas') as HTMLCanvasElement | null

let ctx: CanvasRenderingContext2D | null = null

let state = {
  drawing: false,
  width: 5, // pixels
  color: 'blue'
}

const resizeCanvas = (canvas: HTMLCanvasElement, window: Window) => {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
}

const drawStart = (context: CanvasRenderingContext2D) => (e: MouseEvent) => {
  console.log('starting')
  state.drawing = true
  context.beginPath()
  drawing(context)(e)
}

const drawEnd = (context: CanvasRenderingContext2D) => () => {
  console.log('ending')
  state.drawing = false
  context.closePath()
}

const drawing = (context: CanvasRenderingContext2D) => (e: MouseEvent) => {
  if (!state.drawing) return

  context.lineCap = 'round'
  context.lineWidth = state.width
  context.strokeStyle = state.color
  context.lineJoin = 'round'

  console.log('drawing')
  context.lineTo(e.clientX, e.clientY)
  context.stroke()
  // smoothen out the line
  context.beginPath()
  context.moveTo(e.clientX, e.clientY)
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

window.onload = () => {
  if (canvas) {
    resizeCanvas(canvas, window)
    ctx = canvas?.getContext('2d') ?? null
    if (ctx) {
      window.addEventListener('mousedown', drawStart(ctx))
      window.addEventListener('mouseup', drawEnd(ctx))
      window.addEventListener('mousemove', drawing(ctx))
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
