import {Instrument, Pen} from './instruments'

export enum WIDTH {
  SMALL = 5,
  MEDIUM = 10,
  LARGE = 20
}

export type WBState = {
  drawing: boolean
  /** width in pixels */
  width: WIDTH
  color: string
  canvasRef: HTMLCanvasElement
  context: CanvasRenderingContext2D
  activeInstrument: 'Pen' | 'Highlight' | 'Eraser'
  instrument: Instrument
}

export const initApp = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): WBState => {
  const instrument = new Pen(ctx)

  return {
    drawing: false,
    width: 5,
    color: instrument.getSupportedColors[0],
    canvasRef: canvas,
    context: ctx,
    activeInstrument: 'Pen',
    instrument
  }
}

export type Reducer<T> = (action: Event, state: T) => WBState

export type Dispatcher<S> = (r: Reducer<S>) => (e: Event) => void
