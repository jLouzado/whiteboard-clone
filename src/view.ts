import {h} from 'snabbdom/build/package/h'
import {Dispatcher, WBState, WIDTH} from './app'
import {changeColor, changeInstrument, changeSize} from './reducers'

const instruments: ['Pen', 'Highlight', 'Eraser'] = [
  'Pen',
  'Highlight',
  'Eraser'
]

export const view = (dispatch: Dispatcher<WBState>, state: WBState) => {
  const colors = state.instrument.getSupportedColors

  // TODO(refactor): assert on this id, since it's needed for layout
  return h('div#tools', [
    ...instruments.map((i) =>
      h(
        'button.ins',
        {
          key: i,
          on: {
            click: dispatch(changeInstrument(i))
          }
        },
        [i]
      )
    ),
    ...[WIDTH.SMALL, WIDTH.MEDIUM, WIDTH.LARGE].map((width) =>
      h(
        'button.size',
        {
          on: {
            click: dispatch(changeSize(width))
          }
        },
        [width]
      )
    ),
    ...(colors
      ? colors.map((color, index) =>
          h(
            'button.color',
            {
              on: {
                click: dispatch(changeColor(color))
              }
            },
            [color]
          )
        )
      : [''])
  ])
}
