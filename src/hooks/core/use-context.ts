import { getCurrentInstance, watchEffect } from '@vue/composition-api'
import Logger from '@/utils/logger'

/**
 * Returns the current this Equivalent to using `this` inside
 * templates.
 */
export function useContext() {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error(Logger.text('getCurrentInstance() returned null. this must be called at the top of a setup function'))
  }

  const root = instance.proxy.$root
  watchEffect(() => {
    if (root) {
      Object.assign(root, instance.proxy.$root)
    }
  })
  return root
}
