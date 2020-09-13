import {assert} from 'chai'
import * as sinon from 'sinon'
import {initApp, WIDTH} from './app'
import {Eraser, Highlighter, Pen} from './instruments'
import {MockPen} from './instruments/mock-pen'
import {changeInstrument, drawEnd, drawStart, drawStroke} from './reducers'

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
  describe('draw', () => {
    it('should call draw if isDrawing is true', () => {
      const context = document
        .createElement('canvas')
        .getContext('2d') as CanvasRenderingContext2D

      const instrument = new MockPen()

      const state = {...initApp(context), drawing: true, instrument}
      const e = new MouseEvent('someEvent')

      const actual = drawStroke(e, state)

      assert.deepEqual(actual, state)
      sinon.assert.calledOnce(instrument.draw)
    })
    it('should NOT call draw if isDrawing is false', () => {
      const context = document
        .createElement('canvas')
        .getContext('2d') as CanvasRenderingContext2D

      const instrument = new MockPen()

      const state = {...initApp(context), drawing: false, instrument}
      const e = new Event('someEvent')

      const actual = drawStroke(e, state)

      assert.deepEqual(actual, state)
      sinon.assert.notCalled(instrument.draw)
    })
  })
})
