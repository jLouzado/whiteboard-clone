import {WBState, WIDTH} from './app'
import {Eraser, Highlighter, Pen} from './instruments'

export const changeInstrument = (type: 'Pen' | 'Highlight' | 'Eraser') => (
  _e: Event,
  state: WBState
): WBState => {
  const instrument =
    type === 'Pen'
      ? new Pen(state.context)
      : type === 'Highlight'
      ? new Highlighter(state.context)
      : new Eraser(state.context)

  return {
    ...state,
    instrument,
    width:
      type === 'Pen'
        ? WIDTH.SMALL
        : type === 'Highlight'
        ? WIDTH.MEDIUM
        : WIDTH.LARGE
  }
}

export const drawStart = (e: Event, state: WBState): WBState => ({
  ...state,
  drawing: true
})

export const drawEnd = (e: Event, state: WBState): WBState => ({
  ...state,
  drawing: false
})
