import type { Framework } from 'vuetify/types'
import { getCurrentInstance, reactive } from 'vue-demi'
import Logger from '@/utils/logger'

/**
 * Returns the current vuetify Equivalent to using `$vuetify` inside
 * templates.
 */
export function useVuetify(): Framework {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error(Logger.text('getCurrentInstance() returned null. useVuetify() must be called at the top of a setup function'))
  }

  const vuetify = reactive<Framework>(instance.proxy.$root.$vuetify)

  return vuetify as Framework
}
