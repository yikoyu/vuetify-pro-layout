import { computed } from '@vue/composition-api'
import store from '@/store'

export default function useApp() {
  const setting = computed({
    get: () => store.state.app.setting,
    set: (val: boolean) => {
      store.dispatch('app/set_setting', val)
    }
  })

  const collapsed = computed({
    get: () => store.state.app.collapsed,
    set: (val: boolean) => {
      store.dispatch('app/set_collapsed', val)
    }
  })

  const mobile = computed({
    get: () => store.state.app.mobile,
    set: (val: boolean) => {
      store.dispatch('app/set_mobile', val)
    }
  })

  const rtl = computed({
    get: () => store.state.app.rtl,
    set: (val: boolean) => {
      store.dispatch('app/set_rtl', val)
    }
  })

  const layout = computed({
    get: () => store.state.app.layout,
    set: (val: 'side' | 'top') => {
      store.dispatch('app/set_layout', val)
    }
  })

  const contentWidth = computed({
    get: () => store.state.app.contentWidth,
    set: (val: 'fluid' | 'fixed') => {
      store.dispatch('app/set_content_width', val)
    }
  })

  const dark = computed({
    get: () => store.state.app.theme.dark,
    set: (val: boolean) => {
      store.dispatch('app/set_theme_dark', val)
    }
  })

  const mixed = computed({
    get: () => store.state.app.theme.mixed,
    set: (val: boolean) => {
      store.dispatch('app/set_theme_mixed', val)
    }
  })

  const system = computed({
    get: () => store.state.app.theme.system,
    set: (val: boolean) => {
      store.dispatch('app/set_theme_system', val)
    }
  })

  const lang = computed({
    get: () => store.state.app.lang,
    set: (val: string) => {
      store.dispatch('app/set_lang', val)
    }
  })

  const primary = computed({
    get: () => store.state.app.primary,
    set: (val: string) => {
      store.dispatch('app/set_primary', val)
    }
  })

  const progress = computed({
    get: () => store.state.app.progress,
    set: (val: boolean) => {
      store.dispatch('app/SET_PROGRESS', val)
    }
  })

  const miniVariant = computed({
    get: () => store.getters['app/miniVariant'],
    set: () => {
      collapsed.value = !collapsed.value
    }
  })
  const miniCollapsed = computed(() => store.getters['app/miniCollapsed'])
  const layoutTop = computed(() => store.getters['app/layoutTop'])
  const dialogPosition = computed(() => store.getters['app/dialogPosition'])

  return {
    setting,
    collapsed,
    mobile,
    rtl,
    layout,
    contentWidth,
    dark,
    mixed,
    system,
    lang,
    primary,
    progress,
    miniVariant,
    miniCollapsed,
    layoutTop,
    dialogPosition
  }
}
