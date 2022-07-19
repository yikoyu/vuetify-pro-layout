import type { RouteConfig } from 'vue-router'

export interface Settings {
  dark: boolean
  mixed: boolean
  system: boolean
  rtl: boolean
  progress: boolean
  layout: string
  contentWidth: string
  multiTab: boolean
  primarycolor: string
  canInstall?: boolean
  updateAvailable?: boolean
}

export interface ContextInstance {
  title: string
  logo: unknown
  menu: RouteConfig[]
  collapsed: boolean
  setting: boolean
  settings: Settings
  i18nRender?: (t: string) => string
}
