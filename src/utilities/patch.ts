import {init} from 'snabbdom/build/package/init'
import {classModule} from 'snabbdom/build/package/modules/class'
import {propsModule} from 'snabbdom/build/package/modules/props'
import {styleModule} from 'snabbdom/build/package/modules/style'
import {eventListenersModule} from 'snabbdom/build/package/modules/eventlisteners'

export const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])
