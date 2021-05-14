import { inject, ComputedRef } from '@vue/composition-api'

import { Settings, Logo } from '../index.interface'

interface UseInject<Menu extends any = any> {
  logo: ComputedRef<Logo>
  menu: ComputedRef<Menu[]>
  collapsed: ComputedRef<boolean>
  settings: ComputedRef<Settings>
  i18nRender: (t: string) => string
}

export default function useInject(): UseInject {
  const logo: ComputedRef<Logo> = inject('logo') as ComputedRef<Logo>
  const menu: ComputedRef<any[]> = inject('menu') as ComputedRef<any[]>
  const collapsed: ComputedRef<boolean> = inject('collapsed') as ComputedRef<boolean>
  const settings: ComputedRef<Settings> = inject('settings') as ComputedRef<Settings>
  const i18nRender: (t: string) => string = inject('i18nRender') as (t: string) => string

  return {
    logo,
    menu,
    collapsed,
    settings,
    i18nRender
  }
}
