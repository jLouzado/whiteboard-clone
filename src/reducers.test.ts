import {assert} from 'chai'
import * as sinon from 'sinon'
import {initApp, WIDTH} from './app'
import {Eraser, Highlighter, Pen} from './instruments'
import {MockPen} from './instruments/mock-pen'
import {SingleStroke} from './instruments/uni-stroke-hoc'
import {
  changeColor,
  changeInstrument,
  changeSize,
  drawEnd,
  drawStart,
  drawStroke
} from './reducers'

describe('reducers', () => {
  describe('changeInstrument', () => {
    describe('Highlight', () => {
      it('should set instrument to Highlighter', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const state = initApp(context, canvas)
        const e = new Event('click')

        const actual = changeInstrument('Highlight')(e, state)
        const expected = new SingleStroke(canvas, new Highlighter(context))

        assert.deepEqual(actual.instrument, expected)
      })
      it('should set width to medium', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const state = initApp(context, canvas)
        const e = new Event('click')

        const actual = changeInstrument('Highlight')(e, state)
        const expected = WIDTH.MEDIUM

        assert.deepEqual(actual.width, expected)
      })
      it('should update color', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const state = initApp(context, canvas)
        const e = new Event('click')

        const actual = changeInstrument('Highlight')(e, state)
        const expected = new Highlighter(context).getSupportedColors[0]

        assert.strictEqual(actual.color, expected)
      })
    })
    describe('Pen', () => {
      it('should set instrument to Pen', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const state = {
          ...initApp(context, canvas),
          instrument: new Highlighter(context)
        }
        const e = new Event('click')

        const actual = changeInstrument('Pen')(e, state)
        const expected = new Pen(context)

        assert.deepEqual(actual.instrument, expected)
      })
      it('should set width to small', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const state = {
          ...initApp(context, canvas),
          instrument: new Highlighter(context),
          width: WIDTH.MEDIUM
        }
        const e = new Event('click')

        const actual = changeInstrument('Pen')(e, state)
        const expected = WIDTH.SMALL

        assert.deepEqual(actual.width, expected)
      })
      it('should update color', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const state = initApp(context, canvas)
        const e = new Event('click')

        const actual = changeInstrument('Pen')(e, state)
        const expected = new Pen(context).getSupportedColors[0]

        assert.strictEqual(actual.color, expected)
      })
    })
    describe('Eraser', () => {
      it('should set instrument to Eraser', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const state = {
          ...initApp(context, canvas),
          instrument: new Highlighter(context)
        }
        const e = new Event('click')

        const actual = changeInstrument('Eraser')(e, state)
        const expected = new Eraser(context)

        assert.deepEqual(actual.instrument, expected)
      })
      it('should set width to large', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const state = {
          ...initApp(context, canvas),
          instrument: new Highlighter(context),
          width: WIDTH.MEDIUM
        }
        const e = new Event('click')

        const actual = changeInstrument('Eraser')(e, state)
        const expected = WIDTH.LARGE

        assert.deepEqual(actual.width, expected)
      })
      it('should update color', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const state = initApp(context, canvas)
        const e = new Event('click')

        const actual = changeInstrument('Eraser')(e, state)
        const expected = state.color

        assert.strictEqual(actual.color, expected)
      })
    })
  })
  describe('drawStart', () => {
    it('should set isDrawing to true', () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D

      const state = initApp(context, canvas)
      const e = new Event('someEvent')

      const actual = drawStart(e, state)

      assert.isTrue(actual.drawing)
    })
  })
  describe('drawEnd', () => {
    it('should set isDrawing to false', () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D

      const state = {...initApp(context, canvas), drawing: true}
      const e = new Event('someEvent')

      const actual = drawEnd(e, state)

      assert.isFalse(actual.drawing)
    })
  })
  describe('draw', () => {
    it('should call draw if isDrawing is true', () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D

      const instrument = new MockPen()

      const state = {...initApp(context, canvas), drawing: true, instrument}
      const e = new MouseEvent('someEvent')

      const actual = drawStroke(e, state)

      assert.deepEqual(actual, state)
      sinon.assert.calledOnce(instrument.draw)
    })
    it('should NOT call draw if isDrawing is false', () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D

      const instrument = new MockPen()

      const state = {...initApp(context, canvas), drawing: false, instrument}
      const e = new Event('someEvent')

      const actual = drawStroke(e, state)

      assert.deepEqual(actual, state)
      sinon.assert.notCalled(instrument.draw)
    })
  })
  describe('changeSize', () => {
    it('should set sie to small if type is SMALL', () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      const state = {
        ...initApp(context, canvas),
        instrument: new Highlighter(context),
        width: WIDTH.MEDIUM
      }
      const e = new Event('click')

      const actual = changeSize(WIDTH.SMALL)(e, state)
      const expected = WIDTH.SMALL

      assert.deepEqual(actual.width, expected)
    })
    it('should set sie to medium if type is MEDIUM', () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      const state = {
        ...initApp(context, canvas),
        instrument: new Highlighter(context),
        width: WIDTH.MEDIUM
      }
      const e = new Event('click')

      const actual = changeSize(WIDTH.MEDIUM)(e, state)
      const expected = WIDTH.MEDIUM

      assert.deepEqual(actual.width, expected)
    })
    it('should set sie to large if type is LARGE', () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      const state = {
        ...initApp(context, canvas),
        instrument: new Highlighter(context),
        width: WIDTH.MEDIUM
      }
      const e = new Event('click')

      const actual = changeSize(WIDTH.LARGE)(e, state)
      const expected = WIDTH.LARGE

      assert.deepEqual(actual.width, expected)
    })
  })
  describe('changeColor', () => {
    it('should set color', () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      const state = initApp(context, canvas)
      const e = new Event('click')

      const actual = changeColor('#fff')(e, state)
      const expected = '#fff'

      assert.deepEqual(actual.color, expected)
    })
  })
})
