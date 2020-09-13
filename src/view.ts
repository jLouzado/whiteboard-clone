import {h} from 'snabbdom/build/package/h'
import {Dispatcher, WBState} from './app'
import {changeInstrument} from './reducers'

const instruments: ['Pen', 'Highlight', 'Eraser'] = [
  'Pen',
  'Highlight',
  'Eraser'
]

export const view = (dispatch: Dispatcher<WBState>, state: WBState) =>
  h('div', [
    ...instruments.map((i) =>
      h(
        'button',
        {
          on: {
            click: dispatch(changeInstrument(i))
          }
        },
        [i]
      )
    )
  ])
