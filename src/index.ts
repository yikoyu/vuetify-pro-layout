import { VueConstructor } from 'vue'

import ProLayout from './model/ProLayout/index'
import DefaultAppBar from './model/AppBar/index'
import DefaultDrawer from './model/Drawer/index'
import DefaultSettings from './model/Settings/index'
import PageHeaderWrapper from './model/PageHeaderWrapper/index'

import AppMenu from './components/Menu/index'
import AppNestMenu from './components/NestMenu/index'
import AppSheet from './components/Sheet/index'
import AppTooltipBtn from './components/TooltipBtn/index'
import AppContextMenu from './components/ContextMenu/index'

import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

import { icons } from './vuetify/icons'

const components = [ProLayout, DefaultAppBar, DefaultDrawer, DefaultSettings, PageHeaderWrapper, AppMenu, AppNestMenu, AppSheet, AppTooltipBtn, AppContextMenu]

const install = (Vue: VueConstructor) => {
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

// 判断是否是以文件方式或者CDN方式，如果是，则不用调用 Vue.use()。在 CommonJS 中应始终使用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { ProLayout, DefaultAppBar, DefaultDrawer, DefaultSettings, PageHeaderWrapper }
export { AppMenu, AppNestMenu, AppSheet, AppTooltipBtn, AppContextMenu }
export { icons as defaultIcons }
export { zhCN, enUS }
export default install
