import type { VueConstructor } from 'vue'
import { createPinia as Pinia, PiniaVuePlugin } from 'pinia'
import type { PiniaPluginContext } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function createPinia(Vue: VueConstructor) {
  const pinia = Pinia()
  pinia.use(piniaPluginPersistedstate)

  Vue.use(PiniaVuePlugin)

  return pinia
}
