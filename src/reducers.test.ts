import {assert} from 'chai'
import {initApp, WIDTH} from './app'
import {Eraser, Highlighter, Pen} from './instruments'
import {changeInstrument, drawEnd, drawStart} from './reducers'

describe('reducers', () => {
  describe('changeInstrument', () => {
    describe('Highlight', () => {
      it('should set instrument to Highlighter', () => {
        const context = document
          .createElement('canvas')
          .getContext('2d') as CanvasRenderingContext2D
        const state = initApp(context)
        const e = new Event('click')

        const actual = changeInstrument('Highlight')(e, state)
        const expected = new Highlighter(context)

        assert.deepEqual(actual.instrument, expected)
      })
      it('should set width to medium', () => {
        const context = document
          .createElement('canvas')
          .getContext('2d') as CanvasRenderingContext2D
        const state = initApp(context)
        const e = new Event('click')

        const actual = changeInstrument('Highlight')(e, state)
        const expected = WIDTH.MEDIUM

        assert.deepEqual(actual.width, expected)
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
        const e = new Event('click')

        const actual = changeInstrument('Pen')(e, state)
        const expected = new Pen(context)

        assert.deepEqual(actual.instrument, expected)
      })
      it('should set width to small', () => {
        const context = document
          .createElement('canvas')
          .getContext('2d') as CanvasRenderingContext2D
        const state = {
          ...initApp(context),
          instrument: new Highlighter(context),
          width: WIDTH.MEDIUM
        }
        const e = new Event('click')

        const actual = changeInstrument('Pen')(e, state)
        const expected = WIDTH.SMALL

        assert.deepEqual(actual.width, expected)
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
        const e = new Event('click')

        const actual = changeInstrument('Eraser')(e, state)
        const expected = new Eraser(context)

        assert.deepEqual(actual.instrument, expected)
      })
      it('should set width to large', () => {
        const context = document
          .createElement('canvas')
          .getContext('2d') as CanvasRenderingContext2D
        const state = {
          ...initApp(context),
          instrument: new Highlighter(context),
          width: WIDTH.MEDIUM
        }
        const e = new Event('click')

        const actual = changeInstrument('Eraser')(e, state)
        const expected = WIDTH.LARGE

        assert.deepEqual(actual.width, expected)
      })
    })
  })
  describe('drawStart', () => {
    it('should set isDrawing to true', () => {
      const context = document
        .createElement('canvas')
        .getContext('2d') as CanvasRenderingContext2D

      const state = initApp(context)
      const e = new Event('someEvent')

      const actual = drawStart(e, state)

      assert.isTrue(actual.drawing)
    })
  })
  describe('drawEnd', () => {
    it('should set isDrawing to false', () => {
      const context = document
        .createElement('canvas')
        .getContext('2d') as CanvasRenderingContext2D

      const state = {...initApp(context), drawing: true}
      const e = new Event('someEvent')

      const actual = drawEnd(e, state)

      assert.isFalse(actual.drawing)
    })
  })
})
