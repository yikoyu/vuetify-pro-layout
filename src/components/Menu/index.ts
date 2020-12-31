import AppMenu from './index.vue'
;(AppMenu as any).install = Vue => Vue.component(AppMenu.name, AppMenu)

export default AppMenu
