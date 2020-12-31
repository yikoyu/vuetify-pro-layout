import momentCN from 'moment/locale/zh-cn'
import vuetifyCN from 'vuetify/es5/locale/zh-Hans'

const components = {
  momentName: 'zh-cn',
  vuetifyLocale: 'zhHans',
  momentLocale: momentCN
}

const locale: { [x: string]: string } = {
  logout: '退出登录',
  install: '安装',
  refresh: '刷新',

  // app.settings
  'app.setting': '设置',
  'app.translations': '翻译',
  'app.setting.theme': '主题',
  'app.setting.theme.light': '浅色主题',
  'app.setting.theme.dark': '深色主题',
  'app.setting.theme.system': '跟随系统',
  'app.setting.navigationmode': '导航模式',
  'app.setting.navigationmode.side': '侧边布局',
  'app.setting.navigationmode.top': '顶部布局',
  'app.setting.contentwidth': '内容宽度',
  'app.setting.contentwidth.fluid': '流式',
  'app.setting.contentwidth.fixed': '定宽',
  'app.setting.direction': '布局',
  'app.setting.direction.ltr': 'LTR',
  'app.setting.direction.rtl': 'RTL',
  'app.setting.primarycolor': '主题色'
}

export default {
  ...components,
  ...locale,
  $vuetify: vuetifyCN
}
