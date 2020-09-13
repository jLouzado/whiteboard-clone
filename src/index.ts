import {Dispatcher, initApp, Reducer, WBState} from './app'
import {patch} from './utilities/patch'
import {view} from './view'

let state: WBState | null = null

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
    const dispatch = (reducer: Reducer) => (e: Event) => {
      state = reducer(e, state ?? initApp(context))
      patch(app, view(dispatch, state))
    }

    state = initApp(context)

    // First patch, to kick things off
    patch(app, view(dispatch, state))
  } else {
    throw new Error('Failed to find Context')
  }
}
