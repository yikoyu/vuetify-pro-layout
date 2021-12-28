import type { VueConstructor } from 'vue'

import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/es5/locale/zh-Hans'

import { icons } from './icons'

let vuetify: Vuetify
export const createVuetify = (Vue: VueConstructor): Vuetify => {
  Vue.use(Vuetify)

  vuetify = new Vuetify({
    lang: {
      locales: { zhHans },
      current: 'zhHans'
    },
    icons
  })

  return vuetify
}

export const useVuetify = () => {
  return vuetify.framework
}
