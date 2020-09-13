import {WBState, WIDTH} from './app'
import {Eraser, Highlighter, Pen} from './instruments'

export const changeInstrument = (
  action: 'Pen' | 'Highlight' | 'Eraser',
  state: WBState
): WBState => {
  const instrument =
    action === 'Pen'
      ? new Pen(state.context)
      : action === 'Highlight'
      ? new Highlighter(state.context)
      : new Eraser(state.context)

  return {
    ...state,
    instrument,
    width: action === 'Highlight' ? WIDTH.MEDIUM : state.width
  }
}
