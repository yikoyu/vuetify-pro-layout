import Vue from 'vue'
import VCA, { createApp, h } from '@vue/composition-api'
import VuetifyProLayout, { PageHeaderWrapper } from 'vuetify-pro-layout'
import 'vuetify-pro-layout/lib/style.css'
import App from './App.vue'

import { createVuetify } from './core/vuetify'
import { createPinia } from './store'
import router from './router'
const vuetify = createVuetify(Vue)
const pinia = createPinia(Vue)

Vue.use(VCA)

Vue.use(VuetifyProLayout, {
  lang: 'zhHans',
  components: {
    PageHeaderWrapper
  }
})

import './global.scss'

const app = createApp({
  vuetify,
  router,
  pinia,
  render: () => h(App)
})
app.mount('#app')
