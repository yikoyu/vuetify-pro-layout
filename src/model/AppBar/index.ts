import AppBar from './index.vue'
;(AppBar as any).install = Vue => Vue.component(AppBar.name, AppBar)

export default AppBar
