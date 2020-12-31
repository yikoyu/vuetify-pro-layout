import DefaultSettings from './index.vue'
;(DefaultSettings as any).install = Vue => Vue.component(DefaultSettings.name, DefaultSettings)

export default DefaultSettings
