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
    border: 'none',
    $nest: {
      '&:hover': {
        border: '1px solid #282828'
      }
    }
  },
  selected: {
    backgroundColor: '#dcdcdc'
  }
})

const hButton = (
  handleClick: EventListener,
  child: string | number | VNode,
  props: {
    key: string
    title?: string
    isSelected?: boolean
  }
) =>
  h(
    'button',
    {
      key: props.key,
      on: {
        click: handleClick
      },
      class: {
        [styles.button]: true,
        [styles.selected]: props.isSelected === true
      },
      props: {
        title: props.title ?? ''
      }
    },
    [child]
  )

export const view = (dispatch: Dispatcher<WBState>, state: WBState) => {
  const colors = state.instrument.getSupportedColors

  // TODO(refactor): assert on this id, since it's needed for layout
  return h('div#tools', {class: {[styles.container]: true}}, [
    ...instruments.map((i) =>
      hButton(dispatch(changeInstrument(i)), i, {
        key: `ins-${i}`,
        title: `Activate ${i}`,
        isSelected: i === state.activeInstrument
      })
    ),
    ...[WIDTH.SMALL, WIDTH.MEDIUM, WIDTH.LARGE].map((width) =>
      hButton(dispatch(changeSize(width)), width, {
        key: `size-${width}`,
        title: `Set Width to ${width}`,
        isSelected: state.width === width
      })
    ),
    ...(colors
      ? colors.map((color) =>
          hButton(dispatch(changeColor(color)), color, {
            key: `col-${color}`,
            title: 'Set Colour',
            isSelected: state.color === color
          })
        )
      : [''])
  ])
}
