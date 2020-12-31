/*
 * @Author: yikoyu
 * @Date: 2020-11-30 13:39:37
 * @Last Modified by: yikoyu
 * @Last Modified time: 2020-12-30 14:16:30
 *
 * 项目默认配置项
 * lang         - 语言
 * rtl          - 布局
 * layout       - 整体布局方式 ['side', 'top'] 两种布局
 * contentWidth - 内容区布局： ['fluid', 'fixed'] 两种布局
 * theme@dark   - 是否开启夜间模式
 * theme@system - 是否跟随系统
 * primary      - 主题色
 * title        - 标题
 */

export default {
  lang: 'zh-CN',
  rtl: false,
  layout: 'side',
  contentWidth: 'fluid',
  theme: {
    dark: false,
    system: false
  },
  primary: '#1976D2',
  title: 'Pro Layout'
}
