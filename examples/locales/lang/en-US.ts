import momentEU from 'moment/locale/eu'
import vuetifyEn from 'vuetify/es5/locale/en'

const components = {
  momentName: 'en',
  vuetifyLocale: 'en',
  momentLocale: momentEU
}

const locale: { [x: string]: string } = {
  logout: 'Logout',
  install: 'Install',
  refresh: 'Refresh',

  // app.settings
  'app.setting': 'Settings',
  'app.translations': 'Translations',
  'app.setting.theme': 'Theme',
  'app.setting.theme.light': 'Light',
  'app.setting.theme.dark': 'Dark',
  'app.setting.theme.system': 'System',
  'app.setting.navigationmode': 'Navigation Mode',
  'app.setting.navigationmode.side': 'Side',
  'app.setting.navigationmode.top': 'Top',
  'app.setting.contentwidth': 'Content Width',
  'app.setting.contentwidth.fluid': 'Fluid',
  'app.setting.contentwidth.fixed': 'Fixed',
  'app.setting.direction': 'Direction',
  'app.setting.direction.ltr': 'LTR',
  'app.setting.direction.rtl': 'RTL',
  'app.setting.primarycolor': 'Primary Color'
}

export default {
  ...components,
  ...locale,
  $vuetify: vuetifyEn
}
