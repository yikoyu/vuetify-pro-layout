import Sheet from './index.vue'
;(Sheet as any).install = Vue => Vue.component(Sheet.name, Sheet)

export default Sheet
