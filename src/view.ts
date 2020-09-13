import {h} from 'snabbdom/build/package/h'
import {Dispatcher, WBState} from './app'

const instruments = ['Pen', 'Highlight', 'Eraser']

export const view = (dispatch: Dispatcher, state: WBState) =>
  h('div', [
    ...instruments.map((i) => h('button', {on: {click: dispatch()}}, [i]))
  ])

//   <button id="setThick">Thick</button>
//         <button id="setThin">Thin</button>
//         <button id="eraser">Eraser</button>
//         <button id="pen">Pen</button>
//         <button id="highlighter">Highlighter</button>
