import {assert} from 'chai'
import {initApp} from './app'
import {Eraser, Highlighter, Pen} from './instruments'
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
    describe('Pen', () => {
      it('should set instrument to Pen', () => {
        const context = document
          .createElement('canvas')
          .getContext('2d') as CanvasRenderingContext2D

        const state = {
          ...initApp(context),
          instrument: new Highlighter(context)
        }

        const actual = changeInstrument('Pen', state)
        const expected = new Pen(context)

        assert.deepEqual(actual.instrument, expected)
      })
    })
    describe('Eraser', () => {
      it('should set instrument to Eraser', () => {
        const context = document
          .createElement('canvas')
          .getContext('2d') as CanvasRenderingContext2D

        const state = {
          ...initApp(context),
          instrument: new Highlighter(context)
        }

        const actual = changeInstrument('Eraser', state)
        const expected = new Eraser(context)

        assert.deepEqual(actual.instrument, expected)
      })
    })
  })
})
