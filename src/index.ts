import { VueConstructor, PluginFunction } from 'vue'

import ProLayout from './model/ProLayout/index'
import DefaultSettings from './model/Settings/index'
import PageHeaderWrapper from './model/PageHeaderWrapper/index'

import AppMenu from './components/Menu/index'
import AppNestMenu from './components/NestMenu/index'
import AppSheet from './components/Sheet/index'
import AppTooltipBtn from './components/TooltipBtn/index'
import AppContextMenu from './components/ContextMenu/index'

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, any> {
    title: string
    hidden?: boolean
    icon?: string
    keepAlive?: boolean
    permission?: string
    target?: string
    show?: boolean
    component?: string
  }
}

import { createContext } from './hooks'
import type { ContextInstance } from './type'

import lang from './locales'

import { icons } from './vuetify/icons'

interface InstallationOptions {
  components: Record<string, VueConstructor>
}

const install: PluginFunction<InstallationOptions> = (Vue, options): void => {
  const { components = {} } = options || {}
  const keys = Object.keys(components)

  keys.forEach(key => {
    Vue.component(key, components[key])
  })
}

// 判断是否是以文件方式或者CDN方式，如果是，则不用调用 Vue.use()。在 CommonJS 中应始终使用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue, {
    components: {
      ProLayout,
      DefaultSettings,
      PageHeaderWrapper
    }
  })
}

export { ProLayout, DefaultSettings, PageHeaderWrapper }
export { AppMenu, AppNestMenu, AppSheet, AppTooltipBtn, AppContextMenu }
export { icons as defaultIcons }
export { lang }
export { createContext }
export type { ContextInstance }
export default install
