import momentEU from 'moment/locale/eu'
import vuetifyEn from 'vuetify/es5/locale/en'
import { enUS as ProLayoutEnUS } from 'vuetify-pro-layout'

const components = {
  momentName: 'en',
  vuetifyLocale: 'en',
  momentLocale: momentEU
}

const locale: { [x: string]: string } = {
  ...ProLayoutEnUS
}

export default {
  ...components,
  ...locale,
  $vuetify: vuetifyEn
}
