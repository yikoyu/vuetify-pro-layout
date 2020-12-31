// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { PageHeaderWrapper } from 'vuetify-pro-layout'

import App from '@/App.vue'

import router from '@/router'
import store from '@/store'
import i18n from '@/locales'

import { useVuetify, createVuetify } from '@/core/vuetify'
const Vuetify = createVuetify(store)
useVuetify(Vue)

import '@/global.scss'
Vue.use(VueCompositionAPI)

Vue.use(PageHeaderWrapper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  vuetify: Vuetify,
  render: h => h(App)
}).$mount('#app')

export const vuetify = Vuetify.framework
