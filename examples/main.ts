import Vue from 'vue'
import { createVuetifyProLayout, PageHeaderWrapper } from 'vuetify-pro-layout'
import 'vuetify-pro-layout/style.css'
import App from './App.vue'

import { createVuetify } from './core/vuetify'
import { createPinia } from './store'
import router from './router'
const vuetify = createVuetify(Vue)
const pinia = createPinia(Vue)

const VuetifyProLayoutPlugin = createVuetifyProLayout({
  lang: 'zhHans',
  components: {
    PageHeaderWrapper
  }
})

Vue.use(VuetifyProLayoutPlugin)

new Vue({
  vuetify,
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
