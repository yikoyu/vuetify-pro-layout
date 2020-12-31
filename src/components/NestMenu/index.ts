import NestMenu from './index.vue'
;(NestMenu as any).install = Vue => Vue.component(NestMenu.name, NestMenu)

export default NestMenu
