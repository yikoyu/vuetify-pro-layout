import AppContextMenu from './index.vue'
;(AppContextMenu as any).install = Vue => Vue.component(AppContextMenu.name, AppContextMenu)

export default AppContextMenu
