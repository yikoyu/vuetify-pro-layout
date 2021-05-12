import { inject, ComputedRef } from '@vue/composition-api'

import { ISettings, ILogo } from '../index.interface'

export default function useInject() {
  const logo: ComputedRef<ILogo> = inject('logo') as ComputedRef<ILogo>
  const menu: ComputedRef<any[]> = inject('menu') as ComputedRef<any[]>
  const collapsed: ComputedRef<boolean> = inject('collapsed') as ComputedRef<boolean>
  const settings: ComputedRef<ISettings> = inject('settings') as ComputedRef<ISettings>
  const i18nRender: Function = inject('i18nRender') as Function

  return {
    logo,
    menu,
    collapsed,
    settings,
    i18nRender
  }
}
