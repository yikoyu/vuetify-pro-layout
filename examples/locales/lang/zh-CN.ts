import momentCN from 'moment/locale/zh-cn'
import vuetifyCN from 'vuetify/es5/locale/zh-Hans'
import { zhCN as ProLayoutZhCN } from 'vuetify-pro-layout'

const components = {
  momentName: 'zh-cn',
  vuetifyLocale: 'zhHans',
  momentLocale: momentCN
}

const locale: { [x: string]: string } = {
  ...ProLayoutZhCN
}

export default {
  ...components,
  ...locale,
  $vuetify: vuetifyCN
}
