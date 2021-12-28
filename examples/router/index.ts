import Vue from 'vue'
import Router, { RawLocation, Route } from 'vue-router'
import { constantRouterMap } from './config'

import goTo from 'vuetify/es5/services/goto'

type ErrorHandler = (err: Error) => void

// hack router push callback
const originalPush = Router.prototype.push as any
Router.prototype.push = function push(location: RawLocation, onComplete?: Function, onAbort?: ErrorHandler): Promise<Route> {
  if (onComplete || onAbort) return originalPush.call(this, location, onComplete, onAbort)
  return originalPush.call(this, location).catch((err: Error) => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
      let scrollTo: string | number = 0

      if (to.hash) {
        scrollTo = to.hash
      } else if (savedPosition) {
        scrollTo = savedPosition.y
      }

      return goTo(scrollTo)
    },
    base: '/',
    routes: constantRouterMap
  })

const router = createRouter()

export const resetRouter = () => {
  const newRouter = createRouter()
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
