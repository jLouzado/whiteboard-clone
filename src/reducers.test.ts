import {assert} from 'chai'
import {initApp} from './app'
import {Highlighter, Pen} from './instruments'
import {changeInstrument} from './reducers'

describe('reducers', () => {
  describe('changeInstrument', () => {
    describe('Highlight', () => {
      it('should set instrument to Highlighter', () => {
        const context = document
          .createElement('canvas')
          .getContext('2d') as CanvasRenderingContext2D
        const state = initApp(context)

        const actual = changeInstrument('Highlight', state)
        const expected = new Highlighter(context)

        assert.deepEqual(actual.instrument, expected)
      })
    })
  })
})
