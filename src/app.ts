import {Instrument, Pen} from './instruments'

export type WBState = {
  drawing: boolean
  /** width in pixels */
  width: 1 | 3 | 5
  color: string
  context: CanvasRenderingContext2D
  instrument: Instrument
}

export const initApp = (ctx: CanvasRenderingContext2D): WBState => ({
  drawing: false,
  width: 5,
  color: 'blue',
  context: ctx,
  instrument: new Pen(ctx)
})

export type Reducer = <T>(action: T, state: WBState) => WBState

export type Dispatcher = (r: Reducer) => (e: Event) => void
