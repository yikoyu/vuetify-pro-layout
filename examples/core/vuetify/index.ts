import { VueConstructor } from 'vue'
import Vuetify from 'vuetify/lib'

import { Store } from 'vuex'
import { IRootState } from '@/store'

import { icons } from './icons'

import { i18nRender } from '@/locales'

export function useVuetify(app: VueConstructor) {
  app.use(Vuetify)
}

export function createVuetify(store: Store<IRootState>) {
  return new Vuetify({
    breakpoint: {
      mobileBreakpoint: 'xs',
      scrollBarWidth: 16,
      thresholds: {
        xs: 600,
        sm: 960,
        md: 1280,
        lg: 1920
      }
    },
    icons: icons as any,
    rtl: store.state.app.rtl,
    lang: {
      current: store.state.app.lang,
      t: (key: string, ...params): string => i18nRender(key, params) as any
    },
    theme: {
      dark: store.state.app.theme.dark,
      themes: {
        light: {
          primary: store.state.app.primary
        },
        dark: {
          primary: store.state.app.primary
        }
      }
    }
  })
}
