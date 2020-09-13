import {h} from 'snabbdom/build/package/h'
import {VNode} from 'snabbdom/build/package/vnode'
import {stylesheet} from 'typestyle'
import {Dispatcher, WBState, WIDTH} from './app'
import {changeColor, changeInstrument, changeSize} from './reducers'

const instruments: ['Pen', 'Highlight', 'Eraser'] = [
  'Pen',
  'Highlight',
  'Eraser'
]

const styles = stylesheet({
  container: {
    $nest: {
      '& > :not(:first-child)': {
        margin: '6px 0'
      }
    }
  },
  button: {
    height: '45px',
    width: '60px',
    borderRadius: '8px',
    border: 'none'
  }
})

const hButton = (
  handleClick: EventListener,
  child: string | number | VNode,
  key: string,
  title?: string
) =>
  h(
    'button',
    {
      key,
      on: {
        click: handleClick
      },
      class: {
        [styles.button]: true
      },
      props: {
        title: title ?? ''
      }
    },
    [child]
  )

export const view = (dispatch: Dispatcher<WBState>, state: WBState) => {
  const colors = state.instrument.getSupportedColors

  // TODO(refactor): assert on this id, since it's needed for layout
  return h('div#tools', {class: {[styles.container]: true}}, [
    ...instruments.map((i) =>
      hButton(dispatch(changeInstrument(i)), i, `ins-${i}`, `Activate ${i}`)
    ),
    ...[WIDTH.SMALL, WIDTH.MEDIUM, WIDTH.LARGE].map((width) =>
      hButton(
        dispatch(changeSize(width)),
        width,
        `size-${width}`,
        `Set Width to ${width}`
      )
    ),
    ...(colors
      ? colors.map((color) =>
          hButton(
            dispatch(changeColor(color)),
            color,
            `col-${color}`,
            'Set Colour'
          )
        )
      : [''])
  ])
}
