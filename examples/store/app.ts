import { defineStore } from 'pinia'
import { useVuetify } from '#/core/vuetify'

export interface IApp {
  setting: boolean
  collapsed: boolean
  mobile: boolean
  rtl: boolean
  layout: 'side' | 'top'
  contentWidth: 'fluid' | 'fixed'
  multiTab: boolean
  theme: {
    dark: boolean
    mixed: boolean
    system: boolean
  }
  lang: string
  primarycolor: string
  progress: boolean
}

export const useApp = defineStore('app', {
  state: (): IApp => ({
    setting: false,
    collapsed: false,
    mobile: false,
    rtl: false,
    layout: 'side',
    contentWidth: 'fluid',
    multiTab: false,
    theme: {
      dark: false,
      mixed: false,
      system: false
    },
    lang: 'zh-CN',
    primarycolor: '#1976D2',
    progress: false
  }),

  actions: {
    set_setting(setting: IApp['setting']): void {
      this.setting = setting
    },
    set_collapsed(collapsed: IApp['collapsed']): void {
      this.collapsed = collapsed
    },
    set_mobile(mobile: IApp['mobile']): void {
      this.mobile = mobile
    },
    set_rtl(rtl: IApp['rtl']): void {
      this.rtl = rtl
    },
    set_layout(layout: IApp['layout']): void {
      if (!['side', 'top'].includes(layout)) return
      this.layout = layout
      if (layout === 'side') this.contentWidth = 'fluid'
    },
    set_content_width(contentWidth: IApp['contentWidth']): void {
      if (!['fluid', 'fixed'].includes(contentWidth)) return
      this.contentWidth = contentWidth
    },
    set_multi_tab(multiTab: IApp['multiTab']): void {
      this.multiTab = multiTab
    },
    set_theme_dark(dark: IApp['theme']['dark']): void {
      this.theme.dark = dark
    },
    set_theme_mixed(mixed: IApp['theme']['mixed']): void {
      this.theme.mixed = mixed
    },
    set_theme_system(system: IApp['theme']['system']): void {
      this.theme.system = system
    },
    set_lang(lang: IApp['lang']): Promise<void> {
      const vuetify = useVuetify()

      return new Promise<void>((resolve, reject) => {
        this.lang = lang
        vuetify && (vuetify.lang.current = lang)
        resolve()
        // loadLanguageAsync(type)
        //   .then(() => {
        //     resolve()
        //   })
        //   .catch(e => {
        //     reject(e)
        //   })
      })
    },
    set_primarycolor(primarycolor: IApp['primarycolor']): void {
      this.primarycolor = primarycolor
    },
    set_progress(progress: IApp['progress']): void {
      this.progress = progress
    }
  },
  persist: true
})
