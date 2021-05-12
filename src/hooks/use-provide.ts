import { provide, computed } from '@vue/composition-api'

export default function useProvide(prop: any) {
  const logoRender = computed(() => {
    return prop.logoRender
  })

  const menu = computed(() => {
    return prop.menu
  })

  const collapsed = computed(() => {
    return prop.collapsed
  })

  const settings = computed(() => {
    return prop.settings
  })

  provide('logo', logoRender)
  provide('menu', menu)
  provide('collapsed', collapsed)
  provide('settings', settings)
  provide('i18nRender', prop.i18nRender)
}
