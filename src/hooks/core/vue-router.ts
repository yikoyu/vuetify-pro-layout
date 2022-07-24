import type { Route } from 'vue-router'
import { getCurrentInstance, reactive, watchEffect } from 'vue-demi'
import Logger from '@/utils/logger'

/**
 * Returns the current route location. Equivalent to using `$route` inside
 * templates.
 */
export function useRoute(): Route {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error(Logger.text('getCurrentInstance() returned null. useRoute() must be called at the top of a setup function'))
  }

  const route = reactive<Route>(Object.assign({}, instance.proxy.$root.$route))
  watchEffect(() => {
    Object.assign(route, instance.proxy.$root.$route)
  })

  return route as unknown as Route
}

/**
 * Returns the router instance. Equivalent to using `$router` inside
 * templates.
 */
export function useRouter() {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error(Logger.text('getCurrentInstance() returned null. useRouter() must be called at the top of a setup function'))
  }

  const router = instance.proxy.$root.$router
  watchEffect(() => {
    if (router) {
      Object.assign(router, instance.proxy.$root.$router)
    }
  })
  return router
}
