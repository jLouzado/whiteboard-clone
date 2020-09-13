import {WBState} from './app'
import {Highlighter} from './instruments'

export const changeInstrument = (
  _action: 'Pen' | 'Highlight' | 'Eraser',
  state: WBState
): WBState => {
  const instrument = new Highlighter(state.context)

  return {
    ...state,
    instrument
  }
}
