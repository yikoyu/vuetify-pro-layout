import { computed } from '@vue/composition-api'
import { useApp as useStoreApp, IApp } from '../app'

export function useApp() {
  const app = useStoreApp()

  const setting = computed({
    get: () => app.setting,
    set: (setting: IApp['setting']) => {
      app.set_setting(setting)
    }
  })

  const collapsed = computed({
    get: () => app.collapsed,
    set: (collapsed: IApp['collapsed']) => {
      app.set_collapsed(collapsed)
    }
  })

  const mobile = computed({
    get: () => app.mobile,
    set: (mobile: IApp['mobile']) => {
      app.set_mobile(mobile)
    }
  })

  const rtl = computed({
    get: () => app.rtl,
    set: (rtl: IApp['rtl']) => {
      app.set_rtl(rtl)
    }
  })

  const layout = computed({
    get: () => app.layout,
    set: (layout: IApp['layout']) => {
      app.set_layout(layout)
    }
  })

  const contentWidth = computed({
    get: () => app.contentWidth,
    set: (contentWidth: IApp['contentWidth']) => {
      app.set_content_width(contentWidth)
    }
  })

  const multiTab = computed({
    get: () => app.multiTab,
    set: (multiTab: IApp['multiTab']) => {
      app.set_multi_tab(multiTab)
    }
  })

  const dark = computed({
    get: () => app.theme.dark,
    set: (dark: IApp['theme']['dark']) => {
      app.set_theme_dark(dark)
    }
  })

  const mixed = computed({
    get: () => app.theme.mixed,
    set: (mixed: IApp['theme']['mixed']) => {
      app.set_theme_mixed(mixed)
    }
  })

  const system = computed({
    get: () => app.theme.system,
    set: (system: IApp['theme']['system']) => {
      app.set_theme_system(system)
    }
  })

  const lang = computed({
    get: () => app.lang,
    set: (lang: IApp['lang']) => {
      app.set_lang(lang)
    }
  })

  const primarycolor = computed({
    get: () => app.primarycolor,
    set: (primarycolor: IApp['primarycolor']) => {
      app.set_primarycolor(primarycolor)
    }
  })

  const progress = computed({
    get: () => app.progress,
    set: (progress: IApp['progress']) => {
      app.set_progress(progress)
    }
  })

  // const miniVariant = computed({
  //   get: () => store.getters['app/miniVariant'],
  //   set: () => {
  //     collapsed.value = !collapsed.value
  //   }
  // })
  // const miniCollapsed = computed(() => store.getters['app/miniCollapsed'])
  // const layoutTop = computed(() => store.getters['app/layoutTop'])
  // const dialogPosition = computed(() => store.getters['app/dialogPosition'])

  return {
    setting,
    collapsed,
    mobile,
    rtl,
    layout,
    contentWidth,
    multiTab,
    dark,
    mixed,
    system,
    lang,
    primarycolor,
    progress
    // miniVariant,
    // miniCollapsed,
    // layoutTop,
    // dialogPosition
  }
}
