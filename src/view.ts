import {h} from 'snabbdom/build/package/h'
import {VNode} from 'snabbdom/build/package/vnode'
import {Dispatcher, WBState, WIDTH} from './app'
import {changeColor, changeInstrument, changeSize} from './reducers'

const instruments: ['Pen', 'Highlight', 'Eraser'] = [
  'Pen',
  'Highlight',
  'Eraser'
]

const hButton = (
  handleClick: EventListener,
  child: string | number | VNode,
  key: string
) =>
  h(
    'button',
    {
      key,
      on: {
        click: handleClick
      }
    },
    [child]
  )

export const view = (dispatch: Dispatcher<WBState>, state: WBState) => {
  const colors = state.instrument.getSupportedColors

  // TODO(refactor): assert on this id, since it's needed for layout
  return h('div#tools', [
    ...instruments.map((i) =>
      hButton(dispatch(changeInstrument(i)), i, `ins-${i}`)
    ),
    ...[WIDTH.SMALL, WIDTH.MEDIUM, WIDTH.LARGE].map((width) =>
      hButton(dispatch(changeSize(width)), width, `size-${width}`)
    ),
    ...(colors
      ? colors.map((color) =>
          hButton(dispatch(changeColor(color)), color, `col-${color}`)
        )
      : [''])
  ])
}
