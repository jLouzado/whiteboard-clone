import {initApp, Reducer, WBState} from './app'
import {drawEnd, drawStart, drawStroke} from './reducers'
import {patch} from './utilities/patch'
import {view} from './view'

const resizeCanvas = (canvas: HTMLCanvasElement, window: Window) => {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
}

window.onload = () => {
  const app = document.getElementById('tools') as HTMLElement
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  resizeCanvas(canvas, window)

  const context = canvas.getContext('2d')
  if (context && app) {
    let state: WBState = initApp(context)

    /** Receives actions from DOM and updates state for tools */
    const dispatch = (reducer: Reducer<WBState>) => (e: Event) => {
      state = reducer(e, state)
      patch(app, view(dispatch, state))
    }

    /*
    Event Listeners for Canvas
    */
    canvas.addEventListener('mousedown', dispatch(drawStart))
    canvas.addEventListener('mouseup', dispatch(drawEnd))
    canvas.addEventListener('mousemove', dispatch(drawStroke))

    // First patch, to kick things off
    patch(app, view(dispatch, state))
  } else {
    throw new Error('Failed to find Context')
  }
}
