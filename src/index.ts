const app = document.getElementById('root')
const canvas = document.getElementById('canvas') as HTMLCanvasElement | null

let context: CanvasRenderingContext2D | null = null

const height = 300
const width = 300

const state = {
  drawing: false
}

const resizeCanvas = (canvas: HTMLCanvasElement, window: Window) => {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
}

const drawSquare = (context: CanvasRenderingContext2D) => {
  context.fillStyle = 'red'
  context.fillRect(10, 10, 50, 50)
}

window.onload = () => {
  if (canvas) {
    resizeCanvas(canvas, window)
    context = canvas?.getContext('2d') ?? null
    if (context) drawSquare(context)
  }
}
