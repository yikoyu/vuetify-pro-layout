import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

import pwaEvents from './plugins/pwa-events'

import { PwaModule, IPwa } from './modules/pwa'
import { AppModule, IApp } from './modules/app'

Vue.use(Vuex)

export interface IRootState {
  pwa: IPwa
  app: IApp
}

export default new Vuex.Store<IRootState>({
  modules: {
    pwa: PwaModule,
    app: AppModule
  },
  plugins: [
    pwaEvents,
    persistedState({
      reducer(val) {
        return {
          app: val.app
        }
      }
    })
  ]
})

export const ROOT_DISPATCH = Object.freeze({ root: true })
