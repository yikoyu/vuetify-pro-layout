import { computed, unref } from '@vue/composition-api'
import type { RouteConfig } from 'vue-router'

export function useRouteMeta(route: RouteConfig) {
  const routeMeta = computed((): Partial<NonNullable<RouteConfig['meta']>> => {
    return route.meta || {}
  })

  const isShow = computed((): boolean => {
    if (typeof unref(routeMeta)?.hidden !== 'boolean') return true
    return !unref(routeMeta).hidden
  })

  function isShowFun(bool?: boolean) {
    if (typeof bool !== 'boolean') return true
    return !bool
  }

  return {
    routeMeta,
    isShow,
    isShowFun
  }
}
