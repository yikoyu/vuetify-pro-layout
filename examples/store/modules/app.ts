import { Commit } from 'vuex'

import { loadLanguageAsync } from '@/locales'
import { vuetify } from '@/main'

type context = { state: IApp; commit: Commit }

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
  primary: string
  progress: boolean
}

const state: IApp = {
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
  primary: '#1976D2',
  progress: false
}

const mutations = {
  SET_SETTING(state: IApp, type: boolean): void {
    state.setting = type
  },
  SET_COLLAPSED(state: IApp, type: boolean): void {
    state.collapsed = type
  },
  SET_MOBILE(state: IApp, type: boolean): void {
    state.mobile = type
  },
  SET_RTL(state: IApp, type: boolean): void {
    state.rtl = type
    vuetify.rtl = type
  },
  SET_LAYOUT(state: IApp, type: 'side' | 'top'): void {
    state.layout = type
  },
  SET_CONTENT_WIDTH(state: IApp, type: 'fluid' | 'fixed'): void {
    state.contentWidth = type
  },
  SET_MULTI_TAB(state: IApp, type: boolean): void {
    state.multiTab = type
  },
  SET_THEME_DARK(state: IApp, type: boolean): void {
    state.theme.dark = type
    vuetify.theme.dark = type
  },
  SET_THEME_MIXED(state: IApp, type: boolean): void {
    state.theme.mixed = type
  },
  SET_THEME_SYSTEM(state: IApp, type: boolean): void {
    state.theme.system = type
  },
  SET_LANG(state: IApp, type: string): void {
    state.lang = type
    vuetify && (vuetify.lang.current = type)
  },
  SET_PRIMARY(state: IApp, type: string): void {
    state.primary = type
    vuetify.theme.themes.dark.primary = type
    vuetify.theme.themes.light.primary = type
  },
  SET_PROGRESS(state: IApp, type: boolean): void {
    state.progress = type
  }
}

const actions = {
  set_setting({ commit, state }: context, type: boolean): void {
    commit('SET_SETTING', type)
  },
  set_collapsed({ commit, state }: context, type: boolean): void {
    commit('SET_COLLAPSED', type)
  },
  set_mobile({ commit, state }: context, type: boolean): void {
    commit('SET_MOBILE', type)
  },
  set_rtl({ commit, state }: context, type: boolean): void {
    commit('SET_RTL', type)
  },
  set_layout({ commit, state }: context, type: 'side' | 'top'): void {
    if (!['side', 'top'].includes(type)) return
    commit('SET_LAYOUT', type)
    if (type === 'side') commit('SET_CONTENT_WIDTH', 'fluid')
  },
  set_content_width({ commit, state }: context, type: 'fluid' | 'fixed'): void {
    if (!['fluid', 'fixed'].includes(type)) return
    commit('SET_CONTENT_WIDTH', type)
  },
  set_multi_tab({ commit, state }: context, type: boolean): void {
    commit('SET_MULTI_TAB', type)
  },
  set_theme_dark({ commit, state }: context, type: boolean): void {
    commit('SET_THEME_DARK', type)
  },
  set_theme_mixed({ commit, state }: context, type: boolean): void {
    commit('SET_THEME_MIXED', type)
  },
  set_theme_system({ commit, state }: context, type: boolean): void {
    commit('SET_THEME_SYSTEM', type)
  },
  set_lang({ commit, state }: context, type: string): Promise<void> {
    return new Promise((resolve, reject) => {
      commit('SET_LANG', type)
      loadLanguageAsync(type)
        .then(() => {
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  set_primary({ commit, state }: context, type: string): void {
    commit('SET_PRIMARY', type)
  },
  set_progress({ commit, state }: context, type: string): void {
    commit('SET_PROGRESS', type)
  }
}

const getters = {}

export const AppModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
