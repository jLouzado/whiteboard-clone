import {WBState, WIDTH} from './app'
import {Eraser, Highlighter, Pen} from './instruments'
import {SingleStroke} from './instruments/uni-stroke-hoc'

export const changeInstrument = (type: 'Pen' | 'Highlight' | 'Eraser') => (
  _e: Event,
  state: WBState
): WBState => {
  const instrument =
    type === 'Pen'
      ? new Pen(state.context)
      : type === 'Highlight'
      ? new SingleStroke(state.canvasRef, new Highlighter(state.context))
      : new Eraser(state.context)

  const colors = instrument.getSupportedColors

  return {
    ...state,
    instrument,
    color: colors ? colors[0] : state.color,
    width:
      type === 'Pen'
        ? WIDTH.SMALL
        : type === 'Highlight'
        ? WIDTH.MEDIUM
        : WIDTH.LARGE
  }
}

export const changeSize = (type: WIDTH) => (
  _e: Event,
  state: WBState
): WBState => {
  return {
    ...state,
    width: type
  }
}

export const changeColor = (type: string) => (
  _e: Event,
  state: WBState
): WBState => ({
  ...state,
  color: type
})

export const drawStart = (e: Event, state: WBState): WBState => {
  if (e instanceof MouseEvent) {
    state.instrument.drawStart(e, {color: state.color, width: state.width})
  }

  return {
    ...state,
    drawing: true
  }
}

export const drawEnd = (e: Event, state: WBState): WBState => {
  if (e instanceof MouseEvent) {
    state.instrument.drawEnd(e)
  }

  return {
    ...state,
    drawing: false
  }
}

export const drawStroke = (e: Event, state: WBState): WBState => {
  if (e instanceof MouseEvent && state.drawing) {
    state.instrument.draw(e, {color: state.color, width: state.width})
  }

  return state
}
